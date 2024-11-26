const express = require('express');
const Svc = require('../models/service');
const router = express.Router();

const CErr = require('../middleware/CustomError');

router.get('/allservices', async (req, res, next) => {
  try {
    const svcs = await Svc.find();
    if (!svcs) {
      throw new CErr('Services not found', 404);
    }
    res.json(svcs);
  } catch (err) {
    next(err); 
  }
});

router.get('/service/:type', async (req, res) => {
  try {
    const svc = await Svc.findOne({ type: req.params.type });
    if (!svc) return res.status(404).json({ msg: 'Service not found' });
    res.json(svc);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
