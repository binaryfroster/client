import fs from 'fs';

const pages = ['index.html', 'about.html', 'programs.html', 'personal-training.html', 'contact.html', 'gallery.html', 'reviews.html', 'visit.html', 'owner.html', 'privacy-policy.html', 'terms.html'];

console.log('=== HEADER & MOBILE NAV INSPECTION ===');
pages.forEach(p => {
  if (!fs.existsSync(p)) return;
  const content = fs.readFileSync(p, 'utf8');
  
  // Look for header markup
  const headerMatch = content.match(/<header[^>]*>([\s\S]*?)<\/header>/i);
  const mobileBtnMatch = content.match(/<button[^>]*aria-label=["'][^"']*menu[^"']*["'][^>]*>|<button[^>]*class=["'][^"']*(?:hamburger|menu|mobile)[^"']*["'][^>]*>/i);
  const ctaMatch = content.match(/<a[^>]*class=["'][^"']*nav-cta[^"']*["'][^>]*>([\s\S]*?)<\/a>/i);
  
  console.log(`\n--- ${p} ---`);
  console.log('Has <header>:', !!headerMatch);
  if (headerMatch) {
    console.log('Header length:', headerMatch[0].length);
    // check if it has mobile menu toggle button
    const hasBtnInHeader = headerMatch[0].includes('<button');
    console.log('Header has <button>:', hasBtnInHeader);
  }
  console.log('Mobile menu button pattern:', mobileBtnMatch ? mobileBtnMatch[0] : 'None');
  console.log('Nav CTA button:', ctaMatch ? ctaMatch[0].trim() : 'None');
});
