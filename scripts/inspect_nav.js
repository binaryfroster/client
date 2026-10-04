import fs from 'fs';
import path from 'path';

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

console.log(`Found ${files.length} HTML files.`);
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const match = content.match(/<nav class="desktop-nav"[^>]*>([\s\S]*?)<\/nav>/);
  if (match) {
    console.log(`\n--- ${file} ---`);
    console.log(match[0]);
  } else {
    console.log(`\n--- ${file} (NO NAV FOUND) ---`);
  }
}
