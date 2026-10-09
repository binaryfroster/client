/**
 * Power House Gym Kolhapur - GDPR & DPDPA 2023 Compliant Cookie Consent Banner
 * Self-contained, accessible, zero-dependency vanilla JS.
 */
(function() {
  const STORAGE_KEY = 'phg_cookie_consent_v1';

  function getConsent() {
    try {
      const val = localStorage.getItem(STORAGE_KEY);
      return val ? JSON.parse(val) : null;
    } catch (e) {
      return null;
    }
  }

  function setConsent(consent) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
      window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: consent }));
    } catch (e) {}
  }

  function createBanner() {
    if (document.getElementById('cookie-consent-banner')) return;

    const banner = document.createElement('aside');
    banner.id = 'cookie-consent-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Cookie Consent Notice');
    banner.innerHTML = `
      <div class="cookie-content">
        <div class="cookie-text">
          <p><strong>Cookie &amp; Privacy Notice:</strong> We use essential cookies to maintain site security and deliver optimal performance. Optional analytics help us understand member interest in accordance with our <a href="/cookie-policy">Cookie Policy</a> and <a href="/privacy-policy">Privacy Policy</a>.</p>
        </div>
        <div class="cookie-actions">
          <button type="button" id="cookie-btn-decline" class="cookie-btn cookie-btn-decline" aria-label="Decline non-essential cookies">Essential Only</button>
          <button type="button" id="cookie-btn-accept" class="cookie-btn cookie-btn-accept" aria-label="Accept all cookies">Accept All</button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    const acceptBtn = document.getElementById('cookie-btn-accept');
    const declineBtn = document.getElementById('cookie-btn-decline');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function() {
        setConsent({ necessary: true, analytics: true, marketing: false, timestamp: new Date().toISOString() });
        banner.style.display = 'none';
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', function() {
        setConsent({ necessary: true, analytics: false, marketing: false, timestamp: new Date().toISOString() });
        banner.style.display = 'none';
      });
    }
  }

  // Global helper for footer links: window.openCookiePreferences()
  window.openCookiePreferences = function() {
    let banner = document.getElementById('cookie-consent-banner');
    if (!banner) {
      createBanner();
      banner = document.getElementById('cookie-consent-banner');
    }
    if (banner) {
      banner.style.display = 'block';
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      if (!getConsent()) {
        createBanner();
      }
    });
  } else {
    if (!getConsent()) {
      createBanner();
    }
  }
})();
