import fs from 'fs';

const geoMeta = `  <meta name="geo.region" content="IN-MH"/>
  <meta name="geo.placename" content="Kolhapur, Shahupuri"/>
  <meta name="geo.position" content="16.704987;74.243253"/>
  <meta name="ICBM" content="16.704987, 74.243253"/>`;

// 1. Update index.html schema
let indexHtml = fs.readFileSync('index.html', 'utf8');
if (!indexHtml.includes('geo.region')) {
  indexHtml = indexHtml.replace('</head>', `${geoMeta}\n</head>`);
}

const comprehensiveGymSchema = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["HealthClub", "ExerciseGym", "SportsClub", "LocalBusiness"],
  "@id": "https://powerhousekolhapur.com/#gym",
  "name": "Power House Gym & Fitness Center",
  "alternateName": "Power House Gym Shahupuri",
  "image": "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/lovp_6zeys162qe986asby6kjqk36j0/0cd8a298f4da1d7d06ff12c9466bd179_1790061871177.png",
  "telephone": "+91 9860252720",
  "email": "amirmullani7272@gmail.com",
  "url": "http://localhost:3000/",
  "priceRange": "₹1,500 - ₹52,500",
  "currenciesAccepted": "INR",
  "paymentAccepted": "Cash, UPI, Credit Card, Debit Card",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Vardhmane House, 718, 3rd Ln, near Nitin Medical, E Ward, Shahupuri",
    "addressLocality": "Kolhapur",
    "addressRegion": "Maharashtra",
    "postalCode": "416001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 16.704987,
    "longitude": 74.243253
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "06:00",
      "closes": "11:30"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "16:30",
      "closes": "21:00"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.4",
    "reviewCount": "48",
    "bestRating": "5",
    "worstRating": "1"
  },
  "founder": {
    "@type": "Person",
    "name": "Ameer Mullani",
    "jobTitle": "Head Coach & Founder",
    "description": "Certified Fitness Coach with over 12 years of hands-on coaching and athletic development experience in Kolhapur."
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Gym Memberships & Coaching Programs",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Regular Gym Membership",
          "description": "Full access to strength and cardio equipment floor in Shahupuri, Kolhapur."
        },
        "price": "1500",
        "priceCurrency": "INR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Personal Training (1-on-1 Dedicated Coaching)",
          "description": "Individual guidance, rep-by-rep biomechanics monitoring, and customized programming led directly by Ameer Mullani."
        },
        "price": "6000",
        "priceCurrency": "INR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "1-Day Free Trial Session",
          "description": "Complimentary first workout visit and movement assessment."
        },
        "price": "0",
        "priceCurrency": "INR"
      }
    ]
  },
  "sameAs": [
    "https://www.instagram.com/power_house_gym_and_fitness/",
    "https://maps.app.goo.gl/baXPDWPsxsrzSxm6A"
  ]
}
</script>`;

// Replace old schema in index.html
if (indexHtml.includes('<script type="application/ld+json">')) {
  indexHtml = indexHtml.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, comprehensiveGymSchema);
} else {
  indexHtml = indexHtml.replace('</head>', `${comprehensiveGymSchema}\n</head>`);
}
fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('Updated index.html SEO and Schema.');

// 2. Add Geo Meta to other pages and specific JSON-LD schemas
const otherPages = [
  'about.html',
  'contact.html',
  'gallery.html',
  'personal-training.html',
  'privacy-policy.html',
  'programs.html',
  'reviews.html',
  'terms.html',
  'visit.html'
];

for (const p of otherPages) {
  let content = fs.readFileSync(p, 'utf8');
  if (!content.includes('geo.region')) {
    content = content.replace('</head>', `${geoMeta}\n</head>`);
  }

  // Page-specific schema
  if (p === 'personal-training.html' && !content.includes('application/ld+json')) {
    const ptSchema = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "1-on-1 Personal Training Kolhapur",
  "provider": {
    "@type": "HealthClub",
    "name": "Power House Gym & Fitness Center",
    "telephone": "+91 9860252720",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Vardhmane House, 718, 3rd Ln, near Nitin Medical, E Ward, Shahupuri",
      "addressLocality": "Kolhapur",
      "postalCode": "416001",
      "addressCountry": "IN"
    }
  },
  "areaServed": {
    "@type": "City",
    "name": "Kolhapur"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Personal Training Packages",
    "itemListElement": [
      { "@type": "Offer", "name": "1 Month Personal Training", "price": "6000", "priceCurrency": "INR" },
      { "@type": "Offer", "name": "3 Months Personal Training", "price": "15000", "priceCurrency": "INR" },
      { "@type": "Offer", "name": "6 Months Personal Training", "price": "27500", "priceCurrency": "INR" },
      { "@type": "Offer", "name": "1 Year Personal Training", "price": "52500", "priceCurrency": "INR" }
    ]
  }
}
</script>`;
    content = content.replace('</head>', `${ptSchema}\n</head>`);
  }

  if (p === 'reviews.html' && !content.includes('application/ld+json')) {
    const reviewsSchema = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Power House Gym & Fitness Center",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.4",
    "reviewCount": "48",
    "bestRating": "5"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Rahul Deshmukh" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "reviewBody": "Best gym in Shahupuri area. Ameer sir pays individual attention to posture and technique. Equipment is well-maintained and atmosphere is serious about fitness."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Pooja Patil" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "reviewBody": "Clean, respectful environment and Ameer sir's diet advice is practical with local Kolhapuri home food. Highly recommended for beginners."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Siddharth Kulkarni" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "reviewBody": "Lost 14 kg over 5 months with Coach Ameer's personal training. No fluff or false promises, just honest progression and daily consistency."
    }
  ]
}
</script>`;
    content = content.replace('</head>', `${reviewsSchema}\n</head>`);
  }

  if (p === 'about.html' && !content.includes('application/ld+json')) {
    const aboutSchema = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ameer Mullani",
  "jobTitle": "Head Coach & Founder",
  "worksFor": {
    "@type": "HealthClub",
    "name": "Power House Gym & Fitness Center",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Vardhmane House, 718, 3rd Ln, near Nitin Medical, E Ward, Shahupuri",
      "addressLocality": "Kolhapur",
      "postalCode": "416001",
      "addressCountry": "IN"
    }
  },
  "description": "Fitness trainer with over 12 years of coaching experience in Kolhapur, specializing in natural body recomposition, biomechanics, and sustainable lifestyle habit coaching."
}
</script>`;
    content = content.replace('</head>', `${aboutSchema}\n</head>`);
  }

  if (p === 'contact.html' && !content.includes('application/ld+json')) {
    const contactSchema = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "mainEntity": {
    "@type": "HealthClub",
    "name": "Power House Gym & Fitness Center",
    "telephone": "+91 9860252720",
    "email": "amirmullani7272@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Vardhmane House, 718, 3rd Ln, near Nitin Medical, E Ward, Shahupuri",
      "addressLocality": "Kolhapur",
      "postalCode": "416001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 16.704987,
      "longitude": 74.243253
    }
  }
}
</script>`;
    content = content.replace('</head>', `${contactSchema}\n</head>`);
  }

  if (p === 'visit.html' && !content.includes('application/ld+json')) {
    const visitSchema = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Power House Gym & Fitness Center",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Vardhmane House, 718, 3rd Ln, near Nitin Medical, E Ward, Shahupuri",
    "addressLocality": "Kolhapur",
    "postalCode": "416001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 16.704987,
    "longitude": 74.243253
  },
  "potentialAction": {
    "@type": "ReserveAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "http://localhost:3000/visit?trial=1#book-trial",
      "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
    },
    "result": {
      "@type": "Reservation",
      "name": "1-Day Complimentary Gym Pass"
    }
  }
}
</script>`;
    content = content.replace('</head>', `${visitSchema}\n</head>`);
  }

  fs.writeFileSync(p, content, 'utf8');
  console.log(`Updated ${p} with Geo Meta and Schema.`);
}

console.log('All pages upgraded with SEO, Geo Meta, and JSON-LD schema.');
