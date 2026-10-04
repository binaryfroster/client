import fs from 'fs';

const pages = [
  'about.html',
  'contact.html',
  'gallery.html',
  'index.html',
  'personal-training.html',
  'privacy-policy.html',
  'programs.html',
  'reviews.html',
  'terms.html',
  'visit.html'
];

for (const file of pages) {
  let content = fs.readFileSync(file, 'utf8');

  // Regex to match the Programs link inside desktop-nav
  // It can be <a class="active active" href="/programs" data-status="active" aria-current="page">Programs</a>
  // or <a href="/programs">Programs</a>
  const isProgramsPage = file === 'programs.html';
  const triggerActiveAttr = isProgramsPage ? ' class="nav-dropdown-trigger active" data-status="active" aria-current="page"' : ' class="nav-dropdown-trigger"';

  const dropdownHtml = `<div class="nav-item-dropdown">
<a href="/programs"${triggerActiveAttr} aria-haspopup="true" aria-expanded="false">
Programs &amp; Membership
<svg class="dropdown-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
</a>
<div class="nav-dropdown-menu" role="menu">
<a href="/programs#regular-training" class="nav-dropdown-item" role="menuitem">
<strong>Regular Gym Membership</strong>
<span>Monthly, quarterly &amp; annual memberships</span>
</a>
<a href="/personal-training" class="nav-dropdown-item" role="menuitem">
<strong>Personal Training (1-on-1)</strong>
<span>Dedicated coach, custom programming &amp; nutrition</span>
</a>
<a href="/programs#diet-plan" class="nav-dropdown-item" role="menuitem">
<strong>Custom Diet &amp; Nutrition</strong>
<span>Goal-based macro plans &amp; vegetarian guidance</span>
</a>
<a href="/programs#plan-finder" class="nav-dropdown-item" role="menuitem">
<strong>Membership Plan Finder</strong>
<span>Calculate pricing by goal &amp; commitment</span>
</a>
<a href="/visit?trial=1#book-trial" class="nav-dropdown-item highlight-item" role="menuitem">
<strong style="color:var(--primary, #a8ff00);">⚡ Book Free 1-Day Trial Pass</strong>
<span>Zero obligation · Coach consultation included</span>
</a>
</div>
</div>`.replace(/\n/g, '');

  // Check if dropdown is already there
  if (content.includes('nav-item-dropdown')) {
    console.log(`${file} already has nav-item-dropdown, skipping or updating...`);
    // Replace existing nav-item-dropdown to ensure clean HTML
    content = content.replace(/<div class="nav-item-dropdown">[\s\S]*?<\/div><\/div>/, dropdownHtml);
  } else {
    // Replace <a ... href="/programs" ...>Programs</a>
    const regProg = /<a\s+[^>]*href="\/programs"[^>]*>Programs<\/a>/;
    if (regProg.test(content)) {
      content = content.replace(regProg, dropdownHtml);
      console.log(`Replaced Programs link in ${file}`);
    } else {
      console.log(`WARNING: Could not find Programs link in ${file}`);
    }
  }

  // Also in footer: update "Programs" to "Programs & Membership" if present
  content = content.replace(/(<a[^>]*href="\/programs"[^>]*>)Programs(<\/a>)/g, '$1Programs &amp; Membership$2');

  fs.writeFileSync(file, content, 'utf8');
}

console.log('Finished updating navigation across all pages.');
