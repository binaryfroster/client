import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

function fetchUrl(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

async function runVerification() {
  console.log('=== STARTING VERIFICATION FOR 2 NEW IMAGE-SPECIFIED FEATURES ===\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      failed++;
    }
  }

  // 1. Check CSS file on disk
  const cssPath = path.join(projectRoot, 'assets', 'gym-features.css');
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  assert(cssContent.includes('.training-experience-section'), 'CSS contains .training-experience-section');
  assert(cssContent.includes('.exp-badge.risk-badge'), 'CSS contains .exp-badge.risk-badge');
  assert(cssContent.includes('.exp-badge.results-badge'), 'CSS contains .exp-badge.results-badge');
  assert(cssContent.includes('.enhanced-map-card'), 'CSS contains .enhanced-map-card');
  assert(cssContent.includes('.map-floating-info-card'), 'CSS contains .map-floating-info-card');
  assert(cssContent.includes('.btn-map-directions'), 'CSS contains .btn-map-directions');

  // 2. Fetch and check personal-training.html
  try {
    const ptRes = await fetchUrl('/personal-training');
    assert(ptRes.status === 200, 'GET /personal-training returned 200');
    assert(ptRes.body.includes('The Difference Between Simply Sweating and'), 'PT page contains Image 1 heading part 1');
    assert(ptRes.body.includes('Truly Progressing'), 'PT page contains Image 1 highlighted heading part 2');
    assert(ptRes.body.includes('Solo / Generic Gym Membership'), 'PT page contains Solo/Generic card');
    assert(ptRes.body.includes('Higher Risk'), 'PT page contains Higher Risk badge');
    assert(ptRes.body.includes('Power House 1-on-1 Coaching'), 'PT page contains 1-on-1 Coaching card');
    assert(ptRes.body.includes('Maximum Results'), 'PT page contains Maximum Results badge');
    assert(ptRes.body.includes('100%') && ptRes.body.includes('Zero'), 'PT page contains 100% and Zero stat callouts');
    assert(ptRes.body.includes('Copying random workout clips without knowing biomechanics'), 'PT page contains bullet: Copying random workout clips');
    assert(ptRes.body.includes('Certified coach standing right with you through every movement'), 'PT page contains bullet: Certified coach standing right with you');
  } catch (err) {
    console.error('Error fetching /personal-training:', err.message);
    failed++;
  }

  // 3. Fetch and check contact.html
  try {
    const contactRes = await fetchUrl('/contact');
    assert(contactRes.status === 200, 'GET /contact returned 200');
    assert(contactRes.body.includes('enhanced-map-section'), 'Contact page contains enhanced-map-section');
    assert(contactRes.body.includes('map-floating-info-card'), 'Contact page contains map-floating-info-card');
    assert(contactRes.body.includes('Power House Gym And Fitness Center'), 'Contact page map card has Gym name');
    assert(contactRes.body.includes('4.4'), 'Contact page map card has 4.4 rating');
    assert(contactRes.body.includes('Vardhmane House, 718, 3rd Ln'), 'Contact page map card has Vardhmane House address');
    assert(contactRes.body.includes('Directions'), 'Contact page map card has Directions CTA');
  } catch (err) {
    console.error('Error fetching /contact:', err.message);
    failed++;
  }

  // 4. Fetch and check visit.html
  try {
    const visitRes = await fetchUrl('/visit');
    assert(visitRes.status === 200, 'GET /visit returned 200');
    assert(visitRes.body.includes('enhanced-map-card'), 'Visit page contains enhanced-map-card');
    assert(visitRes.body.includes('map-floating-info-card'), 'Visit page contains map-floating-info-card');
    assert(visitRes.body.includes('Power House Gym And Fitness Center'), 'Visit page map card has Gym name');
    assert(visitRes.body.includes('4.4'), 'Visit page map card has 4.4 rating');
  } catch (err) {
    console.error('Error fetching /visit:', err.message);
    failed++;
  }

  // 5. Fetch and check programs.html
  try {
    const progRes = await fetchUrl('/programs');
    assert(progRes.status === 200, 'GET /programs returned 200');
    assert(progRes.body.includes('The Difference Between Simply Sweating and'), 'Programs page contains Experience Comparison heading');
    assert(progRes.body.includes('Higher Risk'), 'Programs page contains Higher Risk badge');
    assert(progRes.body.includes('Maximum Results'), 'Programs page contains Maximum Results badge');
  } catch (err) {
    console.error('Error fetching /programs:', err.message);
    failed++;
  }

  console.log(`\n=== RESULTS: ${passed} PASSED, ${failed} FAILED ===\n`);
  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runVerification();
