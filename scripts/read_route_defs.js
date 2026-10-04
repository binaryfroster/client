const fs = require('fs');
const indexCode = fs.readFileSync('scraped/assets/index-BckL96hb.js', 'utf8');

const slice = indexCode.slice(400000, 403000);
// format with newlines
const readable = slice.replace(/;/g, ';\n').replace(/,/g, ',\n');
console.log(readable);
