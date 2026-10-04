import fs from 'fs';

const html = fs.readFileSync('programs.html', 'utf8');

console.log('has id="regular-training":', html.includes('id="regular-training"'));
console.log('has id="personal-training":', html.includes('id="personal-training"'));
console.log('has id="diet-plan":', html.includes('id="diet-plan"'));
console.log('has id="plan-finder":', html.includes('id="plan-finder"'));
console.log('has id="program-selector":', html.includes('id="program-selector"'));
