const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/northbengal_buzz';
    console.log(`Connecting to MongoDB at: ${connStr}...`);
    
    await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 5000 // Timeout after 5s if MongoDB service isn't running
    });
    
    console.log('✅ MongoDB Database Connected Successfully!');
    return true;
  } catch (error) {
    console.warn('⚠️ Could not connect to local/atlas MongoDB instance:', error.message);
    console.warn('💡 Tip: Ensure MongoDB service is running locally or specify MONGODB_URI in .env file.');
    console.warn('⚡ Backend server will continue running in fallback mode.');
    return false;
  }
};

module.exports = connectDB;
