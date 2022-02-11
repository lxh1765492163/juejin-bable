const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;



const sourceCode = `
const a = 1;
function c(){
    return a
}
console.log(1);`;

const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous'
});

console.log(ast.program.body)
traverse(ast, {
    CallExpression(path, state) {

    }
});

const { code, map } = generate(ast);
console.log(code);