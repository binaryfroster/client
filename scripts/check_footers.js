import fs from 'fs';

const pages = [
  'index.html',
  'about.html',
  'programs.html',
  'personal-training.html',
  'gallery.html',
  'reviews.html',
  'visit.html',
  'contact.html',
  'privacy-policy.html',
  'terms.html'
];

pages.forEach(p => {
  const content = fs.readFileSync(p, 'utf8');
  const footerMatch = content.match(/<footer[^>]*>([\s\S]*?)<\/footer>/i);
  console.log(`\n--- ${p} ---`);
  if (!footerMatch) {
    console.log('No footer found!');
    return;
  }
  const f = footerMatch[0];
  console.log('Footer length:', f.length);
  console.log('Has footer-brand:', f.includes('footer-brand'));
  console.log('Has footer-contact:', f.includes('footer-contact'));
  console.log('Has footer-legal-links:', f.includes('footer-legal-links'));
  console.log('Has Privacy Policy link:', f.includes('/privacy-policy'));
  console.log('Has Terms link:', f.includes('/terms'));
  console.log('Has Binary Froster:', f.includes('Binary Froster'));
});
