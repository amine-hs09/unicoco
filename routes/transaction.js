const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

// Get all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find().populate('workerId').populate('productId').populate('siteId');
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new transaction
router.post('/', async (req, res) => {
    const transaction = new Transaction({
        workerId: req.body.workerId,
        productId: req.body.productId,
        siteId: req.body.siteId,
        quantity: req.body.quantity
    });
    try {
        const newTransaction = await transaction.save();
        res.status(201).json(newTransaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
