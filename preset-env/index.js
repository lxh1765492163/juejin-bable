const sourceCode = `
  import "core-js";
  new Array(5).fill('111');
`;
const path = require('path')
const babel = require('@babel/core');
const { code, map } = babel.transformSync(sourceCode, {
    filename: 'index2.js',
    targets: {
        browsers: 'Chrome 45',
        // browsers: 'Chrome 44', //该版本不支持fill 可以看到有引入垫片
    },
    presets: [
        ['@babel/env', {
            debug: true,
            useBuiltIns: 'usage',
            corejs: 3
        }]
    ]
});

console.log(code, '222222222222222')