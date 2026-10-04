import fs from 'fs';

const DOMAIN = 'https://powerhouse.in';

// 1. Update robots.txt
const robotsTxt = `User-agent: *
Allow: /
Disallow: /owner.html
Disallow: /owner

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Applebot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Baiduspider
Allow: /

Sitemap: ${DOMAIN}/sitemap.xml
`;
fs.writeFileSync('robots.txt', robotsTxt, 'utf8');
console.log('Updated robots.txt with AEO bot permissions and production sitemap.');

// 2. Update sitemap.xml
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:geo="http://www.google.com/geo/schemas/sitemap/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${DOMAIN}/</loc>
    <lastmod>2026-10-04</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${DOMAIN}/__l5e/assets-v1/2af281ae-a2d9-4174-95da-3e39cee943d5/power-house-logo.png</image:loc>
      <image:title>Power House Gym &amp; Fitness Center Shahupuri Kolhapur</image:title>
    </image:image>
  </url>
  <url>
    <loc>${DOMAIN}/programs</loc>
    <lastmod>2026-10-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${DOMAIN}/personal-training</loc>
    <lastmod>2026-10-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${DOMAIN}/visit</loc>
    <lastmod>2026-10-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>${DOMAIN}/contact</loc>
    <lastmod>2026-10-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>${DOMAIN}/reviews</loc>
    <lastmod>2026-10-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${DOMAIN}/about</loc>
    <lastmod>2026-10-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>
  <url>
    <loc>${DOMAIN}/gallery</loc>
    <lastmod>2026-10-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${DOMAIN}/privacy-policy</loc>
    <lastmod>2026-10-04</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${DOMAIN}/terms</loc>
    <lastmod>2026-10-04</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.4</priority>
  </url>
</urlset>
`;
fs.writeFileSync('sitemap.xml', sitemapXml, 'utf8');
console.log('Updated sitemap.xml with canonical powerhouse.in URLs.');

// 3. Update Canonicals and Schemas across pages
const pageConfigs = [
  { file: 'index.html', path: '/', title: 'Power House Gym Shahupuri Kolhapur | Best Gym & Personal Training' },
  { file: 'programs.html', path: '/programs', title: 'Gym Memberships & Training Programs | Power House Gym Kolhapur' },
  { file: 'personal-training.html', path: '/personal-training', title: '1-on-1 Personal Training in Kolhapur | Power House Gym' },
  { file: 'contact.html', path: '/contact', title: 'Contact Power House Gym & Fitness Center | Shahupuri, Kolhapur' },
  { file: 'reviews.html', path: '/reviews', title: 'Verified Google Reviews & Ratings (4.4★) | Power House Gym' },
  { file: 'visit.html', path: '/visit', title: 'Book Free 1-Day Trial Pass | Power House Gym Shahupuri Kolhapur' },
  { file: 'about.html', path: '/about', title: 'Meet Trainer Ameer Mullani | Power House Gym Kolhapur' },
  { file: 'gallery.html', path: '/gallery', title: 'Gym Equipment & Training Floor Gallery | Power House Gym' },
  { file: 'privacy-policy.html', path: '/privacy-policy', title: 'Privacy Policy | Power House Gym & Fitness Center' },
  { file: 'terms.html', path: '/terms', title: 'Terms of Service & Rules | Power House Gym & Fitness Center' }
];

pageConfigs.forEach(cfg => {
  if (!fs.existsSync(cfg.file)) return;
  let html = fs.readFileSync(cfg.file, 'utf8');

  // Update canonical
  const canonicalUrl = `${DOMAIN}${cfg.path === '/' ? '/' : cfg.path}`;
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(/<link rel="canonical" href="[^"]*"\/>/g, `<link rel="canonical" href="${canonicalUrl}"/>`);
  } else {
    html = html.replace('</head>', `  <link rel="canonical" href="${canonicalUrl}"/>\n</head>`);
  }

  // Update og:url
  if (html.includes('<meta property="og:url"')) {
    html = html.replace(/<meta property="og:url" content="[^"]*"\/>/g, `<meta property="og:url" content="${canonicalUrl}"/>`);
  } else {
    html = html.replace('</head>', `  <meta property="og:url" content="${canonicalUrl}"/>\n</head>`);
  }

  // Update og:site_name
  if (!html.includes('og:site_name')) {
    html = html.replace('</head>', `  <meta property="og:site_name" content="Power House Gym & Fitness Center"/>\n</head>`);
  }

  // Ensure geotags
  if (!html.includes('geo.region')) {
    const geoTags = `  <meta name="geo.region" content="IN-MH"/>
  <meta name="geo.placename" content="Kolhapur, Shahupuri"/>
  <meta name="geo.position" content="16.704987;74.243253"/>
  <meta name="ICBM" content="16.704987, 74.243253"/>\n`;
    html = html.replace('</head>', `${geoTags}</head>`);
  }

  fs.writeFileSync(cfg.file, html, 'utf8');
  console.log(`Updated canonical and geotags for ${cfg.file}`);
});

// 4. Enrich index.html with FAQPage schema for AEO
let indexHtml = fs.readFileSync('index.html', 'utf8');

// Update LocalBusiness schema url & @id
indexHtml = indexHtml.replace('"url": "http://localhost:3000/"', `\"url\": \"${DOMAIN}/\"`);
indexHtml = indexHtml.replace('"@id": "https://powerhousekolhapur.com/#gym"', `\"@id\": \"${DOMAIN}/#gym\"`);

