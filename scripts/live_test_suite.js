import { JSDOM } from 'jsdom';

const BASE_URL = 'http://localhost:3000';

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    console.log(`  ✅ [PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`  ❌ [FAIL] ${testName} ${details ? '(' + details + ')' : ''}`);
    failedTests++;
  }
}

async function fetchLive(path) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, { redirect: 'manual' });
  const text = await res.text();
  return { status: res.status, headers: res.headers, text };
}

async function runLiveTests() {
  console.log('===============================================================');
  console.log('🚀 STARTING COMPREHENSIVE LIVE END-TO-END TEST SUITE');
  console.log(`Target: ${BASE_URL}`);
  console.log('===============================================================\n');

  // --- SECTION 1: LIVE HTTP STATUS & ROUTE VERIFICATION ---
  console.log('--- SECTION 1: HTTP ROUTES & HEADERS ---');
  const routes = [
    { path: '/', expectedStatus: 200, checkText: 'POWER HOUSE' },
    { path: '/about', expectedStatus: 200, checkText: 'Ameer Mullani' },
    { path: '/programs', expectedStatus: 200, checkText: 'PLAN FINDER' },
    { path: '/personal-training', expectedStatus: 200, checkText: 'Personal Training' },
    { path: '/contact', expectedStatus: 200, checkText: 'Primary Interest' },
    { path: '/gallery', expectedStatus: 200, checkText: 'Gallery' },
    { path: '/reviews', expectedStatus: 200, checkText: 'Google rating' },
    { path: '/visit', expectedStatus: 200, checkText: 'BOOK A FREE TRIAL' },
    { path: '/privacy-policy', expectedStatus: 200, checkText: 'Privacy Policy' },
    { path: '/terms', expectedStatus: 200, checkText: 'Terms of Service' },
    { path: '/membership', expectedStatus: 301, checkLocation: '/contact' },
    { path: '/robots.txt', expectedStatus: 200, contentType: 'text/plain' },
    { path: '/sitemap.xml', expectedStatus: 200, contentType: 'application/xml' },
    { path: '/assets/gym-interactions.css', expectedStatus: 200, contentType: 'text/css' },
    { path: '/assets/gym-interactions.js', expectedStatus: 200, contentType: 'application/javascript' }
  ];

  for (const r of routes) {
    const res = await fetchLive(r.path);
    assert(res.status === r.expectedStatus, `GET ${r.path} returns ${r.expectedStatus}`, `Got ${res.status}`);
    if (r.checkText) {
      assert(res.text.includes(r.checkText), `GET ${r.path} contains expected body text: "${r.checkText}"`);
    }
    if (r.checkLocation) {
      const loc = res.headers.get('location');
      assert(loc === r.checkLocation, `GET ${r.path} redirects to ${r.checkLocation}`, `Got Location: ${loc}`);
    }
    if (r.contentType) {
      const ct = res.headers.get('content-type') || '';
      assert(ct.includes(r.contentType), `GET ${r.path} has content-type ${r.contentType}`, `Got Content-Type: ${ct}`);
    }
  }

  // Fetch interaction JS bundle for DOM simulation
  const jsBundleRes = await fetchLive('/assets/gym-interactions.js');
  const interactionJs = jsBundleRes.text;

  // --- SECTION 2: LIVE DOM TESTING — NAVIGATION DROPDOWN & DRAWER ---
  console.log('\n--- SECTION 2: NAVIGATION DROPDOWN & MOBILE DRAWER (DOM SIMULATION) ---');
  {
    const homeRes = await fetchLive('/');
    const dom = new JSDOM(homeRes.text, {
      url: `${BASE_URL}/`,
      runScripts: 'dangerously'
    });
    const { window } = dom;
    window.scrollTo = () => {};
    Object.defineProperty(window, 'innerWidth', { value: 768, writable: true, configurable: true });

    // Execute gym-interactions.js inside DOM context
    window.eval(interactionJs);
    window.document.dispatchEvent(new window.Event('DOMContentLoaded'));

    // Test Navigation Dropdown markup
    const dropdown = window.document.querySelector('.nav-item-dropdown');
    assert(!!dropdown, 'Desktop nav has .nav-item-dropdown component');

    const trigger = dropdown ? dropdown.querySelector('.nav-dropdown-trigger') : null;
    assert(!!trigger, '.nav-item-dropdown has .nav-dropdown-trigger');
    assert(trigger && trigger.textContent.includes('Programs & Membership'), 'Trigger text is "Programs & Membership"');

    const menu = dropdown ? dropdown.querySelector('.nav-dropdown-menu') : null;
    assert(!!menu, '.nav-item-dropdown has .nav-dropdown-menu');

    const menuItems = menu ? menu.querySelectorAll('.nav-dropdown-item') : [];
    assert(menuItems.length === 5, `Dropdown menu contains exactly 5 items (Found: ${menuItems.length})`);

    // Simulate clicking dropdown trigger on mobile breakpoint
    trigger.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
    assert(dropdown.classList.contains('is-open'), 'Clicking dropdown on mobile toggles .is-open class');

    // Simulate clicking outside dropdown
    window.document.body.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
    assert(!dropdown.classList.contains('is-open'), 'Clicking outside removes .is-open class');

    // Test Mobile Drawer
    const menuBtn = window.document.querySelector('.menu-button');
    assert(!!menuBtn, 'Site header has mobile .menu-button');

    const drawer = window.document.querySelector('.mobile-drawer');
    assert(!!drawer, 'gym-interactions.js injected .mobile-drawer into DOM');

    // Open drawer
    menuBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
    assert(drawer.classList.contains('open'), 'Clicking .menu-button opens .mobile-drawer (.open class added)');
    assert(drawer.getAttribute('aria-hidden') === 'false', 'Drawer aria-hidden updated to "false"');

    // Verify drawer contains Programs & Membership group
    const drawerGroup = drawer.querySelector('.mobile-drawer-group');
    assert(!!drawerGroup, 'Drawer contains .mobile-drawer-group');
    const sublinks = drawer.querySelectorAll('.mobile-sublink');
    assert(sublinks.length === 4, `Drawer has 4 direct sublinks (Found: ${sublinks.length})`);

    // Close drawer
    const closeBtn = drawer.querySelector('.mobile-drawer-close');
    assert(!!closeBtn, 'Drawer has .mobile-drawer-close button');
    closeBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
    assert(!drawer.classList.contains('open'), 'Clicking .mobile-drawer-close closes .mobile-drawer');
  }

  // --- SECTION 3: LIVE DOM TESTING — PROGRAMS PAGE (PLAN FINDER & SELECTOR) ---
  console.log('\n--- SECTION 3: PROGRAMS PAGE (PLAN FINDER & SELECTOR SIMULATION) ---');
  {
    const progRes = await fetchLive('/programs');
    const dom = new JSDOM(progRes.text, {
      url: `${BASE_URL}/programs`,
      runScripts: 'dangerously'
    });
    const { window } = dom;
    window.scrollTo = () => {};

    window.eval(interactionJs);
    window.document.dispatchEvent(new window.Event('DOMContentLoaded'));

    // Test 1: Plan Finder Dropdown Live Updates
    const goalSelect = window.document.getElementById('finder-goal');
    const durationSelect = window.document.getElementById('finder-duration');
    const priceDisplay = window.document.getElementById('finder-price');
    const ctaBtn = window.document.getElementById('finder-cta');
    const ptTabBtn = window.document.querySelector('#finder-type-tabs .plan-finder-tab-btn[data-type="Personal Training"]');
    const regTabBtn = window.document.querySelector('#finder-type-tabs .plan-finder-tab-btn[data-type="Regular Training"]');

    assert(!!goalSelect, 'Plan Finder has #finder-goal select');
    assert(!!durationSelect, 'Plan Finder has #finder-duration select');
    assert(!!priceDisplay, 'Plan Finder has #finder-price display');
    assert(!!ctaBtn, 'Plan Finder has #finder-cta button');

    // Initial state: Regular, 1 month -> ₹1,500
    assert(priceDisplay.textContent.trim() === '₹1,500', 'Initial Regular 1 Month price is ₹1,500');

    // Change duration to 3 months -> ₹4,000
    durationSelect.value = '3';
    durationSelect.dispatchEvent(new window.Event('change'));
    assert(priceDisplay.textContent.trim() === '₹4,000', 'Regular 3 Months price updates live to ₹4,000');
    assert(ctaBtn.href.includes('plan=3%20Months%20Regular%20Training'), 'CTA href updates with encoded 3 Months plan param');

    // Change duration to 6 months -> ₹6,000
    durationSelect.value = '6';
    durationSelect.dispatchEvent(new window.Event('change'));
    assert(priceDisplay.textContent.trim() === '₹6,000', 'Regular 6 Months price updates live to ₹6,000');

    // Change duration to 12 months -> ₹9,000
    durationSelect.value = '12';
    durationSelect.dispatchEvent(new window.Event('change'));
    assert(priceDisplay.textContent.trim() === '₹9,000', 'Regular 1 Year price updates live to ₹9,000');

    // Switch to Personal Training Tab
    ptTabBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
    assert(ptTabBtn.classList.contains('is-active'), 'Personal Training tab button becomes .is-active');

    // PT 12 Months -> ₹52,500
    assert(priceDisplay.textContent.trim() === '₹52,500', 'Personal Training 1 Year price calculates to ₹52,500');

    // PT 1 Month -> ₹6,000
    durationSelect.value = '1';
    durationSelect.dispatchEvent(new window.Event('change'));
    assert(priceDisplay.textContent.trim() === '₹6,000', 'Personal Training 1 Month price calculates to ₹6,000');

    // PT 3 Months -> ₹15,000
    durationSelect.value = '3';
    durationSelect.dispatchEvent(new window.Event('change'));
    assert(priceDisplay.textContent.trim() === '₹15,000', 'Personal Training 3 Months price calculates to ₹15,000');

    // Change Goal dropdown to "Weight Loss"
    goalSelect.value = 'Weight Loss';
    goalSelect.dispatchEvent(new window.Event('change'));
    assert(ctaBtn.href.includes('goal=Weight%20Loss'), 'CTA href updates with encoded goal=Weight%20Loss');

    // Test 2: Interactive Program Selector
    const ptProgTab = window.document.querySelector('.prog-tab[data-tab="pt"]');
    const dietProgTab = window.document.querySelector('.prog-tab[data-tab="diet"]');
    const regProgTab = window.document.querySelector('.prog-tab[data-tab="regular"]');
    const selTitle = window.document.getElementById('prog-sel-title');
    const selPrice = window.document.getElementById('prog-sel-price');

    assert(!!ptProgTab && !!dietProgTab && !!regProgTab, 'Program selector has all 3 tab buttons');

    // Click PT tab
    ptProgTab.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
    assert(selTitle.textContent === 'PERSONAL TRAINING.', 'Clicking PT tab updates title to PERSONAL TRAINING.');
    assert(selPrice.textContent === 'From ₹6,000', 'Clicking PT tab updates price to From ₹6,000');

    // Click Diet tab
    dietProgTab.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
    assert(selTitle.textContent === 'CUSTOM DIET PLAN.', 'Clicking Diet tab updates title to CUSTOM DIET PLAN.');
    assert(selPrice.textContent === 'Add-On ₹800', 'Clicking Diet tab updates price to Add-On ₹800');

    // Click Regular tab
    regProgTab.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
    assert(selTitle.textContent === 'REGULAR TRAINING.', 'Clicking Regular tab updates title to REGULAR TRAINING.');
    assert(selPrice.textContent === 'From ₹1,500', 'Clicking Regular tab updates price to From ₹1,500');
  }

  // --- SECTION 4: LIVE DOM TESTING — CONTACT PAGE FORM & WHATSAPP GENERATION ---
  console.log('\n--- SECTION 4: CONTACT PAGE FORM & SUBMISSION FLOW ---');
  {
    // Test URL param pre-selection (?plan=3+Months)
    const testUrl = `${BASE_URL}/contact?plan=3+Months+Regular`;
    const contactRes = await fetchLive('/contact?plan=3+Months+Regular');
    const dom = new JSDOM(contactRes.text, {
      url: testUrl,
      runScripts: 'dangerously'
    });
    const { window } = dom;

    // Check pre-selection from inline script
    const interestSelect = window.document.getElementById('c-interest');
    assert(!!interestSelect, 'contact.html has #c-interest dropdown');
    assert(interestSelect.value.includes('3 Months'), `URL param ?plan=3+Months auto-selects 3 Months option (Selected: "${interestSelect.value}")`);

    // Test form submission validation: consent checkbox
    const form = window.document.getElementById('contact-form');
    const consent = window.document.getElementById('c-consent');
    const nameInput = window.document.getElementById('c-name');
    const phoneInput = window.document.getElementById('c-phone');

    assert(!!form, 'contact.html has #contact-form');
    assert(!!consent, 'contact.html has #c-consent checkbox');

    // Mock alert and window.open
    let alertMsg = '';
    window.alert = (msg) => { alertMsg = msg; };
    let openedUrl = '';
    window.open = (url) => { openedUrl = url; };

    // Attempt submit without checking consent
    consent.checked = false;
    form.dispatchEvent(new window.Event('submit', { cancelable: true }));
    assert(alertMsg.includes('consent checkbox') || alertMsg.includes('Terms'), 'Submitting without consent triggers alert blocker');

    // Check consent and fill inputs
    consent.checked = true;
    nameInput.value = 'Vikram Shinde';
    phoneInput.value = '9860123456';
    form.dispatchEvent(new window.Event('submit', { cancelable: true }));

    // Verify WhatsApp direct URL was formed
    const directLink = window.document.getElementById('whatsapp-direct-link');
    assert(!!directLink && directLink.href.includes('wa.me'), 'Form submit generates WhatsApp redirect link');
    assert(directLink.href.includes('Vikram%20Shinde'), 'WhatsApp URL contains user full name');
    assert(directLink.href.includes('9860123456'), 'WhatsApp URL contains user phone number');
    assert(directLink.href.includes('3%20Months'), 'WhatsApp URL contains selected membership tier');
  }

  // --- SECTION 5: LIVE DOM TESTING — VISIT PAGE FREE TRIAL BOOKING ---
  console.log('\n--- SECTION 5: VISIT PAGE FREE TRIAL FORM & WHATSAPP GENERATION ---');
  {
    // Test URL param pre-selection (?goal=Muscle+Gain&plan=6+Months)
    const testUrl = `${BASE_URL}/visit?goal=Muscle+Gain&plan=6+Months+Personal+Training`;
    const visitRes = await fetchLive('/visit?goal=Muscle+Gain&plan=6+Months+Personal+Training');
    const dom = new JSDOM(visitRes.text, {
      url: testUrl,
      runScripts: 'dangerously'
    });
    const { window } = dom;
    window.scrollTo = () => {};

    window.eval(interactionJs);
    window.document.dispatchEvent(new window.Event('DOMContentLoaded'));

    const goalSelect = window.document.getElementById('v-goal');
    const planSelect = window.document.getElementById('v-plan');
    const sessionSelect = window.document.getElementById('v-session');
    const nameInput = window.document.getElementById('v-name');
    const phoneInput = window.document.getElementById('v-phone');
    const consent = window.document.getElementById('v-consent');
    const form = window.document.getElementById('book-trial');

    assert(!!goalSelect, 'visit.html has #v-goal dropdown');
    assert(!!planSelect, 'visit.html has #v-plan dropdown');
    assert(!!sessionSelect, 'visit.html has #v-session dropdown');

    assert(goalSelect.value === 'Muscle Gain', `Goal pre-selected to Muscle Gain (Got: "${goalSelect.value}")`);
    assert(planSelect.value.includes('Personal Training') && planSelect.value.includes('6 Months'), `Plan pre-selected to 6 Months PT (Got: "${planSelect.value}")`);

    // Mock alert and window.open
    let alertMsg = '';
    window.alert = (msg) => { alertMsg = msg; };
    let openedUrl = '';
    window.open = (url) => { openedUrl = url; };

    // Fill valid inputs and submit
    consent.checked = true;
    nameInput.value = 'Amit Kadam';
    phoneInput.value = '9822998877';

    form.dispatchEvent(new window.Event('submit', { cancelable: true }));

    // Verify celebratory card appeared
    const successBox = window.document.querySelector('.trial-success-box');
    assert(!!successBox, 'Form submission renders .trial-success-box');
    assert(successBox.textContent.includes('Amit Kadam'), 'Success box displays user name');
    assert(successBox.textContent.includes('Muscle Gain'), 'Success box displays user goal');
    assert(successBox.textContent.includes('Personal Training') && successBox.textContent.includes('6 Months'), 'Success box displays user selected plan');

    const waBtn = successBox.querySelector('.whatsapp-action-btn');
    assert(!!waBtn && waBtn.href.includes('wa.me'), 'WhatsApp action button generated in success box');
    assert(waBtn.href.includes('Amit%20Kadam'), 'WhatsApp payload contains user name');
    assert(waBtn.href.includes('Muscle%20Gain'), 'WhatsApp payload contains primary goal');
    assert(waBtn.href.includes('6%20Months') || waBtn.href.includes('Personal%20Training'), 'WhatsApp payload contains chosen plan');
  }

  // --- SECTION 6: REVIEWS PAGE AUDIT ---
  console.log('\n--- SECTION 6: REVIEWS PAGE COMPONENT AUDIT ---');
  {
    const reviewsRes = await fetchLive('/reviews');
    const dom = new JSDOM(reviewsRes.text);
    const { document } = dom.window;

    const ratingVal = document.querySelector('.reviews-breakdown-score, .big-rating-number');
    assert(ratingVal && ratingVal.textContent.includes('4.4'), 'Reviews page displays 4.4 overall rating score');

    const reviewCards = document.querySelectorAll('.review-card, .review-full-card');
    assert(reviewCards.length === 6, `Reviews page displays exactly 6 verified review cards (Found: ${reviewCards.length})`);

    const stars = document.querySelectorAll('.review-stars, .stars-gold');
    assert(stars.length >= 6, 'Review cards contain gold star rating displays');
  }

  // --- SECTION 7: PERSONAL TRAINING PAGE AUDIT ---
  console.log('\n--- SECTION 7: PERSONAL TRAINING PAGE AUDIT ---');
  {
    const ptRes = await fetchLive('/personal-training');
    const dom = new JSDOM(ptRes.text);
    const { document } = dom.window;

    const cards = document.querySelectorAll('.price-card');
    assert(cards.length === 4, `PT page contains 4 duration pricing cards (Found: ${cards.length})`);

    const expSection = document.querySelector('.training-experience-section, .comparison-section, #compare-training');
    assert(!!expSection, 'PT page contains Solo vs 1-on-1 comparison section');

    const dietAddon = document.querySelector('.diet-plan-addon-section, .diet-section, #diet-plan');
    assert(!!dietAddon, 'PT page contains Diet Plan Add-On section');
  }

  // --- SECTION 8: SEO, ROBOTS & SITEMAP VERIFICATION ---
  console.log('\n--- SECTION 8: SEO METADATA & SCHEMA VERIFICATION ---');
  {
    const sitemapRes = await fetchLive('/sitemap.xml');
    assert(sitemapRes.text.includes('<loc>http://localhost:3000/</loc>'), 'sitemap.xml contains homepage');
    assert(sitemapRes.text.includes('<loc>http://localhost:3000/programs</loc>'), 'sitemap.xml contains /programs');
    assert(sitemapRes.text.includes('<loc>http://localhost:3000/personal-training</loc>'), 'sitemap.xml contains /personal-training');
    assert(sitemapRes.text.includes('<loc>http://localhost:3000/visit</loc>'), 'sitemap.xml contains /visit');

    const robotsRes = await fetchLive('/robots.txt');
    assert(robotsRes.text.includes('User-agent: *'), 'robots.txt specifies wildcard user-agent');
    assert(robotsRes.text.includes('Disallow: /owner'), 'robots.txt disallows owner demo route');
    assert(robotsRes.text.includes('Sitemap:'), 'robots.txt declares sitemap location');

    const homeRes = await fetchLive('/');
    const dom = new JSDOM(homeRes.text);
    const { document } = dom.window;

    const geoRegion = document.querySelector('meta[name="geo.region"]');
    assert(geoRegion && geoRegion.content === 'IN-MH', 'Home page has meta geo.region = IN-MH');

    const geoPlace = document.querySelector('meta[name="geo.placename"]');
    assert(geoPlace && geoPlace.content.includes('Kolhapur'), 'Home page has meta geo.placename = Kolhapur');

    const schemaScript = document.querySelector('script[type="application/ld+json"]');
    assert(!!schemaScript, 'Home page has JSON-LD schema');
    const parsedSchema = JSON.parse(schemaScript.textContent);
    assert(parsedSchema.name === 'Power House Gym & Fitness Center', 'Schema name is Power House Gym & Fitness Center');
    assert(parsedSchema.aggregateRating.ratingValue === '4.4', 'Schema ratingValue is 4.4');
  }

  // --- SECTION 9: HOMEPAGE TEMPLATES & USER FEATURES AUDIT ---
  console.log('\n--- SECTION 9: HOMEPAGE TEMPLATES & 5 FEATURE SECTIONS AUDIT ---');
  {
    const homeRes = await fetchLive('/');
    const dom = new JSDOM(homeRes.text);
    const { document } = dom.window;

    // 1. Image 5: Comparison Matrix Section
    const compareSection = document.getElementById('compare-training');
    assert(!!compareSection, 'Home page has #compare-training section (Image 5)');
    const compTable = compareSection ? compareSection.querySelector('.comparison-table') : null;
    assert(!!compTable, '#compare-training contains .comparison-table');
    const compRows = compTable ? compTable.querySelectorAll('tbody tr') : [];
    assert(compRows.length === 13, `Comparison table has exactly 13 feature comparison rows (Found: ${compRows.length})`);
    const ptBadge = compTable ? compTable.querySelector('.badge-pt') : null;
    assert(ptBadge && ptBadge.textContent.includes('1-ON-1 DEDICATED'), 'Comparison table has "1-ON-1 DEDICATED" badge');

    // 2. Images 3 & 1: Custom Diet Plan & Nutrition Curriculum Section
    const dietSection = document.getElementById('diet-plan');
    assert(!!dietSection, 'Home page has #diet-plan section (Images 3 & 1)');
    const dietCardMain = dietSection ? dietSection.querySelector('.diet-card-main') : null;
    assert(!!dietCardMain, '#diet-plan contains .diet-card-main (Image 3)');
    const dietCoversList = dietCardMain ? dietCardMain.querySelectorAll('.diet-covers-item') : [];
    assert(dietCoversList.length === 4, `Diet plan covers list has 4 key modules (Found: ${dietCoversList.length})`);

    const nutritionCard = dietSection ? dietSection.querySelector('.nutrition-curriculum-card') : null;
    assert(!!nutritionCard, '#diet-plan contains .nutrition-curriculum-card (Image 1)');
    const nutritionPriceNum = nutritionCard ? nutritionCard.querySelector('.nutrition-price-num') : null;
    assert(nutritionPriceNum && nutritionPriceNum.textContent.includes('₹800'), 'Nutrition curriculum has ₹800 pricing display');
    const nutritionModules = nutritionCard ? nutritionCard.querySelectorAll('.nutrition-module-item') : [];
    assert(nutritionModules.length === 6, `Nutrition curriculum has 6 curriculum module cards (Found: ${nutritionModules.length})`);

    // 3. Images 2 & 4: Google Reviews & 6 Review Cards Grid Section
    const reviewsSection = document.getElementById('member-reviews');
    assert(!!reviewsSection, 'Home page has #member-reviews section (Image 2)');
    const ratingBreakdown = reviewsSection ? reviewsSection.querySelector('.rating-breakdown-card') : null;
    assert(!!ratingBreakdown, '#member-reviews contains .rating-breakdown-card');
    const bigRatingNum = ratingBreakdown ? ratingBreakdown.querySelector('.big-rating-number') : null;
    assert(bigRatingNum && bigRatingNum.textContent.includes('4.4'), 'Rating breakdown displays 4.4 rating score');
    const distBars = ratingBreakdown ? ratingBreakdown.querySelectorAll('.dist-bar-item') : [];
    assert(distBars.length === 5, `Rating distribution contains 5 rating bars (Found: ${distBars.length})`);

    const homeReviewCards = document.querySelectorAll('.reviews-grid .review-card');
    assert(homeReviewCards.length === 6, `Home page has exactly 6 verified Google review cards (Found: ${homeReviewCards.length}) (Image 4)`);

    // Check review authors
    const authorNames = Array.from(homeReviewCards).map(c => {
      const strong = c.querySelector('.reviewer-details strong');
      return strong ? strong.textContent.trim() : '';
    });
    assert(authorNames.includes('Rahul M.'), 'Reviewers list includes Rahul M.');
    assert(authorNames.includes('Priya S.'), 'Reviewers list includes Priya S.');
    assert(authorNames.includes('Amit K.'), 'Reviewers list includes Amit K.');
    assert(authorNames.includes('Sachin D.'), 'Reviewers list includes Sachin D.');
    assert(authorNames.includes('Vishal P.'), 'Reviewers list includes Vishal P.');
    assert(authorNames.includes('Ankita R.'), 'Reviewers list includes Ankita R.');
  }

  console.log('\n===============================================================');
  console.log(`🏁 LIVE TEST SUITE EXECUTION FINISHED`);
  console.log(`TOTAL TESTS: ${totalTests}`);
  console.log(`PASSED:      ${passedTests}`);
  console.log(`FAILED:      ${failedTests}`);
  console.log('===============================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  } else {
    console.log('🎉 100% OF LIVE USER INTERACTIONS & ENDPOINTS ARE HEALTHY!');
    process.exit(0);
  }
}

runLiveTests().catch(err => {
  console.error('Fatal error during live test execution:', err);
  process.exit(1);
});
