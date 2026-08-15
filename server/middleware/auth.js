const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'northbengal_buzz_super_secret_jwt_key_2026';

const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No authorization token provided.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired authentication token.' });
  }
};

module.exports = { verifyAdmin, JWT_SECRET };
