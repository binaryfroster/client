import fs from 'fs';

// 1. Add schema to programs.html
let progHtml = fs.readFileSync('programs.html', 'utf8');
const programsSchema = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Fitness Training Programs & Memberships",
  "provider": {
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
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Training Programs Catalog",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Regular Gym Membership",
        "description": "Standard fully-equipped gym floor membership. Cardio, free weights, and resistance machines.",
        "price": "1500",
        "priceCurrency": "INR"
      },
      {
        "@type": "Offer",
        "name": "Personal Training (1-on-1)",
        "description": "Dedicated coaching, custom programming, technique correction, and body recomposition.",
        "price": "6000",
        "priceCurrency": "INR"
      },
      {
        "@type": "Offer",
        "name": "Custom Diet Plan Add-On",
        "description": "Personalized nutrition plan based on local Kolhapuri home food and high-protein vegetarian options.",
        "price": "800",
        "priceCurrency": "INR"
      }
    ]
  }
}
</script>`;

if (!progHtml.includes('Training Programs Catalog')) {
  progHtml = progHtml.replace('</head>', `${programsSchema}\n</head>`);
  fs.writeFileSync('programs.html', progHtml, 'utf8');
  console.log('Added schema to programs.html');
}

// 2. Normalize canonical tags across all pages
const baseDomain = 'https://power-house-digital.lovable.app';
const pageCanonicalMap = {
  'index.html': `${baseDomain}/`,
  'about.html': `${baseDomain}/about`,
  'programs.html': `${baseDomain}/programs`,
  'personal-training.html': `${baseDomain}/personal-training`,
  'contact.html': `${baseDomain}/contact`,
  'gallery.html': `${baseDomain}/gallery`,
  'reviews.html': `${baseDomain}/reviews`,
  'visit.html': `${baseDomain}/visit`,
  'privacy-policy.html': `${baseDomain}/privacy-policy`,
  'terms.html': `${baseDomain}/terms`
};

for (const [file, canonicalUrl] of Object.entries(pageCanonicalMap)) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('<link rel="canonical"')) {
    content = content.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonicalUrl}"/>`);
  } else {
    content = content.replace('</head>', `  <link rel="canonical" href="${canonicalUrl}"/>\n</head>`);
  }
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Normalized canonical for ${file} -> ${canonicalUrl}`);
}
