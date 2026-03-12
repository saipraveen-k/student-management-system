const mongoose = require('mongoose');

// Database connection configuration
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/student_management', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`✅ Database Connected Successfully`);
    console.log(`📍 Database Name: student_management`);
    console.log(`🏢 MongoDB Server: ${conn.connection.host}:${conn.connection.port}`);
    console.log(`📊 Database Status: ${conn.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    
    // List all collections
    const db = mongoose.connection.db;
    const collections = await db.listCollections();
    console.log(`📚 Collections Found: ${collections.length}`);
    collections.forEach(collection => {
      console.log(`   - ${collection.name}`);
    });
    
  } catch (error) {
    console.error('❌ Database Connection Error:', error.message);
    console.error('🔧 Troubleshooting Tips:');
    console.error('   1. Ensure MongoDB is running');
    console.error('   2. Check connection string in .env file');
    console.error('   3. Verify network connectivity');
    process.exit(1);
  }
};

module.exports = connectDB;
