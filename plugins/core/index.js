const { parse } = require('../parse');
const generate = require('../generate');

const transformSync = (sourceCode, options) => {
    const ast = parse(sourceCode, options);
    return generate(ast, sourceCode, options.filename)
}

module.exports = {
    transformSync
}