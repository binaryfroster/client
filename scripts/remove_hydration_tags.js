import fs from 'fs';

const pages = [
  'index.html',
  'about.html',
  'programs.html',
  'personal-training.html',
  'gallery.html',
  'reviews.html',
  'visit.html'
];

pages.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // 1. Remove TSR stream barrier script
  content = content.replace(/<script class="\$tsr" id="\$tsr-stream-barrier">[\s\S]*?<\/script>/g, '');

  // 2. Remove module scripts pointing to index-BckL96hb.js
  content = content.replace(/<script type="module" async="" src="\/assets\/index-BckL96hb\.js"><\/script>/g, '');
  content = content.replace(/<script type="module" src="\/assets\/index-BckL96hb\.js"><\/script>/g, '');

  // 3. Remove modulepreloads that trigger unnecessary bundle downloads
  content = content.replace(/<link rel="modulepreload" href="\/assets\/index-BckL96hb\.js"\/>/g, '');
  content = content.replace(/<link rel="modulepreload" href="\/assets\/routes-CG-tjpok\.js"\/>/g, '');
  content = content.replace(/<link rel="modulepreload" href="\/assets\/arrow-right-BGNB-Sdj\.js"\/>/g, '');
  content = content.replace(/<link rel="modulepreload" href="\/assets\/PublicBlocks-D9-2YQ0P\.js"\/>/g, '');
  content = content.replace(/<link rel="modulepreload" href="\/assets\/users-BQZR0k5M\.js"\/>/g, '');

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Cleaned hydration tags from ${file}`);
});
