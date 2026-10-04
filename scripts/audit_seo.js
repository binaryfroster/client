import fs from 'fs';

const pages = fs.readdirSync('.').filter(f => f.endsWith('.html'));

console.log(`Auditing SEO across ${pages.length} pages:\n`);

for (const p of pages) {
  const content = fs.readFileSync(p, 'utf8');
  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  const descMatch = content.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  const canonMatch = content.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const hasJsonLd = content.includes('application/ld+json');
  const hasGeoMeta = content.includes('geo.position') || content.includes('ICBM') || content.includes('geo.region');
  
  console.log(`[${p}]`);
  console.log(`  Title: ${titleMatch ? titleMatch[1] : 'MISSING'}`);
  console.log(`  Desc: ${descMatch ? descMatch[1] : 'MISSING'}`);
  console.log(`  Canonical: ${canonMatch ? canonMatch[1] : 'MISSING'}`);
  console.log(`  JSON-LD Schema: ${hasJsonLd ? 'YES' : 'NO'}`);
  console.log(`  Geo Meta Tags: ${hasGeoMeta ? 'YES' : 'NO'}`);
}
