import fs from 'fs';

const pages = fs.readdirSync('.').filter(f => f.endsWith('.html'));

pages.forEach(p => {
  const html = fs.readFileSync(p, 'utf8');
  console.log(`\n================= ${p} =================`);
  
  // Find all buttons
  const buttons = [...html.matchAll(/<button([^>]*)>([\s\S]*?)<\/button>/gi)].map(m => {
    const attrs = m[1].replace(/\s+/g, ' ').trim();
    const text = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return { text, attrs: attrs.substring(0, 100) };
  });
  console.log(`Buttons (${buttons.length}):`, buttons);

  // Find all interactive links (with href, excluding regular nav)
  const links = [...html.matchAll(/<a\s+([^>]*)>([\s\S]*?)<\/a>/gi)].map(m => {
    const hrefMatch = m[1].match(/href=["']([^"']*)["']/i);
    const href = hrefMatch ? hrefMatch[1] : '';
    const text = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return { text: text.substring(0, 40), href };
  });

  const ctaLinks = links.filter(l => 
    l.text.toLowerCase().includes('trial') || 
    l.text.toLowerCase().includes('book') || 
    l.text.toLowerCase().includes('start') || 
    l.text.toLowerCase().includes('contact') || 
    l.text.toLowerCase().includes('explore') || 
    l.href.includes('trial') || 
    l.href.includes('#')
  );
  console.log(`CTA Links (${ctaLinks.length}):`, ctaLinks);
});
