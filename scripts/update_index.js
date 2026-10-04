import fs from 'fs';

const indexPath = 'index.html';
let content = fs.readFileSync(indexPath, 'utf8');

// 1. Comparison Section (Image 5)
const comparisonHtml = `
<section class="comparison-section" id="compare-training">
  <div class="comparison-header">
    <span class="eyebrow"><i></i> SIDE-BY-SIDE BREAKDOWN</span>
    <h2>Regular vs <span class="highlight">Personal Training</span></h2>
    <p>Not sure which training style fits your schedule and goals? Compare features, coach involvement, and costs side by side.</p>
  </div>
  <div class="comparison-card-wrapper">
    <div class="comparison-table-container">
      <table class="comparison-table">
        <thead>
          <tr>
            <th class="col-feature">Feature / Benefit</th>
            <th class="col-regular">Regular Training</th>
            <th class="col-pt">Personal Training <span class="badge-pt">1-ON-1 DEDICATED</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="col-feature">Full Gym Floor Access</td>
            <td class="col-regular"><span class="check-green">✓ Included</span></td>
            <td class="col-pt"><span class="check-green">✓ Included</span></td>
          </tr>
          <tr>
            <td class="col-feature">
              Morning &amp; Evening Shifts
              <span class="feature-subtext">6:00–11:30 AM &amp; 4:30–9:00 PM</span>
            </td>
            <td class="col-regular"><span class="check-green">✓ Flexible access</span></td>
            <td class="col-pt"><span class="check-green">✓ Scheduled slots</span></td>
          </tr>
          <tr>
            <td class="col-feature">Free Weights, Dumbbells &amp; Machines</td>
            <td class="col-regular"><span class="check-green">✓ Full access</span></td>
            <td class="col-pt"><span class="check-green">✓ Full access + spotting</span></td>
          </tr>
          <tr>
            <td class="col-feature">Locker &amp; Water Station Access</td>
            <td class="col-regular"><span class="check-green">✓ Included</span></td>
            <td class="col-pt"><span class="check-green">✓ Included</span></td>
          </tr>
          <tr>
            <td class="col-feature">Dedicated 1-on-1 Coach</td>
            <td class="col-regular"><span class="cross-gray">✕ Self-guided</span></td>
            <td class="col-pt"><span class="check-green">✓ 1-on-1 every session</span></td>
          </tr>
          <tr>
            <td class="col-feature">Custom Workout Routine</td>
            <td class="col-regular"><span class="cross-gray">✕ Independent choice</span></td>
            <td class="col-pt"><span class="check-green">✓ Tailored to your body</span></td>
          </tr>
          <tr>
            <td class="col-feature">Real-Time Form Guidance &amp; Corrections</td>
            <td class="col-regular"><span class="cross-gray">✕ Self-monitored</span></td>
            <td class="col-pt"><span class="check-green">✓ Continuous rep checks</span></td>
          </tr>
          <tr>
            <td class="col-feature">Progressive Overload Tracking</td>
            <td class="col-regular"><span class="cross-gray">✕ Self-tracked</span></td>
            <td class="col-pt"><span class="check-green">✓ Monitored by coach</span></td>
          </tr>
          <tr>
            <td class="col-feature">Accountability &amp; Motivation</td>
            <td class="col-regular"><span class="pill-badge gray">SELF-DRIVEN</span></td>
            <td class="col-pt"><span class="pill-badge green">HIGH COACH FOLLOW-UP</span></td>
          </tr>
          <tr>
            <td class="col-feature">Diet Plan Guidance</td>
            <td class="col-regular">Optional ₹800 add-on</td>
            <td class="col-pt">Optional ₹800 add-on <span class="pill-badge green" style="font-size:0.65rem; padding:2px 6px;">TRAINER-ALIGNED</span></td>
          </tr>
          <tr>
            <td class="col-feature">Price Range</td>
            <td class="col-regular"><span class="price-val">₹750 – ₹1,500 / month</span></td>
            <td class="col-pt"><span class="price-val" style="color:var(--primary, #a8ff00);">₹4,375 – ₹6,000 / month</span></td>
          </tr>
          <tr>
            <td class="col-feature">Best Suited For</td>
            <td class="col-regular"><span class="suit-text">Experienced lifters, self-motivated trainers, and daily fitness maintainers</span></td>
            <td class="col-pt"><span class="suit-text">Beginners, body transformation, weight loss, injury rehab, and rapid strength gain</span></td>
          </tr>
          <tr>
            <td class="col-feature">Get Started</td>
            <td class="col-regular table-cta-cell">
              <a href="/programs" class="btn-table-outline">View Regular Plans</a>
            </td>
            <td class="col-pt table-cta-cell">
              <a href="/personal-training" class="btn-table-filled">View PT Plans</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
`;

