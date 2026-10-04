const fs = require('fs');

function inspectFile(file) {
  const code = fs.readFileSync(file, 'utf8');
  console.log(`\n=== File: ${file} (${code.length} bytes) ===`);
  
  // Search for path patterns or route patterns
  const routeMatches = code.match(/path:\s*["'][^"']+["']/g);
  if (routeMatches) {
    console.log('Routes in file:', [...new Set(routeMatches)]);
  }
  
  // Search for lazy imports or dynamic imports
  const dynamicImports = code.match(/import\s*\(\s*["'][^"']+["']\s*\)/g);
  if (dynamicImports) {
    console.log('Dynamic imports:', [...new Set(dynamicImports)]);
  }

  // Search for TanStack Router or React Router routes
  const createRoute = code.match(/createRoute\s*\(\s*{[^}]+}\s*\)/g);
  if (createRoute) {
    console.log('createRoute matches:', createRoute.length);
  }

  // Search for page titles or URLs
  const urls = code.match(/["'](\/(?:about|programs|personal-training|membership|gallery|reviews|visit)[^"']*)["']/g);
  if (urls) {
    console.log('Page URLs referenced:', [...new Set(urls)]);
  }
}

inspectFile('scraped/assets/index-BckL96hb.js');
inspectFile('scraped/assets/PublicBlocks-D9-2YQ0P.js');
