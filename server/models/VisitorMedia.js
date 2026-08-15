const mongoose = require('mongoose');

// Validator function for strictly max 3 photos
function arrayLimit(val) {
  return val.length <= 3;
}

const visitorMediaSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    authorName: { type: String, required: true },
    location: { type: String, default: 'North Bengal Explorer' },
    caption: { type: String, default: '' },
    photos: {
      type: [String],
      validate: [arrayLimit, 'Exceeds maximum limit of 3 photos per upload submission.']
    },
    uploadDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
    status: { type: String, enum: ['pending', 'approved'], default: 'pending' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('VisitorMedia', visitorMediaSchema);