// 2. Custom Diet Plan Add-On (Images 3 & 1)
const dietHtml = `
<section class="diet-section" id="diet-plan">
  <!-- Image 3: Custom Diet Plan Add-On Overview -->
  <div class="diet-card-main">
    <div class="diet-left-col">
      <span class="diet-pill-badge">Add-On Only ₹800</span>
      <h2 class="diet-title">Custom <span class="highlight">Diet Plan</span> Add-On</h2>
      <p class="diet-copy">
        General fitness nutrition guidance from the Power House team. Workouts break down muscle tissue, but nutrition is what builds it back stronger or torches fat.
      </p>
      <p class="diet-copy">
        Tailored around everyday food habits in Kolhapur — whether you eat pure vegetarian, eggetarian, or non-veg. No unsustainable fads or expensive exotic superfoods required.
      </p>
      <div class="diet-actions-row">
        <a href="https://wa.me/919860252720?text=Hello%20Coach%20Ameer%2C%20I%20would%20like%20to%20add%20the%20Custom%20Diet%20Plan%20(%E2%82%B9800)%20to%20my%20membership." target="_blank" class="btn-diet-primary">
          Get Diet Plan (₹800)
        </a>
        <a href="https://wa.me/919860252720?text=Hello%20Coach%20Ameer%2C%20I%20have%20a%20few%20questions%20about%20your%20diet%20%26%20nutrition%20coaching." target="_blank" class="btn-diet-secondary">
          Ask About Nutrition
        </a>
      </div>
    </div>
    <div class="diet-right-col">
      <div class="diet-covers-box">
        <h3 class="diet-covers-title">What The Diet Plan Covers:</h3>
        <ul class="diet-covers-list">
          <li class="diet-covers-item">
            <span class="diet-covers-dot"></span>
            <div class="diet-covers-text">
              <h4>Calorie &amp; Macro Targets</h4>
              <p>Calculated based on your accurate body weight, activity level, and target timeline.</p>
            </div>
          </li>
          <li class="diet-covers-item">
            <span class="diet-covers-dot"></span>
            <div class="diet-covers-text">
              <h4>Local Kolhapur Home Food Integration</h4>
              <p>Realistic meals built around dal, bhakri, roti, eggs, paneer, sprouts, chicken, and salad.</p>
            </div>
          </li>
          <li class="diet-covers-item">
            <span class="diet-covers-dot"></span>
            <div class="diet-covers-text">
              <h4>Pre &amp; Post-Workout Meal Timing</h4>
              <p>Know exactly what to eat before training for fresh stamina and afterwards for fast recovery.</p>
            </div>
          </li>
          <li class="diet-covers-item">
            <span class="diet-covers-dot"></span>
            <div class="diet-covers-text">
              <h4>Practical Hydration &amp; Sleep Protocols</h4>
              <p>Simple daily recovery habits that accelerate fat release and muscle repair.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Image 1: What's Included in Your Nutrition Plan (Pricing Card & 6 Modules) -->
  <div class="nutrition-curriculum-card">
    <div class="nutrition-pricing-box">
      <span class="nutrition-price-badge">One-Time Fee</span>
      <div class="nutrition-price-num">₹800</div>
      <p class="nutrition-price-sub">One-time add-on · Available with any Regular or Personal Training membership</p>
      <a href="https://wa.me/919860252720?text=Hello%20Coach%20Ameer%2C%20I%20want%20to%20add%20the%20Custom%20Diet%20Plan%20(%E2%82%B9800)%20to%20my%20training%20routine." target="_blank" class="btn-add-nutrition">
        Add Diet Plan (₹800)
      </a>
    </div>
    <div class="nutrition-modules-container">
      <h3 class="nutrition-modules-header">What's Included in Your Nutrition Plan:</h3>
      <div class="nutrition-modules-grid">
        <div class="nutrition-module-item">
          <div class="nutrition-module-top">
            <span class="nutrition-module-icon">🥗</span>
            <h4>General Fitness Nutrition</h4>
          </div>
          <p>Clear, everyday food frameworks focused on energy, sustained fat loss, and muscle recovery.</p>
        </div>
        <div class="nutrition-module-item">
          <div class="nutrition-module-top">
            <span class="nutrition-module-icon">📊</span>
            <h4>Calorie &amp; Macro Targets</h4>
          </div>
          <p>Personalized protein, carb, and healthy fat numbers suited to your body weight and training goals.</p>
        </div>
        <div class="nutrition-module-item">
          <div class="nutrition-module-top">
            <span class="nutrition-module-icon">🍲</span>
            <h4>Kolhapuri &amp; Indian Meals</h4>
          </div>
          <p>Templates tailored to daily home meals (bhakri, chapati, dal, paneer, eggs, chicken) without fancy imported foods.</p>
        </div>
        <div class="nutrition-module-item">
          <div class="nutrition-module-top">
            <span class="nutrition-module-icon">⚡</span>
            <h4>Pre &amp; Post-Workout Fuel</h4>
          </div>
          <p>Strategic meal timing to give you high energy during sets and fast muscle recovery afterwards.</p>
        </div>
        <div class="nutrition-module-item">
          <div class="nutrition-module-top">
            <span class="nutrition-module-icon">💧</span>
            <h4>Hydration &amp; Supplements</h4>
          </div>
          <p>Sensible water intake protocols and honest advice on whether whey or creatine are even necessary for you.</p>
        </div>
        <div class="nutrition-module-item">
          <div class="nutrition-module-top">
            <span class="nutrition-module-icon">📋</span>
            <h4>Works With Any Plan</h4>
          </div>
          <p>Available with a 1-month trial, 3/6/12 month plan, or 1-on-1 personal training membership whenever you want structured nutrition.</p>
        </div>
      </div>
    </div>
  </div>
</section>
`;

