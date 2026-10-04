const fs = require('fs');

const indexCode = fs.readFileSync('scraped/assets/index-BckL96hb.js', 'utf8');

// Search for route definitions
// In TanStack Router, routes are defined with createRoute({ getParentRoute, path: ... }) or Route({ path: ... })
const regex = /(?:createRoute|createFileRoute|path:\s*[`'"][^`'"]+[`'"])/g;
let match;
while ((match = regex.exec(indexCode)) !== null) {
  console.log('Match at', match.index, ':', indexCode.slice(Math.max(0, match.index - 50), match.index + 100));
}
