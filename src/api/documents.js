const express = require('express');
const Document = require('../models/Document');

const router = express.Router();

// Other routes...

// Get a single document by ID
router.get('/:id', async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json(document);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
