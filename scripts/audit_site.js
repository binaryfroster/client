import fs from 'fs';
import path from 'path';

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
console.log('--- FOUND HTML FILES ---');
console.log(htmlFiles);

const report = {};

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // Find all links
  const links = [...content.matchAll(/href=["']([^"']*)["']/g)].map(m => m[1]);
  const buttons = [...content.matchAll(/<button([^>]*)>(.*?)<\/button>/gs)].map(m => ({
    attrs: m[1].replace(/\s+/g, ' ').trim(),
    text: m[2].replace(/<[^>]+>/g, '').trim()
  }));

  const trialLinks = links.filter(l => l.toLowerCase().includes('trial') || l.toLowerCase().includes('visit'));
  const membershipLinks = links.filter(l => l.toLowerCase().includes('membership'));
  const deadLinks = links.filter(l => l === '#' || l.trim() === '');
  
  // Header inspection
  const hasHeader = content.includes('site-header');
  const hasNav = content.includes('desktop-nav');
  const hasMobileNav = content.includes('mobile-nav') || content.includes('mobile-menu') || content.includes('menu-toggle');
  
  // Check Book Trial CTA in header
  const hasHeaderCTA = /<a[^>]*class=["'][^"']*nav-cta[^"']*["'][^>]*>(.*?)<\/a>/i.test(content);
  const headerCTAMatch = content.match(/<a[^>]*class=["'][^"']*nav-cta[^"']*["'][^>]*>(.*?)<\/a>/i);

  // Footer inspection
  const hasFooter = content.includes('site-footer') || content.includes('footer-main');
  const hasLegalLinks = content.includes('privacy-policy') && content.includes('terms');

  report[file] = {
    linksCount: links.length,
    buttonsCount: buttons.length,
    trialLinks,
    membershipLinks,
    deadLinksCount: deadLinks.length,
    hasHeader,
    hasNav,
    hasMobileNav,
    hasHeaderCTA: hasHeaderCTA ? headerCTAMatch[0].substring(0, 100) : false,
    hasFooter,
    hasLegalLinks
  };
});

console.log('\n--- AUDIT RESULTS ---');
console.log(JSON.stringify(report, null, 2));
