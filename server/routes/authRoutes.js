const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/auth');

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { password } = req.body;
  
  if (password === 'admin123' || password === 'admin') {
    const token = jwt.sign({ role: 'admin', user: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
    return res.json({
      success: true,
      token,
      message: 'Admin authentication successful'
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid Admin Password.'
  });
});

module.exports = router;
