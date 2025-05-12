const mongoose = require("mongoose");

const emergencySchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
},
  category: {
    type: String,
  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'closed'],
    default: 'open',
  },
  location: {
    type: {
      type: String,  // "type" של המיקום
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],  // [longitude, latitude]
      required: true,
    },
  },
  userName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

// הוספת אינדקס למיקום הגאוגרפי
emergencySchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Emergency', emergencySchema);    

    
