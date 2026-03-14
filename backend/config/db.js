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
    
    // Wait a moment to ensure connection is fully established
    setTimeout(() => {
      const connectionStatus = mongoose.connection.readyState;
      const statusText = connectionStatus === 1 ? 'Connected' : 'Disconnected';
      console.log(`📊 Database Status: ${statusText}`);
      
      if (connectionStatus === 1) {
        // List all collections
        mongoose.connection.db.listCollections().toArray((err, collections) => {
          if (err) {
            console.log(`📚 Collections Found: Error listing collections`);
          } else {
            console.log(`📚 Collections Found: ${collections.length}`);
            collections.forEach(collection => {
              console.log(`   - ${collection.name}`);
            });
          }
        });
      }
    }, 100); // Small delay to ensure connection is fully established
    
  } catch (error) {
    console.error('❌ Database Connection Error:', error.message);
    console.error('🔧 Troubleshooting Tips:');
    console.error('   1. Ensure MongoDB is running');
    console.error('   2. Check connection string in .env file');
    console.error('   3. Verify network connectivity');
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('📡 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose disconnected from MongoDB');
});

// Handle application termination
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('🔌 Mongoose connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error closing connection:', err);
    process.exit(1);
  }
});

module.exports = connectDB;
