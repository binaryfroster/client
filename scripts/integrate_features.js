import fs from 'fs';

// --- Snippet 1: Comparison Table (Image 1) ---
const comparisonSectionHtml = `
<section class="comparison-section" id="compare-training">
  <div class="comparison-header">
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

// --- Snippet 2: Diet Plan Section (Image 3 & Image 5) ---
const dietSectionHtml = `
<section class="diet-section" id="diet-plan">
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
      <h3>What's Included in Your Nutrition Plan:</h3>
      <div class="nutrition-grid-6">
        <div class="nutrition-item-card">
          <span class="nutrition-icon">🥗</span>
          <h4>General Fitness Nutrition</h4>
          <p>Clear, realistic food frameworks focused on energy, sustained fat loss, and muscle recovery.</p>
        </div>
        <div class="nutrition-item-card">
          <span class="nutrition-icon">📊</span>
          <h4>Calorie &amp; Macro Targets</h4>
          <p>Personalized protein, carb, and healthy fat numbers suited to your body weight and training goals.</p>
        </div>
        <div class="nutrition-item-card">
          <span class="nutrition-icon">🍲</span>
          <h4>Kolhapuri &amp; Indian Meals</h4>
          <p>Templates tailored to daily home meals (bhakri, chapati, dal, paneer, eggs, chicken) without fancy imported foods.</p>
        </div>
        <div class="nutrition-item-card">
          <span class="nutrition-icon">⚡</span>
          <h4>Pre &amp; Post Workout Fuel</h4>
          <p>Strategic meal timing to give you high energy during sets and fast muscle recovery afterwards.</p>
        </div>
        <div class="nutrition-item-card">
          <span class="nutrition-icon">💧</span>
          <h4>Hydration &amp; Supplements</h4>
          <p>Sensible water intake protocols and honest advice on whether whey or creatine are even necessary for you.</p>
        </div>
        <div class="nutrition-item-card">
          <span class="nutrition-icon">🔄</span>
          <h4>Works With Any Plan</h4>
          <p>Combine with a 1-month trial, 6-month plan, or 1-year membership whenever you want structured nutrition.</p>
        </div>
      </div>
    </div>
  </div>
</section>
`;

// --- Snippet 3: Full Google Reviews System (Image 4 & Image 2) ---
const reviewsFullSectionHtml = `
<section class="reviews-hero-section">
  <p style="text-align: center; color: #a1a1aa; font-size: 0.95rem; margin-bottom: 24px;">
    Only real, verifiable feedback belongs here. Nothing on this page is written on a member's behalf.
  </p>
  <div class="rating-breakdown-card">
    <div class="rating-left-col">
      <div class="g-profile-badge">
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
          <strong>Sneha D.</strong>
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
        &ldquo;Joined for the free trial and never left! The community here is amazing. Everyone knows each other and the vibe is incredible.&rdquo;
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

// --- Snippet 4: Floating WhatsApp Button ---
const floatingWaHtml = `
<a href="https://wa.me/919860252720?text=Hello%20Power%20House%20Gym%2C%20I%E2%80%99m%20interested%20in%20learning%20more%20about%20your%20training%20programs." target="_blank" rel="noopener noreferrer" class="floating-wa-btn" aria-label="Chat on WhatsApp with Ameer Mullani">
  <svg viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.668-.699c.969.54 1.771.82 2.792.82 3.183 0 5.769-2.587 5.769-5.766.001-3.182-2.585-5.766-5.769-5.766zm9.969 5.766c0 5.503-4.477 9.98-9.98 9.98-1.748 0-3.385-.45-4.819-1.238l-4.701 1.232 1.258-4.595c-.888-1.503-1.399-3.255-1.399-5.379 0-5.503 4.477-9.98 9.98-9.98s9.98 4.477 9.98 9.98z"/></svg>
</a>
`;

// ==========================================
// 1. UPDATE reviews.html
// ==========================================
let reviewsHtml = fs.readFileSync('reviews.html', 'utf8');

// Ensure gym-features.css is linked
if (!reviewsHtml.includes('gym-features.css')) {
  reviewsHtml = reviewsHtml.replace('</head>', '  <link rel="stylesheet" href="/assets/gym-features.css"/>\n</head>');
}

// Replace the old rating section with the new Google Rating Breakdown + Review Cards Grid
// The old section was: <section class="section"><div class="grid-2"><div class="rating-lockup">...</div></div></section>
reviewsHtml = reviewsHtml.replace(
  /<section class="section">\s*<div class="grid-2">\s*<div class="rating-lockup">[\s\S]*?<\/section>/i,
  reviewsFullSectionHtml
);

