import fs from 'fs';

const html = fs.readFileSync('visit.html', 'utf8');
const formStart = html.indexOf('<form class="trial-form"');
const formEnd = html.indexOf('</form>', formStart) + 7;

console.log('FORM:\n', html.substring(formStart, formEnd));
