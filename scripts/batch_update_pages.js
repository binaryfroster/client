import fs from 'fs';

const pages = [
  'index.html',
  'about.html',
  'programs.html',
  'personal-training.html',
  'gallery.html',
  'reviews.html',
  'visit.html',
  'owner.html',
  'contact.html',
  'privacy-policy.html',
  'terms.html'
];

console.log('Testing updates across pages...');

pages.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  let originalLength = content.length;

  // 1. Clean up lovable-badge style block
  content = content.replace(/<style>\s*#lovable-badge[\s\S]*?<\/style>/gi, '');

  // 2. Clean up ~flock.js
  content = content.replace(/<script defer src="\/~flock\.js"[^>]*><\/script>/gi, '');

  // 3. Clean up lovable-badge aside and dismissal script
  content = content.replace(/<aside\s+id="lovable-badge"[\s\S]*?<\/aside>/gi, '');
  content = content.replace(/<script>\s*\(\(\)\s*=>\s*\{\s*if\s*\(window\.self\s*!==\s*window\.top[\s\S]*?<\/script>/gi, '');

  // 4. Normalize trial links from /visit?trial=%221%22 to /visit?trial=1#book-trial
  content = content.replace(/href=["']\/visit\?trial=%221%22["']/gi, 'href="/visit?trial=1#book-trial"');
  content = content.replace(/href=["']\/visit\?trial=1["']/gi, 'href="/visit?trial=1#book-trial"');

  // 5. Add gym-interactions.css if not present
  if (!content.includes('gym-interactions.css')) {
    content = content.replace(/<\/head>/i, '  <link rel="stylesheet" href="/assets/gym-interactions.css"/>\n</head>');
  }

  // 6. Add gym-interactions.js before </body> if not present
  if (!content.includes('gym-interactions.js')) {
    content = content.replace(/<\/body>/i, '  <script defer src="/assets/gym-interactions.js"></script>\n</body>');
  }

  // Write updated content
  fs.writeFileSync(file, content, 'utf8');
  console.log(`✅ ${file}: cleaned up badges, normalized trial links, injected interaction assets (Diff: ${content.length - originalLength} bytes)`);
});
