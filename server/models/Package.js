const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    category: { type: String, default: 'offbeat' },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    originalPrice: { type: Number, required: true },
    discountPercent: { type: Number, default: 0 },
    numericPrice: { type: Number, required: true },
    price: { type: String, required: true },
    duration: { type: String, default: '3 Days / 2 Nights' },
    rating: { type: String, default: '4.9 (100)' },
    tag: { type: String, default: 'Featured' },
    tagIcon: { type: String, default: 'fas fa-star' },
    image: { type: String, default: '/assets/images/img-13.jpg' }
  },
  { timestamps: true }
);

// Pre-save hook to calculate sale price based on discount
packageSchema.pre('save', function (next) {
  if (this.originalPrice) {
    const discount = this.discountPercent || 0;
    const finalPrice = discount > 0 ? Math.round(this.originalPrice * (1 - discount / 100)) : this.originalPrice;
    this.numericPrice = finalPrice;
    this.price = `₹${finalPrice.toLocaleString('en-IN')}`;
  }
  next();
});

module.exports = mongoose.model('Package', packageSchema);
