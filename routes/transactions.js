// C:\Users\OtmanHSSINOUI\unicoco\routes\transactions.js
const express = require('express');
const Transaction = require('../models/transaction');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const transaction = new Transaction({
        workerId: req.body.workerId,
        productId: req.body.productId,
        siteId: req.body.siteId,
        date: req.body.date || Date.now()
    });
    try {
        const newTransaction = await transaction.save();
        res.status(201).json(newTransaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
