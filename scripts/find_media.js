const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) results = results.concat(walk(file));
    else results.push(file);
  });
  return results;
}

const files = walk('scraped');
const mediaSet = new Set();

files.forEach(f => {
  if (f.endsWith('.js') || f.endsWith('.css') || f.endsWith('.html')) {
    const text = fs.readFileSync(f, 'utf8');
    const matches = text.match(/[\'\"`][^\'\"`\s]+\.(?:png|jpg|jpeg|webp|svg|gif|mp4|webm)[\'\"`]/g);
    if (matches) {
      matches.forEach(m => mediaSet.add(m.slice(1, -1)));
    }
  }
});

console.log('All media references found:');
for (const m of Array.from(mediaSet).sort()) {
  console.log(' -', m);
}
