const fs = require('fs');
const path = require('path');

const sourceDir = path.join('C:', 'Users', 'heman', 'OneDrive', 'Documents', 'Personal documents', 'CERTIFICATES');
const destDir = path.join(__dirname, 'public', 'certificates');

// Ensure destination exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy all PDFs
fs.readdirSync(sourceDir).forEach(file => {
  if (file.toLowerCase().endsWith('.pdf')) {
    const srcFile = path.join(sourceDir, file);
    const destFile = path.join(destDir, file);
    fs.copyFileSync(srcFile, destFile);
    console.log(`Copied: ${file}`);
  }
});

console.log('All certificates copied successfully to public/certificates/');
