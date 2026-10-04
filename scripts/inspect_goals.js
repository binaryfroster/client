import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/<section class="section section-alt goals-section">([\s\S]*?)<\/section>/);
if (match) {
  console.log('Goals section found!');
  const buttons = [...match[0].matchAll(/<button[^>]*>([\s\S]*?)<\/button>/g)].map(m => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
  console.log('Buttons:', buttons);
} else {
  console.log('Goals section not found');
}
