const { transformFileSync } = require('@babel/core');
const insertParametersPlugin = require('./addConsole');
const path = require('path');

const { code } = transformFileSync(path.join(__dirname, './souces.js'), {
    plugins: [insertParametersPlugin],
    parserOpts: {
        sourceType: 'unambiguous',
        plugins: ['jsx']
    }
});

console.log(code)