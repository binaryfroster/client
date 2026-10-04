import http from 'http';
import fs from 'fs';

const pages = [
  '/',
  '/about',
  '/programs',
  '/personal-training',
  '/contact',
  '/gallery',
  '/reviews',
  '/visit',
  '/privacy-policy',
  '/terms'
];

async function fetchUrl(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${urlPath}`, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
    }).on('error', reject);
  });
}

async function runVerification() {
  console.log('=== STARTING DEEP SITE VERIFICATION ===\n');
  let failures = 0;

  // 1. Verify assets
  const cssRes = await fetchUrl('/assets/gym-interactions.css');
  if (cssRes.status === 200 && cssRes.body.includes('trial-active-banner')) {
    console.log('✅ [PASS] /assets/gym-interactions.css served correctly (200)');
  } else {
    console.error('❌ [FAIL] /assets/gym-interactions.css failed, status:', cssRes.status);
    failures++;
  }

  const jsRes = await fetchUrl('/assets/gym-interactions.js');
  if (jsRes.status === 200 && jsRes.body.includes('initBookTrialIntegration')) {
    console.log('✅ [PASS] /assets/gym-interactions.js served correctly (200)');
  } else {
    console.error('❌ [FAIL] /assets/gym-interactions.js failed, status:', jsRes.status);
    failures++;
  }

  // 2. Verify /membership 301 redirect
  const redirRes = await fetchUrl('/membership');
  if (redirRes.status === 301 && redirRes.headers.location === '/contact') {
    console.log('✅ [PASS] /membership 301 redirects to /contact');
  } else {
    console.error('❌ [FAIL] /membership redirect failed, status:', redirRes.status, 'location:', redirRes.headers.location);
    failures++;
  }

  // 3. Verify all route pages
  for (const page of pages) {
    const res = await fetchUrl(page);
    if (res.status !== 200) {
      console.error(`❌ [FAIL] ${page}: Status ${res.status}`);
      failures++;
      continue;
    }

    const body = res.body;

    // Check no lovable badge
    if (body.includes('id="lovable-badge"')) {
      console.error(`❌ [FAIL] ${page}: Contains lovable-badge!`);
      failures++;
    }

    // Check no ~flock.js
    if (body.includes('~flock.js')) {
      console.error(`❌ [FAIL] ${page}: Contains ~flock.js!`);
      failures++;
    }

    // Check interaction assets linked
    if (!body.includes('gym-interactions.css') || !body.includes('gym-interactions.js')) {
      console.error(`❌ [FAIL] ${page}: Missing gym-interactions asset links!`);
      failures++;
    }

    // Check header has menu button & book trial CTA
    if (!body.includes('menu-button') || !body.includes('Book Free Trial')) {
      console.error(`❌ [FAIL] ${page}: Missing menu-button or Book Free Trial in header!`);
      failures++;
    }

    // Check footer has legal links
    if (!body.includes('/privacy-policy') || !body.includes('/terms')) {
      console.error(`❌ [FAIL] ${page}: Missing legal links in footer!`);
      failures++;
    }

    // Specific page checks
    if (page === '/visit') {
      if (!body.includes('id="book-trial"')) {
        console.error('❌ [FAIL] /visit: Missing id="book-trial" on form!');
        failures++;
      }
      if (!body.includes('Claim Your Free Trial Pass')) {
        console.error('❌ [FAIL] /visit: Missing polished "Claim Your Free Trial Pass" button text!');
        failures++;
      }
      if (!body.includes('id="v-consent"')) {
        console.error('❌ [FAIL] /visit: Missing legal confirmation checkbox id="v-consent"!');
        failures++;
      }
    }

    if (page === '/contact') {
      if (!body.includes('id="c-consent"')) {
        console.error('❌ [FAIL] /contact: Missing legal confirmation checkbox id="c-consent"!');
        failures++;
      }
    }

    console.log(`✅ [PASS] ${page} (200 OK, full QA passed)`);
  }

  console.log(`\n========================================`);
  if (failures === 0) {
    console.log(`🎉 ALL TESTS PASSED (0 failures)! Site is 100% verified.`);
  } else {
    console.error(`⚠️ ${failures} test(s) failed.`);
    process.exit(1);
  }
}

runVerification().catch(err => {
  console.error('Fatal error during verification:', err);
  process.exit(1);
});
