// make_wordmap.js
// Usage: node make_wordmap.js words.txt wordmap.js

const fs = require('fs');

if (process.argv.length < 4) {
  console.error('Usage: node make_wordmap.js input.txt output.js');
  process.exit(1);
}

const inputFile = process.argv[2];
const outputFile = process.argv[3];

function signature(word) {
  return word.split('').sort().join('');
}

// Read all words (assumes one word per line)
const text = fs.readFileSync(inputFile, 'utf8');
const lines = text.split(/\r?\n/);
const map = {};

for (let line of lines) {
  const word = line.trim().toUpperCase();
  if (word.length !== 7) continue; // enforce 7‑letter words only
  const sig = signature(word);
  if (!map[sig]) map[sig] = [];
  map[sig].push(word);
}

// Write JS file
const js = 'window.WORDMAP = ' + JSON.stringify(map, null, 2) + ';\n';
fs.writeFileSync(outputFile, js, 'utf8');

console.log('Word map written to', outputFile);

