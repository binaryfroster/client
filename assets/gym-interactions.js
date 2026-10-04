(function(){try{document.documentElement.classList.remove('ph-intro-active');sessionStorage.setItem('ph-intro','seen');}catch(e){}})();
/**
 * ==========================================================================
 * POWER HOUSE GYM - CORE INTERACTION & EXPERIENCE CONTROLLER
 * Engineered for 60fps micro-interactions, responsive navigation, and trial booking
 * ==========================================================================
 */

(function () {
  'use strict';

  // --- Constants & Data ---
  const GYM_PHONE = '+919860252720';
  const GYM_WA_BASE = 'https://wa.me/919860252720';

  const GOALS_DATA = {
    'Weight Loss': {
      need: 'consistent movement and accountability',
      recommendation: 'Individual, closely guided training with structure and accountability',
      trainingType: 'Personal Training',
      plan: '3 Months Personal Training · ₹15,000',
      reason: 'Closer structure and accountability can help you stay consistent toward a specific goal.'
    },
    'Muscle Gain': {
      need: 'progressive, structured training',
      recommendation: 'Individual, closely guided training with progressive overload focus',
      trainingType: 'Personal Training',
      plan: '3 Months Personal Training · ₹15,000',
      reason: 'Individual guidance can add focused structure to exercise selection and progression.'
    },
    'Strength': {
      need: 'consistent strength practice',
      recommendation: 'Guided strength routine with barbell and plate-loaded focus',
      trainingType: 'Regular Training',
      plan: '6 Months Regular Training · ₹6,000',
      reason: 'A fully equipped gym environment supports consistent strength work; PT adds closer guidance if preferred.'
    },
    'Stamina / Endurance': {
      need: 'regular conditioning and circuit movement',
      recommendation: 'Cardio station progression with high-density training blocks',
      trainingType: 'Regular Training',
      plan: '3 Months Regular Training · ₹4,000',
      reason: 'A consistent gym routine offers a practical foundation for improving endurance.'
    },
    'General Fitness': {
      need: 'a sustainable, injury-free training routine',
      recommendation: 'Balanced full-body splits with owner-guided form checks',
      trainingType: 'Regular Training',
      plan: '1 Year Regular Training · ₹9,000',
      reason: 'A flexible membership gives you a strong environment for a consistent routine.'
    },
    'Energy / Active Lifestyle': {
      need: 'regular movement and daily habit building',
      recommendation: 'Consistent morning or evening training schedule',
      trainingType: 'Regular Training',
      plan: '1 Month Regular Training · ₹1,500',
      reason: 'A consistent schedule can help make activity part of everyday life.'
    }
  };

  // --- Helper: Clean Badges ---
  function removeLovableBadges() {
    const badge = document.getElementById('lovable-badge');
    if (badge) badge.remove();
  }

  // --- 1. Sticky Header Scroll Effect ---
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 15) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- 2. Mobile Navigation Drawer ---
  function initMobileDrawer() {
    let drawer = document.querySelector('.mobile-drawer');

    // Create drawer if not in markup
    if (!drawer) {
      drawer = document.createElement('div');
      drawer.className = 'mobile-drawer';
      drawer.setAttribute('aria-hidden', 'true');
      drawer.innerHTML = `
        <nav class="mobile-drawer-nav" aria-label="Mobile Navigation" role="dialog" aria-modal="true">
          <div class="mobile-drawer-header">
            <a href="/" class="mobile-drawer-brand">
              <img src="/__l5e/assets-v1/2af281ae-a2d9-4174-95da-3e39cee943d5/power-house-logo.png" alt="Power House" width="32" height="32" />
              <span>POWER HOUSE</span>
            </a>
            <button class="mobile-drawer-close" aria-label="Close navigation">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
          <div class="mobile-drawer-links">
            <a href="/">Home <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></a>
            <a href="/about">About <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></a>
            <div class="mobile-drawer-group">
              <a href="/programs" class="mobile-drawer-main-link">
                Programs &amp; Membership
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </a>
              <div class="mobile-sublinks">
                <a href="/programs#regular-training" class="mobile-sublink">↳ Regular Gym Membership</a>
                <a href="/personal-training" class="mobile-sublink">↳ Personal Training (1-on-1)</a>
                <a href="/programs#diet-plan" class="mobile-sublink">↳ Diet &amp; Nutrition Plan</a>
                <a href="/programs#plan-finder" class="mobile-sublink highlight">↳ Plan Finder (Goal &amp; Price)</a>
              </div>
            </div>
            <a href="/personal-training">Personal Training <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></a>
            <a href="/contact">Contact <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></a>
            <a href="/gallery">Gallery <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></a>
            <a href="/reviews">Reviews <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></a>
            <a href="/visit">Visit &amp; Hours <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></a>
          </div>
          <div class="mobile-drawer-footer">
            <a href="/visit?trial=1#book-trial" class="mobile-drawer-cta">
              Book Free Trial ↗
            </a>
            <div class="mobile-drawer-legal">
              <a href="/privacy-policy">Privacy Policy</a>
              <span>·</span>
              <a href="/terms">Terms &amp; Rules</a>
            </div>
          </div>
        </nav>
      `;
      document.body.appendChild(drawer);
    }

    // Set active link in drawer
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    drawer.querySelectorAll('.mobile-drawer-links a').forEach(link => {
      const linkPath = (link.getAttribute('href') || '').replace(/\/$/, '') || '/';
      if (linkPath === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    const openDrawer = () => {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const menuBtns = document.querySelectorAll('.menu-button');
      menuBtns.forEach(btn => btn.setAttribute('aria-expanded', 'true'));
    };

    const closeDrawer = () => {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      const menuBtns = document.querySelectorAll('.menu-button');
      menuBtns.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
    };

    // Attach to all menu buttons in header
    document.querySelectorAll('.menu-button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openDrawer();
      });
    });

    // Close button & backdrop click
    const closeBtn = drawer.querySelector('.mobile-drawer-close');
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) closeDrawer();
    });

    // Close when clicking nav links
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        setTimeout(closeDrawer, 150);
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeDrawer();
      }
    });
  }

  // --- 3. Book Trial Full Integration & Trial Form ---
  function initBookTrialIntegration() {
    const isVisitPage = window.location.pathname.startsWith('/visit');

    // Smooth scroll for all trial links on the current page
    document.querySelectorAll('a[href*="trial"], .nav-cta').forEach(a => {
      const href = a.getAttribute('href') || '';
      
      // Normalize href across site to clean format
      if (href.includes('trial=%221%22') || href.includes('trial=1') || href.includes('trial')) {
        if (!href.startsWith('http')) {
          a.setAttribute('href', '/visit?trial=1#book-trial');
        }
      }

      // If user is already on the visit page, handle smooth scroll directly
      if (isVisitPage) {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          scrollToTrialForm();
        });
      }
    });

    // Handle visit page specific trial workflow
    if (isVisitPage) {
      handleVisitPageTrialForm();
    }
  }

  function scrollToTrialForm() {
    const target = document.getElementById('book-trial') || document.querySelector('.trial-form');
    if (!target) return;

    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });

    // Highlight the card
    target.classList.remove('trial-form-highlight');
    void target.offsetWidth; // trigger reflow
    target.classList.add('trial-form-highlight');

    // Focus first input
    const firstInput = target.querySelector('input[name="name"]');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 400);
    }
  }

  function handleVisitPageTrialForm() {
    const form = document.querySelector('.trial-form');
    if (!form) return;

    // Ensure form container has ID
    form.id = 'book-trial';

    // Parse URL params
    const urlParams = new URLSearchParams(window.location.search);
    const hasTrialParam = urlParams.has('trial') || window.location.hash === '#book-trial';
    const goalParam = urlParams.get('goal');
    const planParam = urlParams.get('plan');

    // Pre-fill goal dropdown if provided in URL
    if (goalParam) {
      const goalSelect = form.querySelector('select[name="goal"]') || form.querySelector('select');
      if (goalSelect) {
        for (let opt of goalSelect.options) {
          if (opt.text.toLowerCase().includes(goalParam.toLowerCase()) || opt.value.toLowerCase().includes(goalParam.toLowerCase())) {
            opt.selected = true;
            break;
          }
        }
      }
    }

    // Pre-fill plan dropdown if plan param given
    if (planParam) {
      const planSelect = form.querySelector('select[name="plan"]');
      if (planSelect) {
        for (let opt of planSelect.options) {
          if (opt.text.toLowerCase().includes(planParam.toLowerCase()) || opt.value.toLowerCase().includes(planParam.toLowerCase())) {
            opt.selected = true;
            break;
          }
        }
      }
      const noteField = form.querySelector('textarea');
      if (noteField && !noteField.value) {
        noteField.value = `Interested in ${planParam} plan.`;
      }
    }

    // Insert prominent "1-Day Free Trial Pass Activated" banner above form
    let banner = document.getElementById('trial-active-badge');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'trial-active-badge';
      banner.className = 'trial-active-banner';
      banner.innerHTML = `
        <span class="badge-icon">⚡</span>
        <div>
          <strong>1-Day Free Gym Pass Activated</strong>
          <p>Full strength &amp; cardio floor access with direct personal guidance from Coach Ameer Mullani. No upfront payment required.</p>
        </div>
      `;
      form.parentNode.insertBefore(banner, form);
    }

    // Polish submit button text (replace demo booking)
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.innerHTML = `Claim Your Free Trial Pass <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;
    }

    // If navigated with trial param or hash, auto-scroll to form
    if (hasTrialParam) {
      setTimeout(() => {
        scrollToTrialForm();
      }, 250);
    }

    // Enhanced Form Submission Flow
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const consent = document.getElementById('v-consent') || form.querySelector('input[name="consent"]');
      if (!consent || !consent.checked) {
        alert('Please confirm that you agree to the Terms of Service & Privacy Policy.');
        consent?.focus();
        return;
      }

      const nameInput = form.querySelector('input[name="name"]');
      const phoneInput = form.querySelector('input[name="phone"]');
      const goalSelect = form.querySelector('select[name="goal"]') || form.querySelectorAll('select')[0];
      const planSelect = form.querySelector('select[name="plan"]');
      const sessionSelect = form.querySelector('select[name="session"]') || form.querySelectorAll('select')[1];
      const noteInput = form.querySelector('textarea');

      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const goal = goalSelect ? goalSelect.value : (goalParam || 'General Fitness');
      const plan = planSelect ? planSelect.value : (planParam || '1-Day Free Trial Session');
      const session = sessionSelect ? sessionSelect.value : 'Morning';
      const note = noteInput ? noteInput.value.trim() : '';

      if (!name || !phone) {
        alert('Please provide your name and contact phone number.');
        return;
      }

      // Construct clean WhatsApp booking message
      const text = encodeURIComponent(
        `Hello Coach Ameer (Power House Gym),\n\nI would like to book my session / trial pass!\n\n` +
        `• Name: ${name}\n` +
        `• Phone: ${phone}\n` +
        `• Primary Goal: ${goal}\n` +
        `• Selected Plan / Interest: ${plan}\n` +
        `• Preferred Slot: ${session}\n` +
        `• Notes: ${note || 'None'}\n\n` +
        `I have agreed to the gym rules & policies. Looking forward to visiting Power House Gym in Shahupuri, Kolhapur!`
      );
      const waUrl = `${GYM_WA_BASE}?text=${text}`;

      // Render celebratory success card
      const formContainer = form.parentNode;
      form.style.display = 'none';
      if (banner) banner.style.display = 'none';

      const successBox = document.createElement('div');
      successBox.className = 'trial-success-box';
      successBox.innerHTML = `
        <div class="success-icon">✓</div>
        <h3>Free Trial Pass Confirmed!</h3>
        <p>Thank you, <strong>${name}</strong>! Your request for Power House Gym has been initialized.</p>
        <div class="trial-summary-badge">
          Plan: <strong>${plan}</strong><br/>
          Goal: <strong>${goal}</strong> &nbsp;·&nbsp; Preferred Slot: <strong>${session}</strong>
        </div>
        <p>Opening WhatsApp now to confirm your visit time directly with Ameer Mullani...</p>
        <a href="${waUrl}" target="_blank" class="whatsapp-action-btn">
          Open WhatsApp Directly
        </a>
      `;
      formContainer.appendChild(successBox);

      // Auto launch WhatsApp
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 700);
    });
  }

  // --- 4. Interactive Goal Selector (Home Page) ---
  function initGoalSelector() {
    const goalsSection = document.querySelector('.goals-section');
    if (!goalsSection) return;

    const goalButtons = goalsSection.querySelectorAll('.goal-option');
    const goalDetail = goalsSection.querySelector('.goal-detail');
    if (!goalButtons.length || !goalDetail) return;

    goalButtons.forEach((btn, index) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();

        // Update active tab button
        goalButtons.forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');

        // Extract goal name
        const goalNameEl = btn.querySelector('.goal-name');
        const goalName = goalNameEl ? goalNameEl.textContent.trim() : Object.keys(GOALS_DATA)[index];
        const data = GOALS_DATA[goalName] || GOALS_DATA['Weight Loss'];

        // Update detail card
        const titleEl = goalDetail.querySelector('h3');
        if (titleEl) titleEl.textContent = goalName;

        const rows = goalDetail.querySelectorAll('.goal-detail-rows > div');
        if (rows.length >= 5) {
          const needP = rows[0].querySelector('p');
          const recP = rows[1].querySelector('p');
          const typeP = rows[2].querySelector('p');
          const planP = rows[3].querySelector('p');
          const whyP = rows[4].querySelector('p');

          if (needP) needP.textContent = data.need;
          if (recP) recP.textContent = data.recommendation;
          if (typeP) typeP.textContent = data.trainingType;
          if (planP) planP.textContent = data.plan;
          if (whyP) whyP.textContent = data.reason;
        }

        // Update CTA link
        const ctaLink = goalDetail.querySelector('a');
        if (ctaLink) {
          ctaLink.href = `/visit?goal=${encodeURIComponent(goalName)}&trial=1#book-trial`;
          ctaLink.innerHTML = `Continue With ${goalName} <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;
        }
      });
    });
  }

  // --- 5. Gallery Filter & Lightbox (Gallery Page) ---
  function initGallery() {
    const filterContainer = document.querySelector('.gallery-filter');
    const galleryItems = document.querySelectorAll('.spatial-gallery > button');
    if (!galleryItems.length) return;

    // Filter Buttons logic
    if (filterContainer) {
      const filterBtns = filterContainer.querySelectorAll('button');
      filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const filter = btn.textContent.trim();

          // Update active button classes
          filterBtns.forEach(b => {
            b.className = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[3px] text-xs uppercase font-extrabold cursor-pointer transition-all duration-200 border border-input bg-transparent text-foreground hover:border-primary hover:text-primary h-11 px-5';
          });
          btn.className = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[3px] text-xs uppercase font-extrabold cursor-pointer transition-all duration-200 bg-primary text-primary-foreground border border-primary shadow-[0_5px_0_color-mix(in_srgb,var(--primary)_38%,transparent)] hover:bg-accent h-11 px-5';

          // Filter images
          galleryItems.forEach(item => {
            const span = item.querySelector('span');
            const category = span ? span.textContent.trim() : '';

            if (filter === 'All' || category.toLowerCase() === filter.toLowerCase()) {
              item.style.display = 'block';
              item.style.opacity = '1';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
    }

    // Lightbox modal setup
    let modal = document.querySelector('.gallery-modal-overlay');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'gallery-modal-overlay';
      modal.innerHTML = `
        <div class="gallery-modal-content">
          <button class="gallery-modal-close" aria-label="Close image preview">✕</button>
          <img src="" alt="" />
          <div class="gallery-modal-caption"></div>
        </div>
      `;
      document.body.appendChild(modal);

      const closeLightbox = () => {
        modal.classList.remove('open');
      };

      modal.querySelector('.gallery-modal-close').addEventListener('click', closeLightbox);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeLightbox();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeLightbox();
      });
    }

    galleryItems.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const img = btn.querySelector('img');
        const span = btn.querySelector('span');
        if (!img) return;

        const modalImg = modal.querySelector('img');
        const caption = modal.querySelector('.gallery-modal-caption');

        modalImg.src = img.src;
        modalImg.alt = img.alt || 'Power House Gym';
        caption.textContent = span ? span.textContent.trim() : 'Power House Gym Floor';
        modal.classList.add('open');
      });
    });
  }

  // --- 6. Personal Training Pricing Selector ---
  function initPTPricing() {
    const ptCards = document.querySelectorAll('.price-grid .price-card');
    if (!ptCards.length) return;

    ptCards.forEach(card => {
      card.addEventListener('click', () => {
        ptCards.forEach(c => c.classList.remove('selected', 'is-selected'));
        card.classList.add('selected', 'is-selected');

        const span = card.querySelector('span');
        const strong = card.querySelector('strong');
        const planName = span ? span.textContent.trim() : 'Personal Training';
        const price = strong ? strong.textContent.trim() : '';

        // Update Enquire button if present
        const enquireBtn = document.querySelector('a[href*="/visit"]');
        if (enquireBtn && !enquireBtn.classList.contains('nav-cta')) {
          enquireBtn.href = `/visit?plan=${encodeURIComponent(`${planName} (${price})`)}&trial=1#book-trial`;
        }
      });
    });
  }

  // --- 7. Scroll Reveal Observer ---
  function initScrollReveal() {
    // Unhide pre-rendered hidden elements smoothly
    const hiddenElements = document.querySelectorAll(
      '[style*="opacity:0"], [style*="opacity: 0"], .section-head, .home-feature, .price-card, .editorial-card'
    );

    if (!('IntersectionObserver' in window)) {
      hiddenElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.transition = 'opacity 600ms cubic-bezier(0.32, 0.72, 0, 1), transform 600ms cubic-bezier(0.32, 0.72, 0, 1)';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    hiddenElements.forEach(el => {
      observer.observe(el);
    });
  }

  // --- 8. Interactive Membership Plan Finder (Goal & Duration Dropdowns) ---
  function initPlanFinder() {
    const goalSelect = document.getElementById('finder-goal');
    const durationSelect = document.getElementById('finder-duration');
    const tabs = document.querySelectorAll('#finder-type-tabs .plan-finder-tab-btn');
    const priceDisplay = document.getElementById('finder-price');
    const titleDisplay = document.getElementById('finder-rec-title');
    const subDisplay = document.getElementById('finder-rec-sub');
    const ctaBtn = document.getElementById('finder-cta');
    const imgDisplay = document.getElementById('finder-img');

    if (!goalSelect || !durationSelect || !priceDisplay) return;

    const pricing = {
      'Regular Training': {
        1: 1500,
        3: 4000,
        6: 6000,
        12: 9000,
        img: '/__l5e/assets-v1/999a7365-6d25-41c6-9039-422f61c11750/gym-floor-1.jpeg'
      },
      'Personal Training': {
        1: 6000,
        3: 15000,
        6: 27500,
        12: 52500,
        img: '/__l5e/assets-v1/b1c39f20-0db3-4049-804f-80a49562f10f/ameer-mullani.jpeg'
      }
    };

    const goalInsights = {
      'Weight Loss': {
        need: 'Consistent caloric expenditure & fat reduction',
        reason: 'Individual guidance or dedicated gym routines keep your momentum high and preserve lean mass.'
      },
      'Muscle Gain': {
        need: 'Progressive overload & compound lifting',
        reason: 'Structured hypertrophy routines with coach spot checks break through strength plateaus.'
      },
      'Strength': {
        need: 'Power progression and barbell mechanics',
        reason: 'Proper lifting mechanics protect your joints while maximizing heavy load progression.'
      },
      'Stamina / Endurance': {
        need: 'Cardiorespiratory conditioning & circuit training',
        reason: 'High-density workout sequences improve VO2 max, recovery, and daily functional energy.'
      },
      'General Fitness': {
        need: 'Consistent daily activity & movement quality',
        reason: 'A reliable gym home in Shahupuri makes exercise a permanent habit.'
      },
      'Energy / Active Lifestyle': {
        need: 'Sustainable habit building and accountability',
        reason: 'Clear guidance and friendly atmosphere ensure you look forward to every workout.'
      }
    };

    let activeType = 'Regular Training';

    function updateFinder() {
      const months = Number(durationSelect.value) || 1;
      const goal = goalSelect.value;
      const price = pricing[activeType][months] || 1500;
      const insight = goalInsights[goal] || goalInsights['General Fitness'];

      priceDisplay.textContent = `₹${price.toLocaleString('en-IN')}`;
      if (titleDisplay) {
        const durText = durationSelect.options[durationSelect.selectedIndex]?.text || '';
        titleDisplay.textContent = `${activeType} · ${durText}`;
      }
      if (subDisplay) {
        subDisplay.innerHTML = `<b>Fitness need:</b> ${insight.need}. ${insight.reason}`;
      }
      if (imgDisplay && pricing[activeType].img) {
        imgDisplay.src = pricing[activeType].img;
      }
      if (ctaBtn) {
        const planStr = `${months} Month${months > 1 ? 's' : ''} ${activeType} (₹${price.toLocaleString('en-IN')})`;
        ctaBtn.href = `/visit?trial=1&plan=${encodeURIComponent(planStr)}&goal=${encodeURIComponent(goal)}#book-trial`;
      }
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');
        activeType = tab.getAttribute('data-type') || 'Regular Training';
        updateFinder();
      });
    });

    goalSelect.addEventListener('change', updateFinder);
    durationSelect.addEventListener('change', updateFinder);
    updateFinder();
  }

  // --- 9. Interactive Program Selector (Tabs) ---
  function initProgramSelector() {
    const tabs = document.querySelectorAll('.prog-tab');
    const titleEl = document.getElementById('prog-sel-title');
    const descEl = document.getElementById('prog-sel-desc');
    const priceEl = document.getElementById('prog-sel-price');
    const imgEl = document.getElementById('prog-sel-img');

    if (!tabs.length || !titleEl) return;

    const data = {
      'regular': {
        title: 'REGULAR TRAINING.',
        desc: 'A standard, fully-equipped gym membership and training environment for your independent, consistent routine.',
        price: 'From ₹1,500',
        img: '/__l5e/assets-v1/999a7365-6d25-41c6-9039-422f61c11750/gym-floor-1.jpeg'
      },
      'pt': {
        title: 'PERSONAL TRAINING.',
        desc: 'A more individualized experience with focused attention, structure and accountability led directly by Ameer Mullani.',
        price: 'From ₹6,000',
        img: '/__l5e/assets-v1/b1c39f20-0db3-4049-804f-80a49562f10f/ameer-mullani.jpeg'
      },
      'diet': {
        title: 'CUSTOM DIET PLAN.',
        desc: 'General fitness nutrition guidance tailored around authentic Kolhapuri home food without expensive imports or unsustainable fads.',
        price: 'Add-On ₹800',
        img: '/__l5e/assets-v1/4e34613a-5a9f-4229-a167-484b83333d3f/gym-cardio.jpeg'
      }
    };

    tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        tabs.forEach(b => {
          b.classList.remove('bg-primary', 'text-primary-foreground', 'border-primary', 'is-active');
          b.classList.add('border-input', 'bg-transparent', 'text-foreground');
        });
        btn.classList.add('bg-primary', 'text-primary-foreground', 'border-primary', 'is-active');
        btn.classList.remove('border-input', 'bg-transparent', 'text-foreground');

        const key = btn.getAttribute('data-tab') || 'regular';
        const item = data[key];
        if (item) {
          titleEl.textContent = item.title;
          descEl.textContent = item.desc;
          priceEl.textContent = item.price;
          if (imgEl && item.img) imgEl.src = item.img;
        }
      });
    });

    // Hash sync: switch tab if loaded with #regular-training or #diet-plan
    function selectTabByHash() {
      const hash = (window.location.hash || '').replace('#', '').toLowerCase();
      if (!hash) return;
      if (hash === 'regular-training' || hash === 'regular') {
        const btn = document.querySelector('.prog-tab[data-tab="regular"]');
        if (btn && !btn.classList.contains('is-active')) btn.click();
      } else if (hash === 'personal-training' || hash === 'pt') {
        const btn = document.querySelector('.prog-tab[data-tab="pt"]');
        if (btn && !btn.classList.contains('is-active')) btn.click();
      } else if (hash === 'diet-plan' || hash === 'diet') {
        const btn = document.querySelector('.prog-tab[data-tab="diet"]');
        if (btn && !btn.classList.contains('is-active')) btn.click();
      }
    }

    selectTabByHash();
    window.addEventListener('hashchange', selectTabByHash);
  }

  // --- 10. Nav Dropdown Menu Accessibility & Mobile ---
  function initNavDropdown() {
    const dropdownTriggers = document.querySelectorAll('.nav-dropdown-trigger');
    dropdownTriggers.forEach(trigger => {
      const parent = trigger.closest('.nav-item-dropdown');
      if (!parent) return;

      trigger.addEventListener('click', (e) => {
        // Toggle if chevron clicked or on touch viewports
        if (e.target.closest('.dropdown-chevron') || window.innerWidth <= 1024) {
          e.preventDefault();
          const isOpen = parent.classList.contains('is-open');
          document.querySelectorAll('.nav-item-dropdown.is-open').forEach(el => {
            el.classList.remove('is-open');
            const tr = el.querySelector('.nav-dropdown-trigger');
            if (tr) tr.setAttribute('aria-expanded', 'false');
          });
          if (!isOpen) {
            parent.classList.add('is-open');
            trigger.setAttribute('aria-expanded', 'true');
          }
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-item-dropdown')) {
        document.querySelectorAll('.nav-item-dropdown.is-open').forEach(el => {
          el.classList.remove('is-open');
          const tr = el.querySelector('.nav-dropdown-trigger');
          if (tr) tr.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  // --- Initialize Everything on DOM Ready ---
  function init() {
    removeLovableBadges();
    initHeaderScroll();
    initMobileDrawer();
    initBookTrialIntegration();
    initGoalSelector();
    initGallery();
    initPTPricing();
    initPlanFinder();
    initProgramSelector();
    initNavDropdown();
    initScrollReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
