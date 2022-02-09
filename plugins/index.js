// const { parse } = require('./parse');
// const generate = require('./generate');

// const sourceCode = `const c = 1;
// const d = 2;
// const e = 4;
// function add( a, b ) {
//     const tmp = 1;return a + b;
// }
// add(c, d);
// `;



// const ast = parse(sourceCode, {
//     sourceType: 'module',
//     plugins: ['literal']
// });


// const { code, map } = generate(ast, sourceCode, 'aa.js')
// console.log(code, 'code');


const { transformSync } = require('./core');

const sourceCode = `const c = 1;
const d = 2;
const e = 4;
function add( a, b ) {
    const tmp = 1;return a + b;
}
add(c, d);
`;

const { code, map } = transformSync(sourceCode, { filename: 'aa.js', plugins: ['literal'] })
console.log(code, 'code');