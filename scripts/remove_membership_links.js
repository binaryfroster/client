import fs from 'fs';

['index.html', 'programs.html'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Replace href="/membership" with href="/contact"
  content = content.replaceAll('href="/membership"', 'href="/contact"');
  fs.writeFileSync(file, content);
  console.log(`Removed all /membership links from ${file}`);
});
