const mongoose = require('mongoose');

async function testConnection() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error('❌ MONGODB_URI is not defined in the environment.');
      process.exit(1);
    }
    
    console.log('Connecting to database...');
    await mongoose.connect(uri);
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    // Check if the connection is ready
    const state = mongoose.connection.readyState;
    console.log('Connection state:', state === 1 ? 'Connected (1)' : state);
    
    await mongoose.disconnect();
    console.log('Disconnected properly.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:');
    console.error(error.message);
    process.exit(1);
  }
}

testConnection();
