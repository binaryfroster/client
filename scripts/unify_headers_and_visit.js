import fs from 'fs';

// 1. Unify headers on contact.html, privacy-policy.html, terms.html
function getUnifiedHeader(activePage) {
  const links = [
    { href: '/', label: 'Home', id: 'home' },
    { href: '/about', label: 'About', id: 'about' },
    { href: '/programs', label: 'Programs', id: 'programs' },
    { href: '/personal-training', label: 'Personal Training', id: 'personal-training' },
    { href: '/contact', label: 'Contact', id: 'contact' },
    { href: '/gallery', label: 'Gallery', id: 'gallery' },
    { href: '/reviews', label: 'Reviews', id: 'reviews' },
    { href: '/visit', label: 'Visit', id: 'visit' }
  ];

  const navHtml = links.map(l => {
    const isActive = (l.id === activePage);
    const activeClass = isActive ? ' class=\"active active\" data-status=\"active\" aria-current=\"page\"' : '';
    return `<a${activeClass} href=\"${l.href}\">${l.label}</a>`;
  }).join('');

  return `<header class=\"site-header\"><a aria-label=\"Power House home\" class=\"brand\" href=\"/\"><img src=\"/__l5e/assets-v1/2af281ae-a2d9-4174-95da-3e39cee943d5/power-house-logo.png\" alt=\"Power House Gym &amp; Fitness Center\" width=\"1343\" height=\"1171\" decoding=\"async\"/><span>POWER HOUSE</span></a><nav class=\"desktop-nav\" aria-label=\"Main navigation\">${navHtml}</nav><div class=\"header-actions\"><a href=\"/visit?trial=1#book-trial\" class=\"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[3px] text-xs uppercase font-extrabold cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-45 active:translate-y-px [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground border border-primary shadow-[0_5px_0_color-mix(in_srgb,var(--primary)_38%,transparent)] hover:bg-accent hover:-translate-y-0.5 h-12 px-6\">Book Free Trial <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-arrow-up-right\" aria-hidden=\"true\"><path d=\"M7 7h10v10\"></path><path d=\"M7 17 17 7\"></path></svg></a></div><button class=\"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[3px] text-xs uppercase font-extrabold cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-45 active:translate-y-px [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-foreground hover:bg-secondary h-11 w-11 menu-button\" aria-label=\"Open navigation\" aria-expanded=\"false\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-menu\" aria-hidden=\"true\"><path d=\"M4 5h16\"></path><path d=\"M4 12h16\"></path><path d=\"M4 19h16\"></path></svg></button></header>`;
}

// Update contact.html
let contact = fs.readFileSync('contact.html', 'utf8');
contact = contact.replace(/<header class="site-header">[\s\S]*?<\/header>/i, getUnifiedHeader('contact'));
fs.writeFileSync('contact.html', contact, 'utf8');
console.log('✅ contact.html header unified');

// Update privacy-policy.html
let privacy = fs.readFileSync('privacy-policy.html', 'utf8');
privacy = privacy.replace(/<header class="site-header">[\s\S]*?<\/header>/i, getUnifiedHeader('privacy'));
fs.writeFileSync('privacy-policy.html', privacy, 'utf8');
console.log('✅ privacy-policy.html header unified');

// Update terms.html
let terms = fs.readFileSync('terms.html', 'utf8');
terms = terms.replace(/<header class="site-header">[\s\S]*?<\/header>/i, getUnifiedHeader('terms'));
fs.writeFileSync('terms.html', terms, 'utf8');
console.log('✅ terms.html header unified');

// 2. Polish visit.html form & copy
let visit = fs.readFileSync('visit.html', 'utf8');

// Ensure form has id="book-trial"
visit = visit.replace(/<form class="trial-form">/i, '<form class="trial-form" id="book-trial">');

// Update button text
visit = visit.replace(/Create Demo Booking/g, 'Claim Your Free Trial Pass');

// Update copy from "creates a demo enquiry"
visit = visit.replace(
  /This creates a demo enquiry and opens WhatsApp so you can contact Power House directly\./gi,
  'Claim your 1-day complimentary gym pass and connect directly with Head Coach Ameer Mullani via WhatsApp.'
);

fs.writeFileSync('visit.html', visit, 'utf8');
console.log('✅ visit.html form polished and integrated');
