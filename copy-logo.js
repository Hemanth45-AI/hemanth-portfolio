const fs = require('fs');
const path = require('path');

const srcFile = 'C:\\Users\\heman\\.gemini\\antigravity-ide\\brain\\741bd923-1155-4766-b081-3631ce7e4410\\hemanth_logo_text_1780569871449.png';
const destFile = path.join(__dirname, 'public', 'logo.png');

fs.copyFileSync(srcFile, destFile);
console.log('Logo copied successfully to public/logo.png');
