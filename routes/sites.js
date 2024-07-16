// C:\Users\OtmanHSSINOUI\unicoco\routes\sites.js
const express = require('express');
const Site = require('../models/site');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const sites = await Site.find();
        res.json(sites);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const site = new Site({
        name: req.body.name,
        location: req.body.location,
        description: req.body.description
    });
    try {
        const newSite = await site.save();
        res.status(201).json(newSite);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
