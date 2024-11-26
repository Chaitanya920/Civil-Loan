const express = require('express');
const Mem = require('../models/member');
const router = express.Router();

router.post('/member', async (req, res) => {
  const { mob, mail, occ, pwd } = req.body;
  try {
    const nMem = new Mem({ mobile: mob, email: mail, occupation: occ, createpassword: pwd });
    await nMem.save();
    res.status(201).json(nMem);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

router.put('/updatepassword', async (req, res) => {
  const { mob, pwd } = req.body;
  try {
    const mem = await Mem.findOneAndUpdate(
      { mobile: mob },
      { createpassword: pwd },
      { new: true }
    );
    if (!mem) return res.status(404).json({ msg: 'Member not found' });
    res.json(mem);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

router.delete('/cancelmember', async (req, res) => {
  const { mob } = req.body;
  try {
    const dMem = await Mem.findOneAndDelete({ mobile: mob });
    if (!dMem) return res.status(404).json({ msg: 'Member not found' });
    res.json({ msg: 'Membership cancelled' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
