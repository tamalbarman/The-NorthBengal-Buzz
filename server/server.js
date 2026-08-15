const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const packageRoutes = require('./routes/packageRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const mediaRoutes = require('./routes/mediaRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '15mb' })); // Support image Data URLs
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/media', mediaRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'The NorthBengal Buzz Backend REST API',
    time: new Date().toISOString()
  });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`🚀 Node.js Express REST API server running on: http://localhost:${PORT}/api`);
});
