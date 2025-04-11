const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../../storybooks');
const destDir = path.join(__dirname, '../public/storybooks');

// Create destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy all storybook directories and their contents
fs.readdirSync(sourceDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .forEach(dirent => {
    const sourcePath = path.join(sourceDir, dirent.name);
    const destPath = path.join(destDir, dirent.name);
    
    // Create destination directory
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath, { recursive: true });
    }
    
    // Copy all files
    fs.readdirSync(sourcePath)
      .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
      .forEach(file => {
        const sourceFile = path.join(sourcePath, file);
        const destFile = path.join(destPath, file);
        fs.copyFileSync(sourceFile, destFile);
      });
  });

console.log('Storybook images copied to public directory'); 