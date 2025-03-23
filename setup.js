const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n=== Career Pathway AI Assistant Setup ===\n');
console.log('This script will help you set up the Career Pathway AI Assistant application.');
console.log('It will install dependencies, set up the database, and start the application.\n');

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const runCommand = (command, directory = null) => {
  try {
    const options = directory ? { cwd: directory, stdio: 'inherit' } : { stdio: 'inherit' };
    execSync(command, options);
    return true;
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error.message);
    return false;
  }
};

const checkMongoDBConnection = require('./checkMongoDB');

const setupEnvFile = async () => {
  const envPath = path.join(__dirname, 'backend', '.env');
  
  if (fs.existsSync(envPath)) {
    const overwrite = await question('An .env file already exists. Do you want to overwrite it? (y/n): ');
    if (overwrite.toLowerCase() !== 'y') {
      console.log('Skipping .env file setup.');
      return;
    }
  }
  
  const port = await question('Enter the port for the backend server (default: 5000): ') || '5000';
  const mongoUri = await question('Enter MongoDB URI (default: mongodb://localhost:27017/career-pathway): ') || 'mongodb://localhost:27017/career-pathway';
  const jwtSecret = await question('Enter JWT secret key (default: your_jwt_secret_key_here): ') || 'your_jwt_secret_key_here';
  const nodeEnv = await question('Enter NODE_ENV (default: development): ') || 'development';
  const corsOrigin = await question('Enter CORS origin (default: http://localhost:3000): ') || 'http://localhost:3000';
  
  const envContent = `PORT=${port}
MONGO_URI=${mongoUri}
JWT_SECRET=${jwtSecret}
NODE_ENV=${nodeEnv}
CORS_ORIGIN=${corsOrigin}
`;
  
  fs.writeFileSync(envPath, envContent);
  console.log('Environment file (.env) created successfully.');
};

const main = async () => {
  try {
    // Check MongoDB connection
    console.log('\n🔍 Checking MongoDB connection...');
    const mongoDBConnected = await checkMongoDBConnection();
    if (!mongoDBConnected) {
      console.log('\n⚠️ MongoDB connection failed.');
      console.log('Please make sure MongoDB is installed and running before continuing:');
      console.log('- Windows: https://www.mongodb.com/try/download/community');
      console.log('- macOS: brew install mongodb-community');
      console.log('- Linux: Follow instructions at https://docs.mongodb.com/manual/administration/install-on-linux/\n');
      
      const proceed = await question('Do you want to proceed anyway? (y/n): ');
      if (proceed.toLowerCase() !== 'y') {
        console.log('Setup aborted. Please install and start MongoDB, then try again.');
        rl.close();
        return;
      }
    }
    
    // Install dependencies
    console.log('\n📦 Installing dependencies...');
    const depsInstalled = runCommand('npm run install-all');
    if (!depsInstalled) {
      console.log('Failed to install dependencies. Please try again.');
      rl.close();
      return;
    }
    console.log('✅ Dependencies installed successfully.');
    
    // Setup environment file
    console.log('\n🔧 Setting up environment file...');
    await setupEnvFile();
    
    // Import sample data
    console.log('\n📊 Importing sample data...');
    const dataImported = runCommand('npm run data:import');
    if (!dataImported) {
      console.log('Failed to import sample data. Please check your MongoDB connection.');
      const proceed = await question('Do you want to proceed anyway? (y/n): ');
      if (proceed.toLowerCase() !== 'y') {
        console.log('Setup aborted.');
        rl.close();
        return;
      }
    } else {
      console.log('✅ Sample data imported successfully.');
    }
    
    console.log('\n🎉 Setup completed successfully!');
    console.log('\nTo start the application, run:');
    console.log('npm start');
    console.log('\nThis will start both the backend server and the frontend development server.');
    console.log('- Backend: http://localhost:5000');
    console.log('- Frontend: http://localhost:3000');
    
    const startNow = await question('\nDo you want to start the application now? (y/n): ');
    if (startNow.toLowerCase() === 'y') {
      console.log('\n🚀 Starting the application...');
      runCommand('npm start');
    } else {
      console.log('\nYou can start the application later by running: npm start');
    }
    
    rl.close();
  } catch (error) {
    console.error('An error occurred during setup:', error);
    rl.close();
  }
};

main();
