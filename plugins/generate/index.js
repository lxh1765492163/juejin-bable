// const generator = require('@babel/generator').default;

const Printer = require('./Printer');

class Generator extends Printer {
    constructor(source, fileName) {
        super(source, fileName);
    }
    generate(node) {
        this[node.type](node);
        return {
            code: this.buf,
            map: this.sourceMapGenerator.toString()
        }
    }
}


function generate(node, source, fileName) {
    return new Generator(source, fileName).generate(node);
}


module.exports = generate;