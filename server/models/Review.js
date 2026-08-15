const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    location: { type: String, default: 'Visitor' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    date: { type: String, default: () => new Date().toISOString().split('T')[0] },
    status: { type: String, enum: ['pending', 'approved'], default: 'pending' },
    packageName: { type: String, default: 'General Tour' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
