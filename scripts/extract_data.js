const fs = require('fs');

const indexCode = fs.readFileSync('scraped/assets/index-BckL96hb.js', 'utf8');

// Find site info / metadata object v
// In routes-readable.js: v.name, v.phone, v.email, v.morning, v.evening, v.maps, v.instagram, v.membersServed
const vMatch = indexCode.match(/name:\s*[`'"][^`'"]*Power House[^`'"]*[`'"][^}]+}/);
if (vMatch) {
  console.log('Site Metadata Object:');
  console.log(vMatch[0]);
}

// Find plans array g (regular training plans) and S (PT plans)
// In routes-readable.js: g.map(e => ... price), S.map(...)
const plansMatch = indexCode.match(/(?:regularPlans|plans|membershipPlans)?[^=]*=\s*\[\s*\{[^}]*price:\s*\d+[^\]]*\]/g);
if (plansMatch) {
  console.log('\nPlans matches:');
  plansMatch.slice(0, 5).forEach(m => console.log(m));
}

// Find goals array x
const goalsMatch = indexCode.match(/\[\s*\{\s*name:\s*[`'"]Weight Loss[`'"][^\]]+\]/);
if (goalsMatch) {
  console.log('\nGoals array:');
  console.log(goalsMatch[0]);
}

// Find gallery items
const galleryMatch = indexCode.match(/\[\s*\{\s*src:[^}]*category:[^\]]+\]/);
if (galleryMatch) {
  console.log('\nGallery items:');
  console.log(galleryMatch[0]);
}
