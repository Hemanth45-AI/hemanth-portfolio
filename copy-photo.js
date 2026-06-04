const fs = require('fs');
const src = 'C:\\Users\\heman\\Downloads\\hemanth photo.jpeg';
const dest = 'C:\\Users\\heman\\OneDrive\\Desktop\\hemanth-portfolio\\public\\profile.jpeg';
fs.copyFileSync(src, dest);
console.log('Photo copied successfully!');