// Check if FAQPage schema exists; if not, add it
if (!indexHtml.includes('"@type": "FAQPage"')) {
  const faqSchema = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Where is Power House Gym located in Kolhapur?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Power House Gym & Fitness Center is located at Vardhmane House, 718, 3rd Lane, near Nitin Medical, E Ward, Shahupuri, Kolhapur, Maharashtra 416001, India."
      }
    },
    {
      "@type": "Question",
      "name": "What are the daily gym opening hours?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Power House Gym operates two daily shifts Monday through Saturday: Morning 6:00 AM – 11:30 AM and Evening 4:30 PM – 9:00 PM."
      }
    },
    {
      "@type": "Question",
      "name": "How much does a gym membership cost at Power House Gym?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Regular training memberships start at ₹1,500 for 1 month, ₹4,000 for 3 months (₹1,333/mo), ₹6,000 for 6 months (₹1,000/mo), and ₹9,000 for 1 year (₹750/mo). Dedicated 1-on-1 Personal Training packages range from ₹6,000 for 1 month to ₹52,500 for 1 year."
      }
    },
    {
      "@type": "Question",
      "name": "Who is the head trainer and owner of Power House Gym?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Power House Gym is founded and operated by Ameer Mullani, a certified coach with over 12 years of hands-on athletic coaching, biomechanics instruction, and transformation experience in Kolhapur."
      }
    },
    {
      "@type": "Question",
      "name": "Can I get a free trial workout before joining?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Power House Gym offers a complimentary 1-Day Free Trial Pass. You can book online or visit the gym floor in Shahupuri to meet Coach Ameer Mullani and test the equipment with zero obligation."
      }
    },
    {
      "@type": "Question",
      "name": "Does Power House Gym offer customized diet plans for local Kolhapuri food?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Power House Gym provides a Custom Diet Plan Add-On for a one-time fee of ₹800. It is customized for vegetarian, eggetarian, and non-veg diets using everyday Indian home meals (bhakri, chapati, dal, paneer, eggs, chicken) without expensive imported foods."
      }
    }
  ]
}
</script>`;
  indexHtml = indexHtml.replace('</head>', `${faqSchema}\n</head>`);
  fs.writeFileSync('index.html', indexHtml, 'utf8');
  console.log('Added AEO FAQPage structured data schema to index.html.');
}
