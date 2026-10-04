const fs = require('fs');
const indexCode = fs.readFileSync('scraped/assets/index-BckL96hb.js', 'utf8');

const slice = indexCode.slice(398000, 401000);
const readable = slice.replace(/;/g, ';\n').replace(/,/g, ',\n');
console.log(readable);
