import fs from 'fs';

['index.html', 'programs.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const regex = /href="[^"]*membership[^"]*"/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    console.log(f, 'match:', match[0]);
    console.log('Context:', content.slice(Math.max(0, match.index - 50), match.index + 80));
  }
});
