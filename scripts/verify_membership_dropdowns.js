import fs from 'fs';
import path from 'path';

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passCount++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failCount++;
  }
}

console.log('=== VERIFYING MEMBERSHIP DROPDOWNS & NAVIGATION ===\n');

// 1. Check all 10 HTML files for Programs & Membership nav dropdown
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

console.log('1. Checking Navigation Dropdown in all 10 HTML pages:');
for (const page of pages) {
  const content = fs.readFileSync(page, 'utf8');
  assert(content.includes('class="nav-item-dropdown"'), `${page} has .nav-item-dropdown container`);
  assert(content.includes('Programs &amp; Membership'), `${page} has "Programs & Membership" trigger text`);
  assert(content.includes('class="nav-dropdown-menu"'), `${page} has .nav-dropdown-menu`);
  assert(content.includes('href="/programs#regular-training"'), `${page} menu links to /programs#regular-training`);
  assert(content.includes('href="/personal-training"'), `${page} menu links to /personal-training`);
  assert(content.includes('href="/programs#diet-plan"'), `${page} menu links to /programs#diet-plan`);
  assert(content.includes('href="/programs#plan-finder"'), `${page} menu links to /programs#plan-finder`);
  assert(content.includes('href="/visit?trial=1#book-trial"'), `${page} menu links to /visit?trial=1#book-trial`);
}

// 2. Check contact.html dropdown
console.log('\n2. Checking contact.html Membership Dropdown:');
const contactHtml = fs.readFileSync('contact.html', 'utf8');
assert(contactHtml.includes('id="c-interest"'), 'contact.html has id="c-interest"');
assert(contactHtml.includes('label="Regular Gym Membership"'), 'contact.html has Regular Gym Membership optgroup');
assert(contactHtml.includes('Regular Membership - 1 Month (₹1,500)'), 'contact.html has 1 Month Regular Membership option');
assert(contactHtml.includes('Regular Membership - 1 Year (₹9,000)'), 'contact.html has 1 Year Regular Membership option');
assert(contactHtml.includes('label="Personal Training (1-on-1 Dedicated Coaching)"'), 'contact.html has PT optgroup');
assert(contactHtml.includes('Personal Training - 1 Year (₹52,500)'), 'contact.html has 1 Year PT option');
assert(contactHtml.includes('initContactUrlParams'), 'contact.html has initContactUrlParams script');

// 3. Check programs.html Plan Finder & Program Selector
console.log('\n3. Checking programs.html Plan Finder & Program Selector:');
const programsHtml = fs.readFileSync('programs.html', 'utf8');
assert(programsHtml.includes('id="plan-finder"'), 'programs.html has id="plan-finder" section');
assert(programsHtml.includes('id="finder-goal"'), 'programs.html has id="finder-goal" dropdown');
assert(programsHtml.includes('id="finder-duration"'), 'programs.html has id="finder-duration" dropdown');
assert(programsHtml.includes('id="finder-price"'), 'programs.html has id="finder-price" element');
assert(programsHtml.includes('id="finder-cta"'), 'programs.html has id="finder-cta" CTA button');
assert(programsHtml.includes('id="program-selector"'), 'programs.html has id="program-selector"');
assert(programsHtml.includes('id="regular-training"'), 'programs.html has id="regular-training" anchor');
assert(programsHtml.includes('id="diet-plan"'), 'programs.html has id="diet-plan" anchor');

// 4. Check visit.html form & dropdowns
console.log('\n4. Checking visit.html Form & Dropdowns:');
const visitHtml = fs.readFileSync('visit.html', 'utf8');
assert(visitHtml.includes('id="v-name"'), 'visit.html has id="v-name"');
assert(visitHtml.includes('id="v-phone"'), 'visit.html has id="v-phone"');
assert(visitHtml.includes('id="v-goal"'), 'visit.html has id="v-goal" dropdown');
assert(visitHtml.includes('id="v-plan"'), 'visit.html has id="v-plan" dropdown');
assert(visitHtml.includes('id="v-session"'), 'visit.html has id="v-session" dropdown');
assert(visitHtml.includes('Regular Membership - 1 Month (₹1,500)'), 'visit.html has 1 Month Regular Membership option');
assert(visitHtml.includes('Personal Training - 1 Month (₹6,000)'), 'visit.html has 1 Month PT option');
assert(visitHtml.includes('initVisitUrlParams'), 'visit.html has initVisitUrlParams script');

// 5. Check assets/gym-interactions.css
console.log('\n5. Checking assets/gym-interactions.css styles:');
const css = fs.readFileSync('assets/gym-interactions.css', 'utf8');
assert(css.includes('.nav-item-dropdown'), 'css defines .nav-item-dropdown');
assert(css.includes('.desktop-nav .nav-item-dropdown'), 'css defines .desktop-nav .nav-item-dropdown');
assert(css.includes('.desktop-nav .nav-dropdown-menu a.nav-dropdown-item'), 'css overrides desktop-nav a styles for dropdown items');
assert(css.includes('.nav-dropdown-menu::before'), 'css has invisible hover bridge .nav-dropdown-menu::before');
assert(css.includes('.mobile-drawer-group'), 'css defines .mobile-drawer-group');
assert(css.includes('.mobile-sublinks'), 'css defines .mobile-sublinks');
assert(css.includes('.plan-finder-section'), 'css defines .plan-finder-section');
assert(css.includes('select:focus'), 'css defines custom dark select focus');

// 6. Check assets/gym-interactions.js
console.log('\n6. Checking assets/gym-interactions.js logic:');
const js = fs.readFileSync('assets/gym-interactions.js', 'utf8');
assert(js.includes('function initPlanFinder()'), 'js implements initPlanFinder');
assert(js.includes('function initProgramSelector()'), 'js implements initProgramSelector');
assert(js.includes('function initNavDropdown()'), 'js implements initNavDropdown');
assert(js.includes('selectTabByHash'), 'js supports hash synchronization for program selector');
assert(js.includes('mobile-drawer-group'), 'js drawer renders mobile-drawer-group');
assert(js.includes('select[name="plan"]'), 'js handles plan selection in visit trial form');
assert(js.includes('Selected Plan / Interest:'), 'js passes selected plan to WhatsApp');

console.log(`\n===================================`);
console.log(`TOTAL CHECKS: ${passCount + failCount}`);
console.log(`PASSED: ${passCount}`);
console.log(`FAILED: ${failCount}`);
console.log(`===================================\n`);

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('ALL MEMBERSHIP DROPDOWN CHECKS PASSED PERFECTLY!');
}
