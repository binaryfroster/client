import http from 'http';

async function fetchUrl(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${urlPath}`, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body }));
    }).on('error', reject);
  });
}

async function verifyFeatures() {
  console.log('=== VERIFYING NEW USER FEATURES ===\n');
  let failures = 0;

  // 1. Verify reviews.html
  const reviews = await fetchUrl('/reviews');
  const reviewChecks = [
    'Google Business Profile',
    '4.4',
    'Rating Distribution',
    'Rahul M.',
    'Priya S.',
    'Amit K.',
    'Sneha D.',
    'Vishal P.',
    'Ankita R.',
    'via Google ✓',
    'RM', 'PS', 'AK', 'SD', 'VP', 'AR',
    'floating-wa-btn'
  ];
  reviewChecks.forEach(term => {
    if (!reviews.body.includes(term)) {
      console.error(`❌ [FAIL] reviews.html missing term: "${term}"`);
      failures++;
    }
  });
  if (failures === 0) {
    console.log('✅ [PASS] reviews.html: All Google rating breakdown and 6 review cards verified!');
  }

  // 2. Verify programs.html
  const programs = await fetchUrl('/programs');
  const programChecks = [
    'Regular vs <span class="highlight">Personal Training</span>',
    '1-ON-1 DEDICATED',
    'View Regular Plans',
    'View PT Plans',
    'Custom <span class="highlight">Diet Plan</span> Add-On',
    'Add-On Only ₹800',
    'Kolhapuri &amp; Indian Meals',
    'floating-wa-btn'
  ];
  programChecks.forEach(term => {
    if (!programs.body.includes(term)) {
      console.error(`❌ [FAIL] programs.html missing term: "${term}"`);
      failures++;
    }
  });
  if (failures === 0) {
    console.log('✅ [PASS] programs.html: Comparison Matrix & Diet Plan Add-On verified!');
  }

  // 3. Verify personal-training.html
  const pt = await fetchUrl('/personal-training');
  const ptChecks = [
    'Regular vs <span class="highlight">Personal Training</span>',
    'Custom <span class="highlight">Diet Plan</span> Add-On',
    'floating-wa-btn'
  ];
  ptChecks.forEach(term => {
    if (!pt.body.includes(term)) {
      console.error(`❌ [FAIL] personal-training.html missing term: "${term}"`);
      failures++;
    }
  });
  if (failures === 0) {
    console.log('✅ [PASS] personal-training.html: Comparison Matrix & Diet Plan Add-On verified!');
  }

  console.log('\n==================================');
  if (failures === 0) {
    console.log('🎉 ALL FEATURE CHECKS PASSED WITH 0 FAILURES!');
  } else {
    console.error(`⚠️ ${failures} check(s) failed.`);
    process.exit(1);
  }
}

verifyFeatures().catch(err => {
  console.error('Error during feature verification:', err);
  process.exit(1);
});
