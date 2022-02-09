const babel = require('@babel/core');


const sourceCode = `const c = 1;
const d = 2;
const e = 4;
function add( a, b ) {
    const tmp = 1;return a + b;
}
add(c, d);
`;


function plugin1(api, options) {
    return {
        visitor: {
            Program(path) {
                // 删除未被引用的变量
                Object.entries(path.scope.bindings).forEach(([id, binding]) => {
                    if (!binding.referenced) {
                        binding.path.remove();
                    }
                });
            }
        }
    }
}
const { code, map } = babel.transformSync(sourceCode, {
    filename: './index.js',
    plugins: [
        [plugin1]
    ],
    presets: []
});

console.log(code, 'core 封装得到的code')