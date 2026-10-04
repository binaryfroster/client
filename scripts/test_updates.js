import http from 'http';

const tests = [
  { url: 'http://localhost:3000/contact', expectedStatus: 200, checkContent: ['DIRECT ACCESS', 'id="c-consent"', 'Terms of Service'] },
  { url: 'http://localhost:3000/privacy-policy', expectedStatus: 200, checkContent: ['PRIVACY POLICY', 'DPDP Act', 'Data Fiduciary'] },
  { url: 'http://localhost:3000/terms', expectedStatus: 200, checkContent: ['TERMS OF SERVICE', 'Health Representation', 'Assumption of Risk'] },
  { url: 'http://localhost:3000/membership', expectedStatus: 301, checkLocation: '/contact' },
  { url: 'http://localhost:3000/visit', expectedStatus: 200, checkContent: ['id="v-consent"', 'Privacy Policy'] },
  { url: 'http://localhost:3000/', expectedStatus: 200, checkContent: ['href="/contact"', 'Privacy Policy'] }
];

let completed = 0;
let failed = 0;

tests.forEach(test => {
  const req = http.get(test.url, res => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      let passed = true;
      if (res.statusCode !== test.expectedStatus) {
        console.error(`❌ [FAIL] ${test.url}: Expected status ${test.expectedStatus}, got ${res.statusCode}`);
        passed = false;
      }
      if (test.checkLocation && res.headers.location !== test.checkLocation) {
        console.error(`❌ [FAIL] ${test.url}: Expected location ${test.checkLocation}, got ${res.headers.location}`);
        passed = false;
      }
      if (test.checkContent) {
        test.checkContent.forEach(str => {
          if (!body.includes(str)) {
            console.error(`❌ [FAIL] ${test.url}: Missing expected content "${str}"`);
            passed = false;
          }
        });
      }
      if (passed) {
        console.log(`✅ [PASS] ${test.url} (${res.statusCode})`);
      } else {
        failed++;
      }
      completed++;
      if (completed === tests.length) {
        console.log(`\nVerification complete: ${tests.length - failed}/${tests.length} tests passed.`);
        process.exit(failed > 0 ? 1 : 0);
      }
    });
  });
  req.on('error', err => {
    console.error(`❌ [ERROR] ${test.url}:`, err.message);
    failed++;
    completed++;
    if (completed === tests.length) {
      process.exit(1);
    }
  });
});
