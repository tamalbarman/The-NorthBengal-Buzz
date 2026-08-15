const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { verifyAdmin } = require('../middleware/auth');

// Simple XSS Sanitization Helper
const sanitizeStr = (str) => {
  if (typeof str !== 'string') return str;
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

// GET /api/reviews - Public: Get approved guest reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ status: 'approved' }).sort({ createdAt: -1 });
    return res.json(reviews);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
});

// GET /api/reviews/all - Admin Protected: Get all reviews (pending & approved)
router.get('/all', verifyAdmin, async (req, res) => {
  try {
    const reviews = await Review.find({}).sort({ createdAt: -1 });
    return res.json(reviews);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching all reviews', error: error.message });
  }
});

// POST /api/reviews - Public: Submit new guest review (Pending moderation)
router.post('/', async (req, res) => {
  try {
    const { name, location, rating, comment, packageName } = req.body;
    if (!name || !comment) {
      return res.status(400).json({ message: 'Name and comment are required fields.' });
    }

    const newRev = new Review({
      id: `rev-${Date.now()}`,
      name: sanitizeStr(name),
      location: sanitizeStr(location) || 'Visitor',
      rating: Number(rating) || 5,
      comment: sanitizeStr(comment),
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      packageName: sanitizeStr(packageName) || 'General Tour'
    });

    await newRev.save();
    return res.status(201).json({
      success: true,
      message: 'Review submitted successfully! Pending admin approval.',
      review: newRev
    });
  } catch (error) {
    return res.status(400).json({ message: 'Failed to submit review', error: error.message });
  }
});

// PUT /api/reviews/:id/status - Admin Protected: Approve or update review status
router.put('/:id/status', verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const rev = await Review.findOne({ id: req.params.id });
    if (!rev) {
      return res.status(404).json({ message: 'Review not found' });
    }

    rev.status = status || 'approved';
    await rev.save();
    return res.json(rev);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to update review status', error: error.message });
  }
});

// DELETE /api/reviews/:id - Admin Protected: Reject / delete review
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const result = await Review.deleteOne({ id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }
    return res.json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete review', error: error.message });
  }
});

module.exports = router;