// 3. Google Reviews & 6 Review Cards (Images 2 & 4)
const reviewsHtml = `
<section class="reviews-hero-section" id="member-reviews" style="padding-top: 60px;">
  <div class="reviews-hero-header">
    <span class="eyebrow"><i></i> MEMBER EXPERIENCES</span>
    <h2>WHAT OUR <span class="highlight">MEMBERS SAY</span></h2>
    <p>Real feedback from members who train with us in Shahupuri, Kolhapur. Read verified Google Business reviews below.</p>
  </div>

  <div class="rating-breakdown-card">
    <div class="rating-left-col">
      <div class="google-badge-pill">
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
        </svg>
        <span>Google Business Profile</span>
      </div>
      <div class="big-rating-number">4.4</div>
      <div class="star-rating-row" aria-label="4.4 out of 5 stars">
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg viewBox="0 0 24 24" style="opacity:0.4;"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
      </div>
      <div class="rating-count-label">48 reviews on Google</div>
      <a href="https://maps.app.goo.gl/baXPDWPsxsrzSxm6A" target="_blank" rel="noopener noreferrer" class="btn-read-google-reviews">
        Read All Reviews on Google <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
    <div class="rating-right-col">
      <div class="dist-header-row">
        <h3>Rating Distribution</h3>
        <span class="dist-badge">48 Total Reviews</span>
      </div>
      <div class="dist-bar-list">
        <div class="dist-bar-item">
          <div class="star-label">5 <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></div>
          <div class="progress-track"><div class="progress-fill" style="width: 60%;"></div></div>
          <div class="dist-percent">60%</div>
          <div class="dist-count">(29)</div>
        </div>
        <div class="dist-bar-item">
          <div class="star-label">4 <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></div>
          <div class="progress-track"><div class="progress-fill" style="width: 20%;"></div></div>
          <div class="dist-percent">20%</div>
          <div class="dist-count">(10)</div>
        </div>
        <div class="dist-bar-item">
          <div class="star-label">3 <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></div>
          <div class="progress-track"><div class="progress-fill" style="width: 10%;"></div></div>
          <div class="dist-percent">10%</div>
          <div class="dist-count">(5)</div>
        </div>
        <div class="dist-bar-item">
          <div class="star-label">2 <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></div>
          <div class="progress-track"><div class="progress-fill" style="width: 5%;"></div></div>
          <div class="dist-percent">5%</div>
          <div class="dist-count">(2)</div>
        </div>
        <div class="dist-bar-item">
          <div class="star-label">1 <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></div>
          <div class="progress-track"><div class="progress-fill" style="width: 5%;"></div></div>
          <div class="dist-percent">5%</div>
          <div class="dist-count">(2)</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="reviews-grid-section">
  <div class="reviews-grid">
    <div class="review-card">
      <div class="review-card-quotes">&ldquo;</div>
      <div class="review-stars">
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
      </div>
      <p class="review-card-text">
        &ldquo;Amazing gym with top-notch equipment! The trainers are extremely supportive and knowledgeable. The black and lime green interior is super motivating. Best gym experience in Kolhapur!&rdquo;
      </p>
      <div class="reviewer-meta">
        <div class="reviewer-avatar">RM</div>
        <div class="reviewer-details">
          <strong>Rahul M.</strong>
          <span>via Google ✓</span>
        </div>
      </div>
    </div>

    <div class="review-card">
      <div class="review-card-quotes">&ldquo;</div>
      <div class="review-stars">
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
      </div>
      <p class="review-card-text">
        &ldquo;Very clean and well-maintained gym. Started personal training 3 months ago and the results are incredible. The owner personally ensures quality.&rdquo;
      </p>
      <div class="reviewer-meta">
        <div class="reviewer-avatar">PS</div>
        <div class="reviewer-details">
          <strong>Priya S.</strong>
          <span>via Google ✓</span>
        </div>
      </div>
    </div>

    <div class="review-card">
      <div class="review-card-quotes">&ldquo;</div>
      <div class="review-stars">
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
      </div>
      <p class="review-card-text">
        &ldquo;Affordable membership with great facilities. Love the morning batch — peaceful and focused environment. Highly recommend for beginners.&rdquo;
      </p>
      <div class="reviewer-meta">
        <div class="reviewer-avatar">AK</div>
        <div class="reviewer-details">
          <strong>Amit K.</strong>
          <span>via Google ✓</span>
        </div>
      </div>
    </div>

    <div class="review-card">
      <div class="review-card-quotes">&ldquo;</div>
      <div class="review-stars">
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg viewBox="0 0 24 24" style="opacity:0.35;"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
      </div>
      <p class="review-card-text">
        &ldquo;Good gym with nice equipment. Could use a few more cardio machines but overall a great place to train. Staff is friendly and helpful.&rdquo;
      </p>
      <div class="reviewer-meta">
        <div class="reviewer-avatar">SD</div>
        <div class="reviewer-details">
          <strong>Sachin D.</strong>
          <span>via Google ✓</span>
        </div>
      </div>
    </div>

    <div class="review-card">
      <div class="review-card-quotes">&ldquo;</div>
      <div class="review-stars">
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
      </div>
      <p class="review-card-text">
        &ldquo;Best personal training studio in Shahupuri. The transformation results speak for themselves. Genuine guidance without any shortcuts.&rdquo;
      </p>
      <div class="reviewer-meta">
        <div class="reviewer-avatar">VP</div>
        <div class="reviewer-details">
          <strong>Vishal P.</strong>
          <span>via Google ✓</span>
        </div>
      </div>
    </div>

    <div class="review-card">
      <div class="review-card-quotes">&ldquo;</div>
      <div class="review-stars">
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
      </div>
      <p class="review-card-text">
        &ldquo;The timing flexibility and Ameer sir's dedication make this gym stand out. Clean environment, safe for women, and great workout community!&rdquo;
      </p>
      <div class="reviewer-meta">
        <div class="reviewer-avatar">AR</div>
        <div class="reviewer-details">
          <strong>Ankita R.</strong>
          <span>via Google ✓</span>
        </div>
      </div>
    </div>
  </div>
</section>
`;

