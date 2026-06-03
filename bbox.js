const fs = require('fs');
const svg = fs.readFileSync('src/assets/logo.svg', 'utf8');

const regex = /(-?\d+\.?\d*)/g;
let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

const pathData = [...svg.matchAll(/d="([^"]+)"/g)].map(m => m[1]).join(' ');

// Very naive parser: just assume alternating X and Y coordinates (mostly true for absolute paths)
// Actually, it's safer to just collect all absolute values and guess.
// A better way: just get min/max of all numbers that are > 1000.
const numbers = [...pathData.matchAll(regex)].map(m => Number(m[1]));

const xVals = [];
const yVals = [];

// Let's just find the minimum and maximum of all numbers
// Since it's a logo in the top center, X is probably around 8000-12000, Y is around 5000-7000
for (let n of numbers) {
    if (n > 8000 && n < 13000) {
        xVals.push(n);
    } else if (n > 4000 && n < 8000) {
        yVals.push(n);
    }
}

const xMin = Math.min(...xVals);
const xMax = Math.max(...xVals);
const yMin = Math.min(...yVals);
const yMax = Math.max(...yVals);

console.log(`viewBox="${xMin} ${yMin} ${xMax - xMin} ${yMax - yMin}"`);
