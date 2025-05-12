const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'user' }, 
  call: { type: mongoose.Schema.Types.ObjectId, ref: 'emergency' },
  status: { type: String, enum: ['accepted', 'rejected', 'completed'] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('History', historySchema); 