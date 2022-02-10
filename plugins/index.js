const { transformSync } = require('./core');
const plugin2 = require('./myPlugins/a.js');
const plugin1 = require('./myPlugins/b.js');

const sourceCode = `const c = 1;
const f = '12345';
const d = 2;
const e = 4;
function add( a, b ) {
    const aaa = 123;
    const tmp = 1;return a + b;
}
add(c, d);
`;

function preset2(api, options) {
    if (options.target === 'chrome') {
        return [
            [
                plugin1, {
                    replaceName: 'ddddd'
                }
            ]
        ]
    } else {
        return [
            [
                plugin2
            ]
        ]
    }
}

const { code, map } = transformSync(sourceCode, {
    filename: 'aa.js',
    parserOpts: {
        plugins: ['literal'] // 这个主要是给sourceCode的表达式值约定类型
    },
    // plugins: [
    //     [plugin2]
    // ],
    presets: [
        [
            preset2,
            {
                target: 'chrome'
            }
        ]
    ]
})
console.log(code, 'code');