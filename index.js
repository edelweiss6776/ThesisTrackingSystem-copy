const express = require('express');
const cors = require('cors');
const { db } = require('./firebaseConfig');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/search', async (req, res) => {
    const query = req.query.q;

    try {
        const thesesRef = db.collection('theses');
        let snapshot;

        if (query) {
            console.log("Attempting to fetch results for query:", query);
            snapshot = await thesesRef
                .where('THESIS_TITLE', '>=', query)
                .where('THESIS_TITLE', '<=', query + '\uf8ff')
                .get();
        } else {
            console.log("Fetching all theses (no query provided).");
            snapshot = await thesesRef.get();
        }

        if (snapshot.empty) {
            console.log("No matching documents found.");
            return res.json([]);
        }

        const results = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        console.log("Results found:", results);
        res.json(results);
    } catch (error) {
        console.error("Error fetching theses:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
