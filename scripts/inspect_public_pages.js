import fs from 'fs';

const js = fs.readFileSync('assets/PublicPages-BYBzPx0t.js', 'utf8');
console.log('PublicPages size:', js.length);

const regex = /"([^"]{4,80})"/g;
let m;
const found = new Set();
while ((m = regex.exec(js)) !== null) {
  if (/select|plan|faq|filter|dropdown|option|membership|training/i.test(m[1])) {
    found.add(m[1]);
  }
}
console.log('Matches in PublicPages:', Array.from(found).slice(0, 40));
