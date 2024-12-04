const express = require("express");
const cors = require("cors");
const { db } = require('./firebaseConfig');
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./uploads"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

const PORT = 5000;

// Middleware to ensure the user is authenticated and has the correct role
const checkRole = (requiredRole) => {
  return async (req, res, next) => {
    const { userID } = req.body; // assuming userID comes from body or token
    const userDoc = await db.collection('users').doc(userID).get();

    if (!userDoc.exists) {
      return res.status(403).json({ error: "User not found" });
    }

    const userRole = userDoc.data().roleID; // Check the user's role
    if (userRole !== requiredRole) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    next(); // Allow access if role matches
  };
};

// Search endpoint
app.get("/search", async (req, res) => {
    const query = req.query.q || "";
    try {
        console.log(`Received search query: "${query}"`);
        const thesesRef = db.collection("theses");
        let snapshot;

        if (query) {
            // Perform a search with Firestore range queries
            snapshot = await thesesRef
                .where("THESIS_TITLE", ">=", query)
                .where("THESIS_TITLE", "<=", query + "\uf8ff")
                .get();
        } else {
            // Fetch all documents if no query provided
            snapshot = await thesesRef.get();
        }

        if (snapshot.empty) {
            console.log("No matching theses found.");
            return res.json([]); // Return empty array if no results
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

app.post("/upload", upload.single("PDF_FILE"), checkRole("Librarian"), async (req, res) => {
    const { ABSTRACT, AUTHOR, COLLEGE_DEPT, THESIS_NO, THESIS_TITLE, TYPE, YEAR } = req.body;

    try {
        // Save thesis details in Firestore
        await db.collection("theses").add({
            ABSTRACT,
            AUTHOR,
            COLLEGE_DEPT,
            THESIS_NO,
            THESIS_TITLE,
            TYPE,
            YEAR,
            PDF_PATH: req.file.path,
        });
        res.status(200).send("Thesis uploaded successfully!");
    } catch (error) {
        console.error("Error saving thesis:", error);
        res.status(500).send("Failed to upload thesis.");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
