const mongoose = require('mongoose');

const SerSch = new mongoose.Schema({
  type: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String, required: true },
  imgUrl: { type: String },
  detail: { type: Array }
});

module.exports = mongoose.model('services', SerSch);