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
    const { userID } = req.body; // Assuming userID comes from body or token
    if (!userID) {
        return res.status(400).json({ error: "Missing userID" });
    }

    try {
        const userDoc = await db.collection("users").doc(userID).get();
        if (!userDoc.exists) {
            return res.status(403).json({ error: "User not found" });
        }

        const userRole = userDoc.data().roleID; // Get user role
        if (userRole !== requiredRole) {
            return res.status(403).json({ error: "Unauthorized access" });
        }

        next(); // Role matches, proceed
    } catch (error) {
        console.error("Error verifying role:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Search endpoint
app.get("/search", async (req, res) => {
    const query = req.query.q || ""; // Default to empty string if no query
    try {
        console.log(`Received search query: "${query}"`);
        const thesesRef = db.collection("theses");
        let snapshot;

        if (query) {
            // Perform case-insensitive search with range queries
            snapshot = await thesesRef
                .where("THESIS_TITLE", ">=", query)
                .where("THESIS_TITLE", "<=", query + "\uf8ff")
                .get();
        } else {
            // Fetch all records if no query is provided
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
        // Upload the file to Cloudinary
        const stream = Readable.from(req.file.buffer);
        const uploadResponse = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: "auto", public_id: THESIS_NO }, // Optional: use thesis number as public ID
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            stream.pipe(uploadStream);
        });

        // Save the thesis metadata in Firestore
        const newThesis = {
            ABSTRACT,
            AUTHOR,
            COLLEGE_DEPT,
            THESIS_NO,
            THESIS_TITLE,
            TYPE,
            YEAR,
            PDF_URL: uploadResponse.secure_url, // Cloudinary URL
            PDF_PUBLIC_ID: uploadResponse.public_id, // For future reference (e.g., deletion)
        };

        const thesisRef = await db.collection("theses").add(newThesis);

        console.log("Thesis uploaded successfully:", thesisRef.id);
        res.status(200).json({ message: "Thesis uploaded successfully!", id: thesisRef.id });
    } catch (error) {
        console.error("Error saving thesis:", error);
        res.status(500).json({ error: "Failed to upload thesis." });
    }
});
app.get("/api/thesis-categories", async (req, res) => {
    try {
        const categoriesRef = db.collection("thesisCategories"); // Firestore collection for categories
        const snapshot = await categoriesRef.get();

        if (snapshot.empty) {
            console.log("No thesis categories found.");
            return res.json([]);
        }

        const categories = snapshot.docs.map((doc) => doc.data().name); // Assuming each document has a `name` field

        console.log("Thesis categories retrieved:", categories);
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching thesis categories:", error);
        res.status(500).json({ error: "Failed to fetch thesis categories." });
    }
}); app.get("/api/thesis-categories", async (req, res) => {
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

// 2. Add a new category
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

// 3. Update an existing category
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

// 4. Delete a category
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


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
