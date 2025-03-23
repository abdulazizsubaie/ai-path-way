const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // 5 seconds timeout
});

async function checkMongoDBConnection() {
  try {
    console.log('Checking MongoDB connection...');
    
    // Connect to the MongoDB server
    await client.connect();
    
    // Ping the database to check if the connection is successful
    await client.db('admin').command({ ping: 1 });
    
    console.log('✅ MongoDB is running and accessible.');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('   Make sure MongoDB is installed and running.');
    console.error('   Error details:', error.message);
    return false;
  } finally {
    // Close the connection
    await client.close();
  }
}

// Run the function if this script is executed directly
if (require.main === module) {
  checkMongoDBConnection()
    .then(isConnected => {
      process.exit(isConnected ? 0 : 1);
    })
    .catch(error => {
      console.error('An unexpected error occurred:', error);
      process.exit(1);
    });
}

module.exports = checkMongoDBConnection;
