import fs from 'fs';

let content = fs.readFileSync('visit.html', 'utf8');

// 1. Replace /membership in header navigation
content = content.replace(
  '<a href="/membership">Membership</a>',
  '<a href="/contact">Contact</a>'
);

// 2. Replace /membership in footer navigation
content = content.replace(
  '<a href="/membership">Membership</a>',
  '<a href="/contact">Contact Us</a>'
);

// 3. Add legal links to footer bottom if not present
if (!content.includes('/privacy-policy')) {
  content = content.replace(
    /<span>c 2026 Power House Gym &amp; Fitness Center[^<]*<\/span>/,
    `<span>© 2026 Power House Gym &amp; Fitness Center · Shahupuri, Kolhapur</span>
          <div class="footer-legal-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms">Terms of Service &amp; Gym Rules</a>
          </div>`
  );
}

// 4. Add confirmation & legal checkbox to trial form in visit.html
const checkboxHtml = `
<label class="checkbox-field" for="v-consent">
  <input type="checkbox" id="v-consent" name="consent" required />
  <span>
    I confirm that the details provided are accurate and consent to Power House Gym contacting me via WhatsApp, phone, or email. I have read and agree to the <a href="/terms" target="_blank">Terms of Service &amp; Gym Rules</a> and <a href="/privacy-policy" target="_blank">Privacy Policy</a>.
  </span>
</label>
`;

if (!content.includes('id="v-consent"')) {
  content = content.replace(
    '</label><button class="inline-flex',
    `</label>${checkboxHtml}<button class="inline-flex`
  );
}

// 5. Add script to handle form submission with WhatsApp redirect and consent validation
const scriptHook = `
<script>
  document.querySelector('.trial-form')?.addEventListener('submit', function(e) {
    const consent = document.getElementById('v-consent');
    if (!consent || !consent.checked) {
      e.preventDefault();
      alert('Please check the confirmation box agreeing to the Terms of Service & Privacy Policy.');
      return false;
    }
  });
</script>
</body>
`;

content = content.replace('</body>', scriptHook);

fs.writeFileSync('visit.html', content);
console.log('visit.html updated with legal checkbox and navigation changes.');
