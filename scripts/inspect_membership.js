import fs from 'fs';

const js = fs.readFileSync('assets/membership-B66W1dg5.js', 'utf8');
console.log('File size:', js.length);

const regex = /"([^"]{4,80})"/g;
let m;
const found = new Set();
while ((m = regex.exec(js)) !== null) {
  if (/select|plan|faq|filter|dropdown|option|regular|personal|duration|accordion/i.test(m[1])) {
    found.add(m[1]);
  }
}
console.log('Matches in membership bundle:', Array.from(found).slice(0, 50));
