(function(){try{document.documentElement.classList.remove('ph-intro-active');}catch(e){}})();
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
            <a href="/gallery">Gallery <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></a>
            <a href="/reviews">Reviews <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></a>
            <a href="/visit">Visit Us <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></a>
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

  // --- 5. Gallery Filter & Interactive Equipment Modal System ---
  function initGallery() {
    const filterContainer = document.querySelector('.gallery-filter-bar, .gallery-filter');
    const equipmentCards = document.querySelectorAll('.equipment-card');
    const legacyGalleryItems = document.querySelectorAll('.spatial-gallery > button');

    if (!equipmentCards.length && !legacyGalleryItems.length) return;

    const EQUIPMENT_CATALOG = [
      {
        id: "supplements-protein-counter",
        name: "Power House High-Protein Nutrition Bar & Healthy Snacks",
        category: "Supplements & Nutrition",
        categorySlug: "supplements",
        tag: "Protein Snacks & Oats",
        shortDesc: "Genuine fitness nutrition including Pintola High Protein Chocolate Oats (26g protein per serving), RiteBite Max Protein 7-grain crisps (Chilli Lemon, Cream & Onion, Sweet Thai Chilli), and Max Protein Active bars. Sold separately at our reception counter for members and visitors.",
        targetMuscles: "Muscle Recovery, Clean Daily Macros, Post-Workout Fuel",
        specs: "Authentic batch verified \u2022 100% FSSAI certified \u2022 10g to 26g clean protein per serving \u2022 Zero maida & no added sugar",
        coachTip: "Ameer's Tip: Grab a pack of Max Protein or Pintola oats directly after your session to hit your post-workout protein window without empty calories.",
        image: "/assets/equipment/supplements-protein-counter.webp",
        alt: "Power House Gym supplement and high-protein snack counter in Shahupuri Kolhapur"
      },
      {
        id: "supplements-nutrition-shelf",
        name: "Certified Workout Supplements & Daily Nutrition Corner",
        category: "Supplements & Nutrition",
        categorySlug: "supplements",
        tag: "Supplements & Health Spreads",
        shortDesc: "100% authentic fitness nutrition stock including Pro-Muscle Energy Blast Watermelon intra-workout hydration, MuscleTech 100% Fish Oil (Omega-3), Kuike Pre-Workout, MyFitness Chocolate Peanut Butter, Max Protein Peanut Butter, and daily multivitamins. Available for direct purchase.",
        targetMuscles: "Endurance, Intra-Workout Hydration, Joint Health, Healthy Fats",
        specs: "Sealed manufacturer batches \u2022 Pre-workout explosive pump \u2022 Pure EPA/DHA Omega-3 \u2022 High-protein crispy peanut butter",
        coachTip: "Ameer's Tip: We stock only genuine, lab-verified supplements. Talk to Coach Ameer to pick the exact supplement tailored to your training goal.",
        image: "/assets/equipment/supplements-nutrition-shelf.webp",
        alt: "Authentic workout supplements protein and preworkout at Power House Gym Kolhapur"
      },
      {
        id: "viva-fitness-spin-bikes",
        name: "Viva Fitness Commercial Spin Bikes & Upright Cycle",
        category: "Cardio Zone",
        categorySlug: "cardio",
        tag: "Spinning & Endurance",
        shortDesc: "High-performance commercial studio cycling bikes with heavy perimeter-weighted flywheels, micro-adjustable resistance knobs, and a digital upright cycle for intense cardiovascular conditioning.",
        targetMuscles: "Cardiovascular Endurance, Quadriceps, Hamstrings, Calves, Glutes",
        specs: "Heavy perimeter-weighted flywheel \u2022 SPD toe-cage pedals \u2022 Emergency push-stop brake \u2022 Multi-grip aero handlebars",
        coachTip: "Ameer's Tip: Use high-cadence intervals (30s sprint / 30s recovery) for 15 minutes to torch calories and maximize VO2 max after heavy lifting.",
        image: "/assets/equipment/viva-fitness-spin-bikes.webp",
        alt: "Viva Fitness commercial spin bikes and upright exercise cycle at Power House Gym"
      },
      {
        id: "commercial-treadmills-elliptical",
        name: "Commercial Motorized Treadmills & Elliptical Cross Trainer",
        category: "Cardio Zone",
        categorySlug: "cardio",
        tag: "Treadmills & Cross Trainer",
        shortDesc: "Heavy-duty commercial grade treadmills with multi-level motorized incline and impact-cushioned running decks, paired with an ergonomic elliptical trainer for zero-impact joint cardio.",
        targetMuscles: "Aerobic Conditioning, Fat Loss, Calves, Quads, Hamstrings, Core",
        specs: "High-torque AC commercial motor \u2022 Shock-absorbing multi-ply running belt \u2022 Power incline adjustment \u2022 Dual-action synchronized elliptical motion",
        coachTip: "Ameer's Tip: Incline walking at 8-12% grade burns maximum fat while saving your knee joints compared to flat outdoor running.",
        image: "/assets/equipment/commercial-treadmills-elliptical.webp",
        alt: "Commercial motorized treadmills and elliptical cross trainer at Power House Gym Kolhapur"
      },
      {
        id: "dumbbell-rack-free-weights",
        name: "Heavy-Duty Dumbbell Racks & Olympic Weight Plate Tree",
        category: "Strength & Free Weights",
        categorySlug: "strength",
        tag: "Free Weights Arsenal",
        shortDesc: "Extensive free-weights lineup featuring heavy-duty rubber hex dumbbells and pro-style round urethane dumbbells from 2.5 kg up to 28+ kg, alongside chrome Olympic barbells and Olympic weight plates.",
        targetMuscles: "Full-Body Hypertrophy, Chest, Shoulders, Arms, Back, Legs",
        specs: "2.5 kg to 28+ kg continuous dumbbell pairs \u2022 Ergonomic knurled handles \u2022 Heavy rubber floor protection \u2022 3-tier angled heavy-gauge steel rack",
        coachTip: "Ameer's Tip: Free-weight dumbbells force both sides of your body to work equally, correcting imbalances and building functional stabilization.",
        image: "/assets/equipment/dumbbell-rack-free-weights.webp",
        alt: "Commercial dumbbell racks and Olympic plate tree at Power House Gym Shahupuri"
      },
      {
        id: "olympic-flat-bench-battle-ropes",
        name: "Viva Fitness Olympic Flat Bench & Conditioning Battle Ropes",
        category: "Strength & Free Weights",
        categorySlug: "strength",
        tag: "Chest & Battle Ropes",
        shortDesc: "Viva Fitness heavy-gauge steel flat bench press station with knurled Olympic barbell and safety bar catches, paired with heavy conditioning battle ropes for high-intensity metabolic conditioning.",
        targetMuscles: "Pectoralis Major (Mid-Chest), Anterior Deltoids, Triceps, Core, Grip",
        specs: "Heavy-duty Viva Fitness steel bench \u2022 Dual-height bar rest catches \u2022 50mm poly-dacron battle ropes \u2022 Floor-anchored safety hook",
        coachTip: "Ameer's Tip: Retract your scapula and keep feet firmly planted to push maximum weight safely without shoulder strain.",
        image: "/assets/equipment/olympic-flat-bench-battle-ropes.webp",
        alt: "Viva Fitness Olympic flat bench press and battle ropes at Power House Gym"
      },
      {
        id: "olympic-squat-rack-stands",
        name: "Adjustable Olympic Squat Stands & Spotter Rack",
        category: "Strength & Free Weights",
        categorySlug: "strength",
        tag: "Squats & Heavy Lifts",
        shortDesc: "Heavy-duty adjustable Olympic squat stands equipped with multi-height J-cups, extended safety spotter arms, and rear weight storage pegs positioned in front of full-length mirrors.",
        targetMuscles: "Quadriceps, Glutes, Hamstrings, Adductors, Spinal Erectors, Core",
        specs: "Heavy commercial steel uprights \u2022 Quick-adjust safety pin catches \u2022 Extended safety spotter catch arms \u2022 Rear weight horns for stability",
        coachTip: "Ameer's Tip: Use the full-length mirror to check your hip crease depth below parallel on back squats to ensure true quad recruitment.",
        image: "/assets/equipment/olympic-squat-rack-stands.webp",
        alt: "Adjustable Olympic squat stands with safety spotter arms at Power House Gym Kolhapur"
      },
      {
        id: "viva-fitness-flat-bench-press",
        name: "Viva Fitness Olympic Flat Bench Press (Floor Perspective)",
        category: "Strength & Free Weights",
        categorySlug: "strength",
        tag: "Olympic Bench Press",
        shortDesc: "Full training floor view of the Viva Fitness Olympic flat bench press station showing Olympic bar knurling, bumper plates, conditioning battle ropes, and mirror alignment.",
        targetMuscles: "Pectoralis Major, Triceps Brachii, Anterior Deltoids",
        specs: "Wide-base stability frame \u2022 High-density sweat-resistant upholstery \u2022 Competition width bench pad \u2022 Non-slip rubber footings",
        coachTip: "Ameer's Tip: Always control the eccentric descent to your sternum before driving up with explosive power.",
        image: "/assets/equipment/viva-fitness-flat-bench-press.webp",
        alt: "Viva Fitness Olympic flat bench press floor station at Power House Gym"
      },
      {
        id: "viva-fitness-incline-bench-press",
        name: "Viva Fitness Olympic Incline Bench Press Station",
        category: "Strength & Free Weights",
        categorySlug: "strength",
        tag: "Upper Chest & Shoulders",
        shortDesc: "Dedicated Olympic incline bench press featuring a 30-degree ergonomic press angle, multi-tiered gun-rack bar catches, and an adjustable contoured seat to isolate upper chest development.",
        targetMuscles: "Clavicular Head (Upper Chest), Anterior Deltoids, Triceps",
        specs: "30\u00b0 biomechanically optimal incline \u2022 Multi-level steel racking hooks \u2022 Adjustable height seat bottom \u2022 Heavy commercial boxed frame",
        coachTip: "Ameer's Tip: The 30\u00b0 angle hits the upper chest fibers right under the clavicle without transferring load to your neck or rotator cuffs.",
        image: "/assets/equipment/viva-fitness-incline-bench-press.webp",
        alt: "Viva Fitness Olympic incline bench press station at Power House Gym Kolhapur"
      },
      {
        id: "decline-abdominal-crunch-bench",
        name: "Adjustable Decline Sit-Up & Abdominal Crunch Bench",
        category: "Core & Conditioning",
        categorySlug: "core",
        tag: "Abdominal & Core Strength",
        shortDesc: "Heavy commercial abdominal bench with multi-angle decline adjustments and oversized padded leg-lock rollers for intense core compression, decline sit-ups, and weighted ab crunches.",
        targetMuscles: "Rectus Abdominis (Upper & Lower Abs), Hip Flexors, Core Stabilizers",
        specs: "Multi-position decline angle pin selector \u2022 4-point high-density foam leg rollers \u2022 Ergonomic front grab handle \u2022 Transport mobility wheels",
        coachTip: "Ameer's Tip: Don't pull with your neck\u2014focus on curling your ribcage towards your pelvis to fully fire your abdominal wall.",
        image: "/assets/equipment/decline-abdominal-crunch-bench.webp",
        alt: "Adjustable decline sit up and crunch bench at Power House Gym"
      },
      {
        id: "core-situp-bench-dumbbells",
        name: "Core & Abdominal Conditioning Bench with Free Weights",
        category: "Core & Conditioning",
        categorySlug: "core",
        tag: "Weighted Core Conditioning",
        shortDesc: "Reinforced decline core board with companion dumbbells ready for weighted Russian twists, incline dragon flags, and progressive abdominal overload routines.",
        targetMuscles: "Transverse Abdominis, Obliques, Rectus Abdominis, Core Rotational Power",
        specs: "Thick non-slip back support cushion \u2022 Reinforced steel spinal spine \u2022 Quick angle pin adjust \u2022 Compact floor footprint",
        coachTip: "Ameer's Tip: Add 2.5 kg or 5 kg dumbbells across your chest on decline crunches to stimulate dense, visible abdominal bricks.",
        image: "/assets/equipment/core-situp-bench-dumbbells.webp",
        alt: "Core conditioning decline bench with dumbbells at Power House Gym Kolhapur"
      },
      {
        id: "lat-pulldown-cable-station",
        name: "Commercial Lat Pulldown & High Cable Machine",
        category: "Machines & Cables",
        categorySlug: "machines",
        tag: "Back Width & Lat Pulldown",
        shortDesc: "Commercial cable tower equipped with wide neutral-grip lat attachment, ultra-smooth aircraft steel cables, and adjustable contoured thigh hold-down pads for back width and strength.",
        targetMuscles: "Latissimus Dorsi (Lats), Rhomboids, Rear Deltoids, Biceps, Forearms",
        specs: "Selectorized weight stack \u2022 Nylon-jacketed aircraft cable \u2022 Multi-height adjustable roller thigh lock \u2022 Ergonomic wide neutral-grip lat bar",
        coachTip: "Ameer's Tip: Drive down with your elbows rather than pulling with your forearms to maximize back lats width and achieve that classic V-taper.",
        image: "/assets/equipment/lat-pulldown-cable-station.webp",
        alt: "Commercial lat pulldown cable machine at Power House Gym Kolhapur"
      },
      {
        id: "viva-fitness-leg-extension-curl",
        name: "Viva Fitness Optima Seated Leg Extension & Leg Curl",
        category: "Machines & Cables",
        categorySlug: "machines",
        tag: "Quad & Hamstring Isolation",
        shortDesc: "Dual-function selectorized lower body machine featuring an anatomical cam for variable resistance matching the human strength curve, isolating quadriceps and hamstrings safely.",
        targetMuscles: "Quadriceps (Rectus Femoris, Vastus Medialis/Lateralis), Hamstrings",
        specs: "Biomechanical cam matched to muscle curve \u2022 Self-aligning padded shin roller \u2022 Adjustable backrest depth \u2022 Yellow quick-action selector levers",
        coachTip: "Ameer's Tip: Pause for a full second at peak extension to build the teardrop vastus medialis muscle above your knee.",
        image: "/assets/equipment/viva-fitness-leg-extension-curl.webp",
        alt: "Viva Fitness Optima seated leg extension and leg curl machine at Power House Gym"
      },
      {
        id: "pec-fly-rear-delt-machine",
        name: "Dual Pectoral Fly & Rear Deltoid Machine",
        category: "Machines & Cables",
        categorySlug: "machines",
        tag: "Chest Fly & Rear Delts",
        shortDesc: "Dual-function selectorized machine with dual overhead cam pivots, multi-position rotating handles, and adjustable seat for isolated chest flyes and posterior shoulder development.",
        targetMuscles: "Pectoralis Major (Chest Squeeze), Posterior Deltoid (Rear Shoulder), Rhomboids",
        specs: "Dual independent overhead pivot arms \u2022 360\u00b0 rotating hand grips \u2022 Multi-position range-of-motion selector pins \u2022 Pin-loaded weight stack",
        coachTip: "Ameer's Tip: Face the machine for reverse flyes to strengthen your rear delts and fix hunched posture from sitting at computers.",
        image: "/assets/equipment/pec-fly-rear-delt-machine.webp",
        alt: "Dual pectoral fly and rear deltoid machine at Power House Gym Kolhapur"
      },
      {
        id: "captains-chair-knee-raise-dip-twister",
        name: "Captain's Chair Power Tower, Dip Station & Core Twister",
        category: "Core & Conditioning",
        categorySlug: "core",
        tag: "Knee Raise, Dips & Twister",
        shortDesc: "All-in-one bodyweight core and upper body station featuring vertical knee raise back support, cushioned forearm rests, dip handles, and an integrated rotational oblique twister disc.",
        targetMuscles: "Lower Abdominals (Hanging Knee Raise), Triceps, Chest (Dips), Obliques (Twister)",
        specs: "High-density lumbar and forearm cushions \u2022 Dual textured vertical handles \u2022 Welded steel stability base \u2022 Integrated ball-bearing waist twister plate",
        coachTip: "Ameer's Tip: Keep your torso still and lift your knees using your lower abs without swinging your legs for maximum core isolation.",
        image: "/assets/equipment/captains-chair-knee-raise-dip-twister.webp",
        alt: "Captains chair vertical knee raise dip station and twister at Power House Gym"
      },
      {
        id: "viva-fitness-45-leg-press",
        name: "Viva Fitness Optima 45\u00b0 Incline Leg Press & Hack Squat",
        category: "Machines & Cables",
        categorySlug: "machines",
        tag: "Heavy 45\u00b0 Leg Press",
        shortDesc: "Heavy commercial 45-degree linear bearing leg press featuring an oversized diamond tread footplate, dual safety lockouts, and Olympic plate horns for massive lower-body power without spinal compression.",
        targetMuscles: "Quadriceps, Gluteus Maximus, Hamstrings, Adductors, Calves",
        specs: "45-degree angle of travel \u2022 Industrial linear guide bearings \u2022 Oversized diamond steel footplate \u2022 Dual safety release handles \u2022 Olympic plate storage horns",
        coachTip: "Ameer's Tip: Place feet shoulder-width in the middle of the plate for balanced quad and glute drive. Never lock out your knees at the top.",
        image: "/assets/equipment/viva-fitness-45-leg-press.webp",
        alt: "Viva Fitness Optima 45 degree incline leg press machine at Power House Gym Kolhapur"
      },
      {
        id: "preacher-curl-ez-barbell-bench",
        name: "Ergonomic Preacher Curl Bench with Olympic EZ Barbell",
        category: "Strength & Free Weights",
        categorySlug: "strength",
        tag: "Biceps Isolation",
        shortDesc: "Dedicated bicep isolation bench with dense angled arm pad contoured to prevent shoulder recruitment, complete with an Olympic EZ curl barbell resting on durable cradle hooks.",
        targetMuscles: "Biceps Brachii (Short & Long Heads), Brachialis, Forearm Flexors",
        specs: "Anatomical 45\u00b0 arm support angle \u2022 Heavy-duty barbell cradle hooks \u2022 Chrome Olympic EZ curl bar \u2022 Tear-resistant vinyl padding",
        coachTip: "Ameer's Tip: Preacher curls eliminate cheating and body momentum, placing 100% of the load on the bicep peak for faster muscle growth.",
        image: "/assets/equipment/preacher-curl-ez-barbell-bench.webp",
        alt: "Preacher curl bench with Olympic EZ barbell at Power House Gym Kolhapur"
      }
    ];

    let currentFilter = 'all';
    let currentFilteredList = [...EQUIPMENT_CATALOG];
    let currentIndex = 0;
    let lastActiveElement = null;

    // Filter Buttons logic
    if (filterContainer) {
      const filterBtns = filterContainer.querySelectorAll('button');
      filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const filterSlug = (btn.getAttribute('data-filter') || btn.textContent.trim().toLowerCase()).trim();

          // Update active button state and ARIA tabs
          filterBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
          });
          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');

          currentFilter = filterSlug;

          // Filter equipment cards in the grid
          if (equipmentCards.length) {
            equipmentCards.forEach(card => {
              const cardCat = card.getAttribute('data-category');
              if (currentFilter === 'all' || cardCat === currentFilter || (cardCat && cardCat.includes(currentFilter))) {
                card.style.display = 'flex';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              } else {
                card.style.display = 'none';
                card.style.opacity = '0';
              }
            });
          }

          // Legacy support for spatial-gallery
          if (legacyGalleryItems.length) {
            legacyGalleryItems.forEach(item => {
              const span = item.querySelector('span');
              const cat = span ? span.textContent.trim().toLowerCase() : '';
              if (currentFilter === 'all' || cat.includes(currentFilter)) {
                item.style.display = 'block';
              } else {
                item.style.display = 'none';
              }
            });
          }
        });
      });
    }

    // Modal elements
    const modal = document.getElementById('equipment-modal') || document.querySelector('.equipment-modal-overlay');
    if (!modal) return;

    const modalImg = document.getElementById('modal-img');
    const modalBadgeCat = document.getElementById('modal-badge-cat');
    const modalCounter = document.getElementById('modal-counter');
    const modalTagline = document.getElementById('modal-tagline');
    const modalHeading = document.getElementById('modal-heading-text');
    const modalDesc = document.getElementById('modal-desc');
    const modalMuscles = document.getElementById('modal-muscles');
    const modalSpecs = document.getElementById('modal-specs');
    const modalTip = document.getElementById('modal-tip');
    const modalWaLink = document.getElementById('modal-wa-link');
    const modalTrialBtn = document.getElementById('modal-trial-btn');
    const modalSpecLabel1 = document.getElementById('modal-spec-label-1');
    const modalSpecLabel2 = document.getElementById('modal-spec-label-2');
    const prevBtn = document.getElementById('modal-prev-btn');
    const nextBtn = document.getElementById('modal-next-btn');

    function preloadNearbyImages(idx) {
      if (!currentFilteredList.length) return;
      const nextIdx = (idx + 1) % currentFilteredList.length;
      const prevIdx = (idx - 1 + currentFilteredList.length) % currentFilteredList.length;
      [nextIdx, prevIdx].forEach(i => {
        const it = currentFilteredList[i];
        if (it && it.image) {
          const img = new Image();
          img.src = it.image;
        }
      });
    }

    function renderModal(index) {
      if (!currentFilteredList.length) return;
      currentIndex = (index + currentFilteredList.length) % currentFilteredList.length;
      const item = currentFilteredList[currentIndex];
      const isSupplement = item.categorySlug === 'supplements';

      const prevIdx = (currentIndex - 1 + currentFilteredList.length) % currentFilteredList.length;
      const nextIdx = (currentIndex + 1) % currentFilteredList.length;
      const prevItem = currentFilteredList[prevIdx];
      const nextItem = currentFilteredList[nextIdx];

      if (modalImg) {
        modalImg.style.opacity = '0.35';
        modalImg.src = item.image;
        modalImg.alt = item.alt;
        setTimeout(() => {
          modalImg.style.opacity = '1';
        }, 80);
      }

      if (modalBadgeCat) modalBadgeCat.textContent = item.category;
      const counterText = `${currentIndex + 1} / ${currentFilteredList.length}`;
      if (modalCounter) modalCounter.textContent = counterText;
      if (modalTagline) modalTagline.textContent = item.tag;
      if (modalHeading) modalHeading.textContent = item.name;
      if (modalDesc) modalDesc.textContent = item.shortDesc;
      if (modalMuscles) modalMuscles.textContent = item.targetMuscles;
      if (modalSpecs) modalSpecs.textContent = item.specs;
      if (modalTip) modalTip.textContent = item.coachTip;

      // Update titles/tooltips on navigation buttons with adjacent equipment names
      if (prevBtn) prevBtn.title = `Previous: ${prevItem.name} (or press ← key)`;
      if (nextBtn) nextBtn.title = `Next: ${nextItem.name} (or press → key)`;

      // Dynamic Spec Labels
      if (modalSpecLabel1) {
        modalSpecLabel1.textContent = isSupplement ? '🎯 Nutritional Benefit / Primary Focus' : '🎯 Target Muscles / Primary Focus';
      }
      if (modalSpecLabel2) {
        modalSpecLabel2.textContent = isSupplement ? '📦 Product Batch & Certification' : '⚙️ Machine Construction & Specs';
      }

      // Dynamic CTA buttons for supplements vs equipment
      if (modalTrialBtn) {
        if (isSupplement) {
          modalTrialBtn.innerHTML = '⚡ Purchase at Reception Desk';
          modalTrialBtn.href = '#supplements';
          modalTrialBtn.onclick = (e) => {
            e.preventDefault();
            closeModal();
            const suppSec = document.getElementById('supplements');
            if (suppSec) {
              suppSec.scrollIntoView({ behavior: 'smooth' });
            }
          };
        } else {
          modalTrialBtn.innerHTML = '⚡ Book Free Trial to Train Here';
          modalTrialBtn.href = '/visit?trial=1#book-trial';
          modalTrialBtn.onclick = null;
        }
      }

      // Dynamic WhatsApp message
      if (modalWaLink) {
        let waMsg;
        if (isSupplement) {
          waMsg = `Hello Coach Ameer, I saw ${item.name} on the Power House Gym website and I'd like to check price and availability at your Shahupuri gym.`;
        } else {
          waMsg = `Hello Coach Ameer, I saw the ${item.name} on the Power House Gym website and I'd like to learn more about training on this in Shahupuri.`;
        }
        modalWaLink.href = `https://wa.me/919860252720?text=${encodeURIComponent(waMsg)}`;
      }

      preloadNearbyImages(currentIndex);
    }

    function openModal(itemIndex) {
      lastActiveElement = document.activeElement;
      // Always allow cycling through ALL 17 gallery items inside the modal
      currentFilteredList = [...EQUIPMENT_CATALOG];
      renderModal(itemIndex);
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const closeBtn = modal.querySelector('.equipment-modal-close');
      if (closeBtn) {
        if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
          window.requestAnimationFrame(() => {
            closeBtn.focus();
          });
        } else {
          closeBtn.focus();
        }
      }

      try {
        window.history.pushState({ powerhouseModal: true }, '');
      } catch (err) {}
    }

    function closeModal(shouldGoBack = true) {
      if (!modal.classList.contains('is-open')) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
        lastActiveElement.focus();
      }

      if (shouldGoBack && window.history.state && window.history.state.powerhouseModal) {
        try {
          window.history.back();
        } catch (err) {}
      }
    }

    // Focus Trap function for WAI-ARIA modal dialog compliance
    function trapFocus(e) {
      if (e.key !== 'Tab' || !modal.classList.contains('is-open')) return;
      const focusable = modal.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first || !modal.contains(document.activeElement)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last || !modal.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', trapFocus);

    // Attach click and Enter listeners to equipment cards
    equipmentCards.forEach((card) => {
      const equipId = card.getAttribute('data-equipment-id');
      const clickHandler = (e) => {
        e.preventDefault();
        const foundIdx = EQUIPMENT_CATALOG.findIndex(it => it.id === equipId);
        openModal(foundIdx >= 0 ? foundIdx : 0);
      };

      card.addEventListener('click', clickHandler);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          clickHandler(e);
        }
      });
    });

    // Close on backdrop or overlay click or close button
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('equipment-modal-backdrop') || e.target.closest('.equipment-modal-close')) {
        e.preventDefault();
        closeModal();
      }
    });

    // Prev / Next button listeners (both floating arrows and info bar buttons)
    const handlePrev = (e) => {
      if (e) e.preventDefault();
      renderModal(currentIndex - 1);
    };

    const handleNext = (e) => {
      if (e) e.preventDefault();
      renderModal(currentIndex + 1);
    };

    if (prevBtn) prevBtn.addEventListener('click', handlePrev);
    if (nextBtn) nextBtn.addEventListener('click', handleNext);

    // Keyboard navigation (Escape, Left Arrow, Right Arrow)
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('is-open')) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    });

    // Mobile popstate / Back button handling
    window.addEventListener('popstate', () => {
      if (modal.classList.contains('is-open')) {
        closeModal(false);
      }
    });

    // Touch swipe support for modal on mobile with diagonal scroll protection
    const mediaWrap = modal.querySelector('.equipment-modal-media-wrap');
    if (mediaWrap) {
      let touchStartX = 0;
      let touchStartY = 0;
      mediaWrap.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      }, { passive: true });

      mediaWrap.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        // Require horizontal intent: diffX significantly greater than vertical movement
        if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.4) {
          if (diffX < 0) {
            handleNext(); // Swipe left = next
          } else {
            handlePrev(); // Swipe right = prev
          }
        }
      }, { passive: true });
    }

    // Deep link check on load (e.g., ?equip=id or #equip-id)
    try {
      const params = new URLSearchParams(window.location.search);
      const equipParam = params.get('equip') || params.get('equipment');
      const hashEquip = window.location.hash.startsWith('#equip-') ? window.location.hash.replace('#equip-', '') : null;
      const targetId = equipParam || hashEquip;
      if (targetId) {
        const targetIdx = EQUIPMENT_CATALOG.findIndex(it => it.id === targetId);
        if (targetIdx >= 0) {
          setTimeout(() => openModal(targetIdx), 150);
        }
      }
    } catch (err) {}
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
        img: '/__l5e/assets-v1/999a7365-6d25-41c6-9039-422f61c11750/gym-floor-1.jpeg',
        objectPosition: 'center center'
      },
      'Personal Training': {
        1: 6000,
        3: 15000,
        6: 27500,
        12: 52500,
        img: '/__l5e/assets-v1/b1c39f20-0db3-4049-804f-80a49562f10f/ameer-mullani-portrait.jpeg',
        objectPosition: 'center 35%'
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
        imgDisplay.style.objectPosition = pricing[activeType].objectPosition || 'center center';
        imgDisplay.alt = activeType === 'Personal Training' ? 'Coach Ameer Mullani - Power House Gym 1-on-1 Personal Trainer' : 'Power House Gym training floor';
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
        img: '/__l5e/assets-v1/b1c39f20-0db3-4049-804f-80a49562f10f/ameer-mullani-portrait.jpeg',
        objectPosition: 'center 35%'
      },
      'diet': {
        title: 'CUSTOM DIET PLAN.',
        desc: 'General fitness nutrition guidance tailored around authentic Kolhapuri home food without expensive imports or unsustainable fads.',
        price: 'Add-On ₹800',
        img: '/__l5e/assets-v1/4e34613a-5a9f-4229-a167-484b83333d3f/gym-cardio.jpeg',
        objectPosition: 'center center'
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
          if (imgEl && item.img) {
            imgEl.src = item.img;
            imgEl.style.objectPosition = item.objectPosition || '50% 40%';
            imgEl.alt = key === 'pt' ? 'Coach Ameer Mullani - 1-on-1 Personal Training' : (key === 'diet' ? 'Custom Diet & Nutrition Planning' : 'Power House strength training floor');
          }
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

  // ==========================================================================
  // BRAND INTRO VIDEO CONTROLLER
  // Autoplays on first visit to homepage with smooth fade, skip button, and safety fallbacks
  // ==========================================================================
  function initBrandIntro() {
    try {
      const isHome = location.pathname === '/' || location.pathname === '/index.html' || location.pathname === '';
      if (!isHome) return;

      const forceReplay = location.search.indexOf('intro=1') !== -1 || location.search.indexOf('replay=1') !== -1;
      const alreadySeen = sessionStorage.getItem('ph-intro') === 'seen';
      const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if ((alreadySeen && !forceReplay) || prefersReducedMotion) {
        document.documentElement.classList.remove('ph-intro-playing');
        const existingOverlay = document.getElementById('brand-intro');
        if (existingOverlay) existingOverlay.remove();
        return;
      }

      if (typeof window.dismissBrandIntro === 'function') {
        const skipBtn = document.getElementById('skip-intro-btn');
        if (skipBtn) {
          skipBtn.onclick = window.dismissBrandIntro;
        }
      }

      window.replayIntro = function() {
        sessionStorage.removeItem('ph-intro');
        location.href = '/?intro=1';
      };
    } catch (err) {
      console.error('Intro error:', err);
      document.documentElement.classList.remove('ph-intro-playing');
      const overlay = document.getElementById('brand-intro');
      if (overlay) overlay.remove();
    }
  }

  // --- Contact Form Parameter Autofill ---
  function initContactFormAutofill() {
    const interestSelect = document.getElementById('c-interest');
    if (!interestSelect) return;

    try {
      const params = new URLSearchParams(window.location.search);
      const plan = params.get('plan') || params.get('program');
      const assistant = params.get('assistant');
      const goal = params.get('goal');
      const subject = params.get('subject') || params.get('interest');

      const targetTerm = plan || assistant || goal || subject;
      if (!targetTerm) return;

      const normalized = targetTerm.toLowerCase().trim();

      for (let i = 0; i < interestSelect.options.length; i++) {
        const opt = interestSelect.options[i];
        const val = opt.value.toLowerCase();
        const txt = opt.text.toLowerCase();
        if (val.includes(normalized) || txt.includes(normalized) || (normalized.includes('diet') && val.includes('diet')) || (normalized.includes('trial') && val.includes('trial'))) {
          interestSelect.selectedIndex = i;
          break;
        }
      }

      const msgTextarea = document.getElementById('c-message');
      if (msgTextarea && !msgTextarea.value.trim()) {
        if (plan) {
          msgTextarea.value = `Hello Coach Ameer, I am interested in joining under the "${plan}" plan. Please share the details and timings.`;
        } else if (targetTerm) {
          msgTextarea.value = `Hello Power House team, I would like to inquire about ${targetTerm}.`;
        }
      }
    } catch (e) {
      console.warn('Form autofill notice:', e);
    }
  }

  // --- 14. Visit Us FAQ & Pop-Out Modal Controller ---
  function initVisitFAQ() {
    const faqSection = document.getElementById('visit-faq');
    if (!faqSection) return;

    const faqItems = faqSection.querySelectorAll('.faq-item');
    const modalOverlay = document.getElementById('faq-modal-overlay');
    const modalBadge = document.getElementById('faq-modal-badge');
    const modalTitle = document.getElementById('faq-modal-q-title');
    const modalContent = document.getElementById('faq-modal-a-content');
    const modalCloseBtn = document.getElementById('faq-modal-close');
    const modalPrevBtn = document.getElementById('faq-modal-prev');
    const modalNextBtn = document.getElementById('faq-modal-next');

    // Build data array from DOM items
    const faqData = [];
    faqItems.forEach((item, idx) => {
      const qText = item.querySelector('.faq-q-text')?.textContent.trim() || '';
      const numText = item.querySelector('.faq-num')?.textContent.trim() || String(idx + 1).padStart(2, '0');
      const aText = item.querySelector('.faq-answer-text')?.innerHTML.trim() || '';
      faqData.push({ id: idx, num: numText, question: qText, answer: aText, element: item });
    });

    let currentModalIndex = 0;

    function openModal(index) {
      if (!modalOverlay || !faqData[index]) return;
      currentModalIndex = index;
      const data = faqData[index];

      if (modalBadge) modalBadge.textContent = `QUESTION ${data.num} OF ${String(faqData.length).padStart(2, '0')}`;
      if (modalTitle) modalTitle.textContent = data.question;
      if (modalContent) modalContent.innerHTML = `<p>${data.answer}</p>`;

      if (modalPrevBtn) modalPrevBtn.disabled = index === 0;
      if (modalNextBtn) modalNextBtn.disabled = index === faqData.length - 1;

      modalOverlay.classList.add('is-active');
      modalOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      modalCloseBtn?.focus();
    }

    function closeModal() {
      if (!modalOverlay) return;
      modalOverlay.classList.remove('is-active');
      modalOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    // Modal navigation
    modalCloseBtn?.addEventListener('click', closeModal);
    modalOverlay?.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    modalPrevBtn?.addEventListener('click', () => {
      if (currentModalIndex > 0) openModal(currentModalIndex - 1);
    });

    modalNextBtn?.addEventListener('click', () => {
      if (currentModalIndex < faqData.length - 1) openModal(currentModalIndex + 1);
    });

    document.addEventListener('keydown', (e) => {
      if (!modalOverlay?.classList.contains('is-active')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft' && currentModalIndex > 0) openModal(currentModalIndex - 1);
      if (e.key === 'ArrowRight' && currentModalIndex < faqData.length - 1) openModal(currentModalIndex + 1);
    });

    // Accordion toggle & Pop-out triggers
    faqItems.forEach((item, index) => {
      const questionBar = item.querySelector('.faq-question-bar');
      const popoutBtn = item.querySelector('.faq-popout-btn');
      const modalLink = item.querySelector('.faq-ans-modal-link');

      // Pop-out button opens modal directly
      popoutBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(index);
      });

      modalLink?.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(index);
      });

      // Question bar toggles inline pop-out accordion
      questionBar?.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // Close other items for focus
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('is-open');
            other.querySelector('.faq-question-bar')?.setAttribute('aria-expanded', 'false');
          }
        });

        if (isOpen) {
          item.classList.remove('is-open');
          questionBar.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('is-open');
          questionBar.setAttribute('aria-expanded', 'true');
        }
      });

      // Keyboard support for question bar
      questionBar?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          questionBar.click();
        }
      });
    });
  }

  // --- 15. Personal Training 8-Step Journey Controller ---
  function initPTJourney() {
    const journeySection = document.getElementById('pt-journey-section') || document.querySelector('.journey');
    if (!journeySection) return;

    const card = journeySection.querySelector('.journey-card');
    const cardNum = journeySection.querySelector('.journey-card-num') || journeySection.querySelector('.journey-card > span');
    const cardTitle = journeySection.querySelector('.journey-card-title') || journeySection.querySelector('.journey-card > h3');
    const cardDesc = journeySection.querySelector('.journey-card-desc') || journeySection.querySelector('.journey-card > p');
    const counter = journeySection.querySelector('.journey-card-counter') || journeySection.querySelector('.journey-card small');
    const prevBtn = journeySection.querySelector('.journey-btn-prev') || journeySection.querySelector('button[aria-label="Previous step"]');
    const nextBtn = journeySection.querySelector('.journey-btn-next') || journeySection.querySelector('button[aria-label="Next step"]');
    const stepButtons = journeySection.querySelectorAll('.journey-step-btn, .journey-steps-nav button, .journey nav button');

    if (!card || stepButtons.length === 0) return;

    const PT_STEPS_DATA = [
      {
        num: '01',
        title: 'Assessment',
        desc: 'Discuss height, weight, goal and training background where applicable.'
      },
      {
        num: '02',
        title: 'Goal',
        desc: 'Establish clear, measurable fitness benchmarks—whether fat loss, muscle hypertrophy, or functional strength.'
      },
      {
        num: '03',
        title: 'Personalized Plan',
        desc: 'Design a tailored periodized workout split adapted to your body mechanics, schedule, and recovery capacity.'
      },
      {
        num: '04',
        title: 'Daily Routine',
        desc: 'Structure daily activity targets, warm-up habits, and sleep-recovery discipline to sustain consistency.'
      },
      {
        num: '05',
        title: 'Training',
        desc: 'Hands-on, 1-on-1 guided sessions on the floor with direct form correction, tempo control, and spot assistance.'
      },
      {
        num: '06',
        title: 'Monitoring',
        desc: 'Track progressive overload week by week—recording lifting numbers, form maturity, and cardiovascular capacity.'
      },
      {
        num: '07',
        title: 'Diet',
        desc: 'Align daily nutrition and macro targets with your training demands; optional customized meal planning guidance.'
      },
      {
        num: '08',
        title: 'Progress',
        desc: 'Evaluate biometric measurements and physical transformations, recalculating targets for sustained growth.'
      }
    ];

    let currentStepIndex = 0;

    function renderStep(index) {
      if (index < 0) index = PT_STEPS_DATA.length - 1;
      if (index >= PT_STEPS_DATA.length) index = 0;
      currentStepIndex = index;
      const data = PT_STEPS_DATA[currentStepIndex];

      // Update card contents
      if (cardNum) cardNum.textContent = data.num;
      if (cardTitle) cardTitle.textContent = data.title;
      if (cardDesc) cardDesc.textContent = data.desc;
      if (counter) counter.textContent = `${currentStepIndex + 1} / ${PT_STEPS_DATA.length}`;

      // Animation feedback
      card.classList.remove('fade-step');
      void card.offsetWidth; // trigger reflow
      card.classList.add('fade-step');

      // Update active state in nav buttons
      stepButtons.forEach((btn, idx) => {
        if (idx === currentStepIndex) {
          btn.classList.add('active');
          btn.setAttribute('aria-current', 'step');
        } else {
          btn.classList.remove('active');
          btn.removeAttribute('aria-current');
        }
      });
    }

    // Step button click listeners
    stepButtons.forEach((btn, idx) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        renderStep(idx);
      });
    });

    // Prev / Next button listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        renderStep(currentStepIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        renderStep(currentStepIndex + 1);
      });
    }

    // Keyboard navigation when focus is inside journey section
    journeySection.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        renderStep(currentStepIndex + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        renderStep(currentStepIndex - 1);
      }
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    card.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    card.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diffX = touchEndX - touchStartX;
      if (Math.abs(diffX) > 45) {
        if (diffX < 0) {
          renderStep(currentStepIndex + 1); // swipe left = next
        } else {
          renderStep(currentStepIndex - 1); // swipe right = prev
        }
      }
    }, { passive: true });

    // Initial render
    renderStep(0);
  }

  // --- Initialize Everything on DOM Ready ---
  function init() {
    initBrandIntro();
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
    initContactFormAutofill();
    initVisitFAQ();
    initPTJourney();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

