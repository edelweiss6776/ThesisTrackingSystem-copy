require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { Readable } = require("stream");
const { db } = require("./firebaseConfig");

const app = express();
app.use(cors());
app.use(express.json());

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Multer for file uploads (memory storage for direct Cloudinary upload)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware for role-based authentication
const checkRole = (requiredRole) => async (req, res, next) => {
    const { userID } = req.body;
    if (!userID) {
        return res.status(400).json({ error: "Missing userID" });
    }

    try {
        const userDoc = await db.collection("users").doc(userID).get();
        if (!userDoc.exists) {
            return res.status(403).json({ error: "User not found" });
        }

        const userRole = userDoc.data().roleID;
        if (userRole !== requiredRole) {
            return res.status(403).json({ error: "Unauthorized access" });
        }

        next();
    } catch (error) {
        console.error("Error verifying role:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Search endpoint
app.get("/search", async (req, res) => {
    const query = req.query.q || "";
    try {
        console.log(`Received search query: "${query}"`);
        const thesesRef = db.collection("theses");
        let snapshot;

        if (query) {
            snapshot = await thesesRef
                .where("THESIS_TITLE", ">=", query)
                .where("THESIS_TITLE", "<=", query + "\uf8ff")
                .get();
        } else {
            snapshot = await thesesRef.get();
        }

        if (snapshot.empty) {
            console.log("No matching theses found.");
            return res.json([]);
        }

        const results = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        console.log("Results found:", results);
        res.json(results);
    } catch (error) {
        console.error("Error fetching theses:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Upload endpoint to Cloudinary
app.post("/upload", upload.single("PDF_FILE"), async (req, res) => {
    const { ABSTRACT, AUTHOR, COLLEGE_DEPT, THESIS_NO, THESIS_TITLE, TYPE, YEAR } = req.body;

    if (!req.file) {
        return res.status(400).json({ error: "No PDF file uploaded" });
    }

    try {
        const stream = Readable.from(req.file.buffer);
        const uploadResponse = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: "auto", public_id: THESIS_NO },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            stream.pipe(uploadStream);
        });

        const newThesis = {
            ABSTRACT,
            AUTHOR,
            COLLEGE_DEPT,
            THESIS_NO,
            THESIS_TITLE,
            TYPE,
            YEAR,
            PDF_URL: uploadResponse.secure_url,
            PDF_PUBLIC_ID: uploadResponse.public_id,
        };

        const thesisRef = await db.collection("theses").add(newThesis);

        console.log("Thesis uploaded successfully:", thesisRef.id);
        res.status(200).json({ message: "Thesis uploaded successfully!", id: thesisRef.id });
    } catch (error) {
        console.error("Error saving thesis:", error);
        res.status(500).json({ error: "Failed to upload thesis." });
    }
});

// Thesis categories endpoints
app.get("/api/thesis-categories", async (req, res) => {
    try {
        const categoriesSnapshot = await db.collection("thesis_categories").get();

        if (categoriesSnapshot.empty) {
            return res.status(200).json([]);
        }

        const categories = categoriesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching thesis categories:", error);
        res.status(500).json({ error: "Failed to fetch thesis categories." });
    }
});

app.post("/api/thesis-categories", async (req, res) => {
    const { categoryName } = req.body;

    if (!categoryName) {
        return res.status(400).json({ error: "Category name is required." });
    }

    try {
        const newCategory = { name: categoryName };
        const categoryRef = await db.collection("thesis_categories").add(newCategory);

        res.status(201).json({ id: categoryRef.id, ...newCategory });
    } catch (error) {
        console.error("Error adding new category:", error);
        res.status(500).json({ error: "Failed to add category." });
    }
});

app.put("/api/thesis-categories/:id", async (req, res) => {
    const { id } = req.params;
    const { categoryName } = req.body;

    if (!categoryName) {
        return res.status(400).json({ error: "Category name is required." });
    }

    try {
        const categoryRef = db.collection("thesis_categories").doc(id);
        const categoryDoc = await categoryRef.get();

        if (!categoryDoc.exists) {
            return res.status(404).json({ error: "Category not found." });
        }

        await categoryRef.update({ name: categoryName });
        res.status(200).json({ message: "Category updated successfully." });
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ error: "Failed to update category." });
    }
});

app.delete("/api/thesis-categories/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const categoryRef = db.collection("thesis_categories").doc(id);
        const categoryDoc = await categoryRef.get();

        if (!categoryDoc.exists) {
            return res.status(404).json({ error: "Category not found." });
        }

        await categoryRef.delete();
        res.status(200).json({ message: "Category deleted successfully." });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ error: "Failed to delete category." });
    }
});

// Feedback endpoint
app.post("/feedback", async (req, res) => {
    try {
        const { feedback, user } = req.body;
        const feedbackDoc = {
            feedback,
            user,
            timestamp: new Date(),
        };

        await db.collection("feedback").add(feedbackDoc);
        res.status(201).send("Feedback submitted successfully");
    } catch (err) {
        console.error("Error saving feedback:", err);
        res.status(500).send("Failed to submit feedback");
    }
});
app.get("/feedback", async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const feedbackRef = db.collection("feedback");

        // Convert page and limit to numbers
        const pageNumber = Number(page);
        const pageLimit = Number(limit);

        // Validate limit and page
        if (isNaN(pageNumber) || isNaN(pageLimit) || pageLimit <= 0 || pageNumber <= 0) {
            return res.status(400).json({ error: "Invalid page or limit." });
        }

        // Create the query with ordering and limit
        let query = feedbackRef.orderBy("timestamp", "desc").limit(pageLimit);

        // Handle pagination by starting after the last document of the previous page
        if (pageNumber > 1) {
            // Get the last document of the previous page
            const previousPageSnapshot = await feedbackRef
                .orderBy("timestamp", "desc")
                .limit((pageNumber - 1) * pageLimit)
                .get();

            const lastDoc = previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1];
            if (lastDoc) {
                query = query.startAfter(lastDoc);
            }
        }

        // Fetch the feedbacks for the current page
        const snapshot = await query.get();
        const feedback = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate().toISOString(), // Ensure timestamp is ISO string
        }));

        // Fetch total count of feedbacks
        const totalSnapshot = await feedbackRef.get();
        const total = totalSnapshot.size;

        res.status(200).json({ feedback, total });
    } catch (error) {
        console.error("Error fetching feedback:", error);
        res.status(500).json({ feedback: [], total: 0, error: "Failed to fetch feedback." });
    }
});



