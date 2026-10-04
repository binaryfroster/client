import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);

console.log(match ? match[1] : 'Not found');
