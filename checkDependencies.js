const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to check if a command is available
function isCommandAvailable(command) {
  try {
    const cmd = process.platform === 'win32' ? 'where' : 'which';
    execSync(`${cmd} ${command}`, { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

// Function to check if a directory exists
function directoryExists(dirPath) {
  try {
    return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  } catch (error) {
    return false;
  }
}

// Function to check if Node.js is installed
function checkNodeJS() {
  try {
    const version = execSync('node --version', { encoding: 'utf8' }).trim();
    console.log(`✅ Node.js is installed (${version})`);
    return true;
  } catch (error) {
    console.error('❌ Node.js is not installed or not in PATH');
    console.error('   Please install Node.js from https://nodejs.org/');
    return false;
  }
}

// Function to check if npm is installed
function checkNPM() {
  try {
    const version = execSync('npm --version', { encoding: 'utf8' }).trim();
    console.log(`✅ npm is installed (${version})`);
    return true;
  } catch (error) {
    console.error('❌ npm is not installed or not in PATH');
    console.error('   npm should be installed with Node.js');
    return false;
  }
}

// Function to check if MongoDB is installed
function checkMongoDB() {
  if (isCommandAvailable('mongod')) {
    try {
      const version = execSync('mongod --version', { encoding: 'utf8' })
        .split('\n')[0]
        .trim();
      console.log(`✅ MongoDB is installed (${version})`);
      return true;
    } catch (error) {
      console.error('❌ MongoDB is installed but there was an error checking the version');
      return false;
    }
  } else {
    console.error('❌ MongoDB is not installed or not in PATH');
    console.error('   Please install MongoDB from https://www.mongodb.com/try/download/community');
    return false;
  }
}

// Function to check if node_modules directories exist
function checkNodeModules() {
  const rootNodeModules = path.join(__dirname, 'node_modules');
  const backendNodeModules = path.join(__dirname, 'backend', 'node_modules');
  const frontendNodeModules = path.join(__dirname, 'frontend', 'node_modules');
  
  const rootExists = directoryExists(rootNodeModules);
  const backendExists = directoryExists(backendNodeModules);
  const frontendExists = directoryExists(frontendNodeModules);
  
  console.log(`${rootExists ? '✅' : '❌'} Root node_modules ${rootExists ? 'exists' : 'is missing'}`);
  console.log(`${backendExists ? '✅' : '❌'} Backend node_modules ${backendExists ? 'exists' : 'is missing'}`);
  console.log(`${frontendExists ? '✅' : '❌'} Frontend node_modules ${frontendExists ? 'exists' : 'is missing'}`);
  
  return rootExists && backendExists && frontendExists;
}

// Main function to check all dependencies
function checkAllDependencies() {
  console.log('Checking dependencies...\n');
  
  const nodeInstalled = checkNodeJS();
  const npmInstalled = checkNPM();
  const mongoDBInstalled = checkMongoDB();
  
  console.log('\nChecking node_modules directories...');
  const nodeModulesExist = checkNodeModules();
  
  console.log('\nSummary:');
  if (nodeInstalled && npmInstalled && mongoDBInstalled && nodeModulesExist) {
    console.log('✅ All dependencies are installed and ready to use.');
    return true;
  } else {
    console.log('❌ Some dependencies are missing or not properly installed.');
    console.log('   Please fix the issues above before running the application.');
    
    if (!nodeModulesExist) {
      console.log('\nTo install node_modules, run:');
      console.log('npm run install-all');
    }
    
    return false;
  }
}

// Run the function if this script is executed directly
if (require.main === module) {
  const result = checkAllDependencies();
  process.exit(result ? 0 : 1);
}

module.exports = checkAllDependencies;
