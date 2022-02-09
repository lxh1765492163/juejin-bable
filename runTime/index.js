const sourceCode = `
  import "core-js";
  new Array(5).fill('111');
`;
const path = require('path')
const babel = require('@babel/core');

const { code, map } = babel.transformSync(sourceCode, {
    filename: './index.js',
    targets: {
        browsers: 'Chrome 45',
    },
    plugins: [
        ['@babel/transform-runtime', { corejs: 3 }]
    ],
    presets: [
        ['@babel/env', {
            debug: true,
            useBuiltIns: 'usage',
            corejs: 3
        }]
    ]
});

console.log(code, '222222222222222')