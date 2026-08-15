const express = require('express');
const router = express.Router();
const VisitorMedia = require('../models/VisitorMedia');
const { verifyAdmin } = require('../middleware/auth');

// Simple XSS Sanitization Helper
const sanitizeStr = (str) => {
  if (typeof str !== 'string') return str;
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

// GET /api/media - Public: Get approved visitor photo gallery entries
router.get('/', async (req, res) => {
  try {
    const media = await VisitorMedia.find({ status: 'approved' }).sort({ createdAt: -1 });
    return res.json(media);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching visitor gallery', error: error.message });
  }
});

// GET /api/media/all - Admin Protected: Get all visitor photo gallery entries (pending & approved)
router.get('/all', verifyAdmin, async (req, res) => {
  try {
    const media = await VisitorMedia.find({}).sort({ createdAt: -1 });
    return res.json(media);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching visitor media entries', error: error.message });
  }
});

// POST /api/media - Public: Submit visitor photos/videos (STRICT MAX 3 PHOTOS LIMIT ENFORCED)
router.post('/', async (req, res) => {
  try {
    const { authorName, location, caption, photos } = req.body;

    if (!photos || !Array.isArray(photos) || photos.length === 0) {
      return res.status(400).json({ message: 'Please select at least 1 photo to upload.' });
    }

    // STRICT MAX 3 PHOTOS VALIDATION
    if (photos.length > 3) {
      return res.status(400).json({
        success: false,
        message: 'Upload storage limit exceeded! You can upload a maximum of 3 photos/videos per submission.'
      });
    }

    const newMedia = new VisitorMedia({
      id: `vmed-${Date.now()}`,
      authorName: sanitizeStr(authorName) || 'Anonymous Traveler',
      location: sanitizeStr(location) || 'North Bengal Explorer',
      caption: sanitizeStr(caption) || '',
      photos: photos.slice(0, 3), // Safety cap
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    });

    await newMedia.save();
    return res.status(201).json({
      success: true,
      message: 'Visitor photos uploaded successfully! Pending admin approval.',
      media: newMedia
    });
  } catch (error) {
    return res.status(400).json({ message: 'Failed to upload visitor media', error: error.message });
  }
});

// PUT /api/media/:id/status - Admin Protected: Approve or update visitor media entry status
router.put('/:id/status', verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const item = await VisitorMedia.findOne({ id: req.params.id });
    if (!item) {
      return res.status(404).json({ message: 'Visitor media entry not found' });
    }

    item.status = status || 'approved';
    await item.save();
    return res.json(item);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to update media status', error: error.message });
  }
});

// DELETE /api/media/:id - Admin Protected: Delete visitor media entry
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const result = await VisitorMedia.deleteOne({ id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Visitor media entry not found' });
    }
    return res.json({ success: true, message: 'Visitor media deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete visitor media', error: error.message });
  }
});

module.exports = router;
