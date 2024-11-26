const express = require('express');
const Req = require('../models/request');
const router = express.Router();

router.post('/service/:type/form', async (req, res) => {
  const { m, e, a, t, msg, c } = req.body;
  try {
    const nReq = new Req({ mobile: m, email: e, amt: a, type: t, msg, code: c });
    await nReq.save();
    res.status(201).json(nReq);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

router.put('/updaterequest', async (req, res) => {
  const { m, s, t, rmk } = req.body;
  try {
    const uReq = await Req.findOneAndUpdate(
      { mobile: m, type: t },
      { msg: rmk, code: s },
      { new: true }
    );
    if (!uReq) return res.status(404).json({ msg: 'Request not found' });
    res.json(uReq);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

router.post('/service/:type/calculate', (req, res) => {
  const { a, tn, t } = req.body;

  if (!a || !tn) {
    return res.status(400).json({ msg: 'Amount and tenure are required' });
  }

  const r = 10;
  const mR = r / 12 / 100;
  const emi = (a * mR * Math.pow(1 + mR, tn)) / (Math.pow(1 + mR, tn) - 1);

  res.json({ emi: emi.toFixed(2) });
});

router.delete('/deleterequest', async (req, res) => {
  const { m } = req.body;
  try {
    const dReq = await Req.findOneAndDelete({ mobile: m });
    if (!dReq) return res.status(404).json({ msg: 'Request not found' });
    res.json({ msg: 'Request deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
