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


// Set up Multer for file uploads (we will still need multer to handle file uploads)

const storage = multer.memoryStorage();  // Use memory storage to work with Cloudinary directly

const upload = multer({ storage });


// Middleware to ensure the user is authenticated and has the correct role

const checkRole = (requiredRole) => {

    return async (req, res, next) => {

        const { userID } = req.body; // Assuming userID comes from body or token

        if (!userID) {

            return res.status(400).json({ error: "Missing userID" });

        }


        try {

            const userDoc = await db.collection("users").doc(userID).get();

            if (!userDoc.exists) {

                return res.status(403).json({ error: "User not found" });

            }


            const userRole = userDoc.data().roleID; // Check the user's role

            if (userRole !== requiredRole) {

                return res.status(403).json({ error: "Unauthorized access" });

            }


            next(); // Allow access if role matches

        } catch (error) {

            console.error("Error verifying role:", error);

            res.status(500).json({ error: "Internal server error" });

        }

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

        // Upload the file to Cloudinary using a memory buffer

        const stream = Readable.from(req.file.buffer);

        const uploadResponse = await new Promise((resolve, reject) => {

            const uploadStream = cloudinary.uploader.upload_stream(

                { resource_type: "auto", public_id: THESIS_NO },  // Optionally use the thesis number as the public ID

                (error, result) => {

                    if (error) return reject(error);

                    resolve(result);

                }

            );

            stream.pipe(uploadStream);

        });


        // Create a new document in the "theses" collection with a generated ID

        const newThesis = {

            ABSTRACT,

            AUTHOR,

            COLLEGE_DEPT,

            THESIS_NO,

            THESIS_TITLE,

            TYPE,

            YEAR,

            PDF_URL: uploadResponse.secure_url, // Store Cloudinary URL

            PDF_PUBLIC_ID: uploadResponse.public_id, // Store Cloudinary public ID for future reference (e.g., deletion)

        };


        const thesisRef = await db.collection("theses").add(newThesis);


        console.log("Thesis uploaded successfully:", thesisRef.id);

        res.status(200).json({ message: "Thesis uploaded successfully!", id: thesisRef.id });

    } catch (error) {

        console.error("Error saving thesis:", error);

        res.status(500).json({ error: "Failed to upload thesis." });

    }

});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`);

});