// Insert 1: Comparison section after TWO CLEAR PATHS (<div class="program-split">...</div></section>)
const splitEndMarker = '</article></div></section>';
const splitIdx = content.indexOf(splitEndMarker);
if (splitIdx === -1) {
  console.error('Could not find splitEndMarker');
  process.exit(1);
}
const afterSplit = splitIdx + splitEndMarker.length;
content = content.slice(0, afterSplit) + comparisonHtml + content.slice(afterSplit);

// Insert 2: Custom Diet Plan after MEMBERSHIP section
// Find Find Your Plan CTA button
const findPlanMarker = 'Find Your Plan <svg';
const findPlanIdx = content.indexOf(findPlanMarker);
if (findPlanIdx === -1) {
  console.error('Could not find findPlanMarker');
  process.exit(1);
}
// Find the closing </section> of membership section
const membershipSectionEnd = content.indexOf('</section>', findPlanIdx);
if (membershipSectionEnd === -1) {
  console.error('Could not find membership closing tag');
  process.exit(1);
}
const afterMembership = membershipSectionEnd + '</section>'.length;
content = content.slice(0, afterMembership) + dietHtml + content.slice(afterMembership);

// Insert 3: Replace basic proof-section with complete Reviews section (Images 2 & 4)
const proofStart = content.indexOf('<section class="section proof-section">');
if (proofStart === -1) {
  console.error('Could not find proofStart');
  process.exit(1);
}
const proofEnd = content.indexOf('</section>', proofStart) + '</section>'.length;
content = content.slice(0, proofStart) + reviewsHtml + content.slice(proofEnd);

fs.writeFileSync(indexPath, content, 'utf8');
console.log('Successfully updated index.html with all 5 feature sections!');
