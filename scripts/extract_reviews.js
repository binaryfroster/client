const fs = require('fs');

const indexCode = fs.readFileSync('scraped/assets/index-BckL96hb.js', 'utf8');

// Find reviews data
const reviewsMatch = indexCode.match(/(?:reviews|testimonials)[^=]*=\s*\[\s*\{[^}]*rating:[^\]]+\]/i);
if (reviewsMatch) {
  console.log('Reviews match:');
  console.log(reviewsMatch[0]);
} else {
  // search by author or quotes
  const quoteMatch = indexCode.match(/\[\s*\{[^}]*(?:author|reviewer|text|quote)[^\]]+\]/i);
  if (quoteMatch) {
    console.log('Quote match:');
    console.log(quoteMatch[0]);
  }
}
