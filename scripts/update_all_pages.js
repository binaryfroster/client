import fs from 'fs';

const pages = [
  'index.html',
  'about.html',
  'programs.html',
  'personal-training.html',
  'gallery.html',
  'reviews.html',
  'owner.html'
];

pages.forEach(page => {
  if (!fs.existsSync(page)) return;
  let content = fs.readFileSync(page, 'utf8');

  // 1. Header navigation
  content = content.replace(
    '<a href="/membership">Membership</a>',
    '<a href="/contact">Contact</a>'
  );

  // 2. Footer navigation
  content = content.replace(
    '<a href="/membership">Membership</a>',
    '<a href="/contact">Contact Us</a>'
  );

  // 3. Add legal links to footer if not already present
  if (!content.includes('/privacy-policy')) {
    content = content.replace(
      /(<div class="footer-bottom">[\s\S]*?)(<span>Backed by)/,
      `$1<div class="footer-legal-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms">Terms of Service &amp; Gym Rules</a>
          </div>\n        $2`
    );
  }

  // 4. Specific to index.html
  if (page === 'index.html') {
    // Replace goal links from /membership to /contact
    content = content.replaceAll('/membership?goal=', '/contact?goal=');
    content = content.replaceAll('/membership?assistant=', '/contact?assistant=');
    // Replace Find Your Plan link to /contact
    content = content.replace(
      '<a class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[3px] text-xs uppercase font-extrabold cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-45 active:translate-y-px [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground border border-primary shadow-[0_5px_0_color-mix(in_srgb,var(--primary)_38%,transparent)] hover:bg-accent hover:-translate-y-0.5 h-11 px-5 mt-8" href="/membership">Find Your Plan',
      '<a class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[3px] text-xs uppercase font-extrabold cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-45 active:translate-y-px [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground border border-primary shadow-[0_5px_0_color-mix(in_srgb,var(--primary)_38%,transparent)] hover:bg-accent hover:-translate-y-0.5 h-11 px-5 mt-8" href="/contact">Inquire About Plans'
    );
  }

  fs.writeFileSync(page, content);
  console.log(`Updated ${page}`);
});
