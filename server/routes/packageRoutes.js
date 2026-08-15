const express = require('express');
const router = express.Router();
const Package = require('../models/Package');
const { verifyAdmin } = require('../middleware/auth');

// Simple XSS Sanitization Helper
const sanitizeStr = (str) => {
  if (typeof str !== 'string') return str;
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

// GET /api/packages - Public: Get all tour packages
router.get('/', async (req, res) => {
  try {
    const pkgs = await Package.find({}).sort({ createdAt: -1 });
    return res.json(pkgs);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching packages', error: error.message });
  }
});

// POST /api/packages - Admin Protected: Add new tour package
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { title, category, originalPrice, discountPercent, duration, tag, tagIcon, image, description } = req.body;
    
    if (!title || originalPrice === undefined) {
      return res.status(400).json({ message: 'Package title and original price are required.' });
    }

    const orig = Number(originalPrice) || 0;
    const discount = Number(discountPercent) || 0;
    const finalPrice = discount > 0 ? Math.round(orig * (1 - discount / 100)) : orig;

    const newPkg = new Package({
      id: `pkg-${Date.now()}`,
      category: sanitizeStr(category) || 'offbeat',
      title: sanitizeStr(title),
      description: sanitizeStr(description) || '',
      originalPrice: orig,
      discountPercent: discount,
      numericPrice: finalPrice,
      price: `₹${finalPrice.toLocaleString('en-IN')}`,
      duration: sanitizeStr(duration) || '3 Days / 2 Nights',
      tag: sanitizeStr(tag) || 'Featured',
      tagIcon: sanitizeStr(tagIcon) || 'fas fa-star',
      image: sanitizeStr(image) || '/assets/images/img-13.jpg'
    });

    await newPkg.save();
    return res.status(201).json(newPkg);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to create package', error: error.message });
  }
});

// PUT /api/packages/:id - Admin Protected: Update existing package
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const pkg = await Package.findOne({ id: req.params.id });
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }

    const { title, category, originalPrice, discountPercent, duration, tag, tagIcon, image, description } = req.body;

    if (title !== undefined) pkg.title = sanitizeStr(title);
    if (category !== undefined) pkg.category = sanitizeStr(category);
    if (originalPrice !== undefined) pkg.originalPrice = Number(originalPrice);
    if (discountPercent !== undefined) pkg.discountPercent = Number(discountPercent);
    if (duration !== undefined) pkg.duration = sanitizeStr(duration);
    if (tag !== undefined) pkg.tag = sanitizeStr(tag);
    if (tagIcon !== undefined) pkg.tagIcon = sanitizeStr(tagIcon);
    if (image !== undefined) pkg.image = sanitizeStr(image);
    if (description !== undefined) pkg.description = sanitizeStr(description);

    // Recalculate price
    const orig = pkg.originalPrice;
    const discount = pkg.discountPercent || 0;
    const finalPrice = discount > 0 ? Math.round(orig * (1 - discount / 100)) : orig;
    pkg.numericPrice = finalPrice;
    pkg.price = `₹${finalPrice.toLocaleString('en-IN')}`;

    await pkg.save();
    return res.json(pkg);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to update package', error: error.message });
  }
});

// DELETE /api/packages/:id - Admin Protected: Delete package
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const result = await Package.deleteOne({ id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Package not found' });
    }
    return res.json({ success: true, message: 'Package deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete package', error: error.message });
  }
});

module.exports = router;
