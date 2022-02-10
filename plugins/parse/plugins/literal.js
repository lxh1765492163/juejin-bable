// 给节点设置节点类型
// 此类作为acorn.Parser.extend入参


module.exports = function (Parser) {
    return class extends Parser {
        // 重写字面量的一个节点解析类型
        parseLiteral(...args) {
            const node = super.parseLiteral(...args);
            switch (typeof node.value) {
                case 'number':
                    node.type = 'NumericLiteral';
                    break;
                case 'string':
                    node.type = 'StringLiteral';
                    break;
            }
            return node;
        }
    }
}