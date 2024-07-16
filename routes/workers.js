const express = require('express');
const Worker = require('../models/Worker'); // Assurez-vous que la casse est correcte
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const workers = await Worker.find();
    res.json(workers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const worker = new Worker({
    name: req.body.name,
    role: req.body.role,
    active: req.body.active
  });

  try {
    const newWorker = await worker.save();
    res.status(201).json(newWorker);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const worker = await Worker.findByIdAndDelete(req.params.id);
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }
    res.json({ message: 'Worker deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