// Fetch all users
app.get("/users", async (req, res) => {
    try {
        const usersSnapshot = await db.collection("users").get();
        const users = usersSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// Fetch all roles
app.get("/roles", async (req, res) => {
    try {
        const rolesSnapshot = await db.collection("roles").get();
        const roles = rolesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        res.status(200).json(roles);
    } catch (error) {
        console.error("Error fetching roles:", error);
        res.status(500).json({ error: "Failed to fetch roles" });
    }
});

// Add a new user
app.post("/users", async (req, res) => {
    try {
        const { OAuthID, userID, userName, firstName, lastName, email, roleID, dateCreated } = req.body;

        // Ensure the required fields are provided
        if (!OAuthID || !userID || !userName || !firstName || !lastName || !email || !roleID || !dateCreated) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const userRef = await db.collection("users").add({
            OAuthID,
            userID,
            userName,
            firstName,
            lastName,
            email,
            roleID,
            dateCreated,
        });

        res.status(201).json({ message: "User added successfully", userId: userRef.id });
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ error: "Failed to add user" });
    }
});

// Update user details
app.put("/users/:id", async (req, res) => {
    const userId = req.params.id;
    const { userName, firstName, lastName, email, roleID } = req.body;

    try {
        const userRef = db.collection("users").doc(userId);
        const userSnapshot = await userRef.get();

        if (!userSnapshot.exists) {
            return res.status(404).json({ error: "User not found" });
        }

        await userRef.update({
            userName,
            firstName,
            lastName,
            email,
            roleID,
        });

        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Failed to update user" });
    }
});

// Deactivate user
app.delete("/users/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const userRef = db.collection("users").doc(userId);
        const userSnapshot = await userRef.get();

        if (!userSnapshot.exists) {
            return res.status(404).json({ error: "User not found" });
        }

        await userRef.delete();
        res.status(200).json({ message: "User deactivated successfully" });
    } catch (error) {
        console.error("Error deactivating user:", error);
        res.status(500).json({ error: "Failed to deactivate user" });
    }
});
// Express route to update user status
app.put("/users/:id/status", async (req, res) => {
    const userId = req.params.id;
    const { status } = req.body; // Expecting the new status ('active' or 'inactive')

    try {
        // Update the status of the user in Firestore
        const userRef = db.collection("users").doc(userId);
        await userRef.update({
            status: status,
        });
        res.status(200).send({ message: "User status updated successfully." });
    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).send({ message: "Error updating status" });
    }
});
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const userRef = db.collection("users").where("email", "==", email);
        const snapshot = await userRef.get();

        if (snapshot.empty) {
            return res.status(404).send({ message: "User not found" });
        }

        const userDoc = snapshot.docs[0];
        const userId = userDoc.id;

        // Verify the password (assume success for now)
        await db.collection("users").doc(userId).update({
            isLoggedIn: true,
            lastLogin: new Date(),
        });

        res.status(200).send({ message: "Login successful", userId });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send({ message: "Login failed" });
    }
});
app.post("/logout", async (req, res) => {
    const { userId } = req.body;

    try {
        await db.collection("users").doc(userId).update({
            isLoggedIn: false,
        });

        res.status(200).send({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).send({ message: "Logout failed" });
    }
});
app.get("/logged-in-users", async (req, res) => {
    try {
        const usersRef = db.collection("users").where("isLoggedIn", "==", true);
        const snapshot = await usersRef.get();

        const loggedInUsers = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.status(200).send(loggedInUsers);
    } catch (error) {
        console.error("Error fetching logged-in users:", error);
        res.status(500).send({ message: "Failed to fetch logged-in users" });
    }
});
app.get("/api/theses/:id", async (req, res) => {
    const thesisId = req.params.id;

    try {
        const thesisDoc = await db.collection("theses").doc(thesisId).get();
        if (!thesisDoc.exists) {
            return res.status(404).json({ message: "Thesis not found" });
        }

        const thesisData = thesisDoc.data();
        res.json({
            id: thesisDoc.id,
            ABSTRACT: thesisData.ABSTRACT,
        });
    } catch (error) {
        console.error("Error fetching thesis:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
app.get('/api/theses/:thesisNo', async (req, res) => {
    const thesisNo = req.params.thesisNo;

    try {
        // Search for the thesis document by THESIS_NO
        const thesisSnapshot = await db.collection('theses').where('THESIS_NO', '==', thesisNo).get();

        if (thesisSnapshot.empty) {
            return res.status(404).json({ error: 'Thesis not found' });
        }

        // Assuming there is only one thesis with a specific THESIS_NO
        const thesis = thesisSnapshot.docs[0].data();
        res.json({ ABSTRACT: thesis.ABSTRACT });
    } catch (error) {
        console.error('Error fetching abstract:', error);
        res.status(500).json({ error: 'Failed to fetch abstract' });
    }
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
