
const express = require('express');
const { getDbClient } = require('../config/db');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        console.log('Fetching passwords...');
        const db = getDbClient();
        if (!db) throw new Error('Database connection not found');

        const collection = db.collection('passwords');
        const findResult = await collection.find({}).toArray();
        res.json(findResult);
    } catch (error) {
        console.error('Error fetching passwords:', error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const password = req.body;
        const db = getDbClient();
        if (!db) throw new Error('Database connection not found');

        const collection = db.collection('passwords');
        const insertResult = await collection.insertOne(password);
        res.send({ success: true, result: insertResult });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const db = getDbClient();
        if (!db) throw new Error('Database connection not found');
        const collection = db.collection('passwords');

        const deleteResult = await collection.deleteOne({ id: id });
        if(deleteResult.deletedCount === 1){
            res.send({ success: true, result: deleteResult });
        }else{
            res.status(400).send({ success: false, message: 'Document not found' });
        }
    } catch (error) {
        console.error('Error deleting password:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