// Append floating WA before </body> if not present
if (!reviewsHtml.includes('floating-wa-btn')) {
  reviewsHtml = reviewsHtml.replace('</body>', `${floatingWaHtml}\n</body>`);
}

fs.writeFileSync('reviews.html', reviewsHtml, 'utf8');
console.log('✅ reviews.html updated with Google Breakdown Hero + 6 Review Cards Grid');

// ==========================================
// 2. UPDATE programs.html
// ==========================================
let programsHtml = fs.readFileSync('programs.html', 'utf8');

if (!programsHtml.includes('gym-features.css')) {
  programsHtml = programsHtml.replace('</head>', '  <link rel="stylesheet" href="/assets/gym-features.css"/>\n</head>');
}

// Add the Comparison Table and Diet Plan sections right before the final CTA
if (!programsHtml.includes('comparison-section')) {
  programsHtml = programsHtml.replace(
    /<section class="final-cta">/i,
    `${comparisonSectionHtml}\n${dietSectionHtml}\n<section class="final-cta">`
  );
}

if (!programsHtml.includes('floating-wa-btn')) {
  programsHtml = programsHtml.replace('</body>', `${floatingWaHtml}\n</body>`);
}

fs.writeFileSync('programs.html', programsHtml, 'utf8');
console.log('✅ programs.html updated with Comparison Table & Diet Plan Add-On');

// ==========================================
// 3. UPDATE personal-training.html
// ==========================================
let ptHtml = fs.readFileSync('personal-training.html', 'utf8');

if (!ptHtml.includes('gym-features.css')) {
  ptHtml = ptHtml.replace('</head>', '  <link rel="stylesheet" href="/assets/gym-features.css"/>\n</head>');
}

// Add Comparison Table and Diet Plan sections before final CTA
if (!ptHtml.includes('comparison-section')) {
  ptHtml = ptHtml.replace(
    /<section class="final-cta">/i,
    `${comparisonSectionHtml}\n${dietSectionHtml}\n<section class="final-cta">`
  );
}

if (!ptHtml.includes('floating-wa-btn')) {
  ptHtml = ptHtml.replace('</body>', `${floatingWaHtml}\n</body>`);
}

fs.writeFileSync('personal-training.html', ptHtml, 'utf8');
console.log('✅ personal-training.html updated with Comparison Table & Diet Plan Add-On');

// ==========================================
// 4. UPDATE index.html (Add features stylesheet & floating WA)
// ==========================================
let indexHtml = fs.readFileSync('index.html', 'utf8');

if (!indexHtml.includes('gym-features.css')) {
  indexHtml = indexHtml.replace('</head>', '  <link rel="stylesheet" href="/assets/gym-features.css"/>\n</head>');
}

if (!indexHtml.includes('floating-wa-btn')) {
  indexHtml = indexHtml.replace('</body>', `${floatingWaHtml}\n</body>`);
}

// Also add a teaser link in index.html "Two Clear Paths" section to compare side-by-side
if (!indexHtml.includes('compare-training')) {
  indexHtml = indexHtml.replace(
    /<div class="program-split">/i,
    '<div style="text-align:center; margin-bottom: 24px;"><a href="/programs#compare-training" style="display:inline-flex; align-items:center; gap:8px; font-size:0.85rem; font-weight:700; text-transform:uppercase; color:var(--primary, #a8ff00); text-decoration:underline; text-underline-offset:4px;">Compare Regular vs Personal Training Side-By-Side ↗</a></div>\n<div class="program-split">'
  );
}

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('✅ index.html updated with features CSS, compare teaser, and floating WA');

// ==========================================
// 5. UPDATE all other HTML files to include gym-features.css & floating WA
// ==========================================
const otherPages = ['about.html', 'contact.html', 'gallery.html', 'visit.html', 'privacy-policy.html', 'terms.html'];
otherPages.forEach(p => {
  if (!fs.existsSync(p)) return;
  let content = fs.readFileSync(p, 'utf8');
  let changed = false;

  if (!content.includes('gym-features.css')) {
    content = content.replace('</head>', '  <link rel="stylesheet" href="/assets/gym-features.css"/>\n</head>');
    changed = true;
  }
  if (!content.includes('floating-wa-btn')) {
    content = content.replace('</body>', `${floatingWaHtml}\n</body>`);
    changed = true;
  }
  if (changed) {
    fs.writeFileSync(p, content, 'utf8');
    console.log(`✅ ${p} updated with gym-features.css & floating WA`);
  }
});

console.log('\n🎉 ALL FEATURES INTEGRATED SUCCESSFULLY!');
