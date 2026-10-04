import fs from 'fs';

const cssPath = 'assets/styles-C7PxWAHs.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Replace any mismatched red/rose accents with gym brand neon lime #a8ff00
css = css.replace(/accent-color:\s*#e11d48/g, 'accent-color: #a8ff00');
css = css.replace(/color:\s*#f43f5e/g, 'color: #a8ff00');
css = css.replace(/border-left:\s*4px solid #e11d48/g, 'border-left: 4px solid #a8ff00');
css = css.replace(/rgba\(225,\s*29,\s*72,\s*0\.08\)/g, 'rgba(168, 255, 0, 0.08)');
css = css.replace(/color:\s*#fca5a5/g, 'color: #ffffff');

fs.writeFileSync(cssPath, css, 'utf8');
console.log('✅ assets/styles-C7PxWAHs.css accents updated to brand lime #a8ff00');
