const { SourceMapGenerator } = require('source-map');

// 每个ast的node节点需要有对应的类型解析模式、
// 自定义了节点类型的解析模式
class Printer {
    constructor(source, fileName) {
        this.buf = '';
        this.sourceMapGenerator = new SourceMapGenerator({
            file: fileName + ".map.json",
        });
        this.fileName = fileName;
        this.sourceMapGenerator.setSourceContent(fileName, source);
        this.printLine = 1;
        this.printColumn = 0;
    }

    addMapping(node) {
        if (node.loc) {
            this.sourceMapGenerator.addMapping({
                generated: {
                    line: this.printLine,
                    column: this.printColumn
                },
                source: this.fileName,
                original: node.loc && node.loc.start
            })
        }
    }

    space() {
        this.buf += ' ';
        this.printColumn++;
    }

    nextLine() {
        this.buf += '\n';
        this.printLine++;
        this.printColumn = 0;
    }

    Program(node) {
        this.addMapping(node);
        node.body.forEach(item => {
            this[item.type](item) + ';';
            this.printColumn++;
            this.nextLine();
        });
    }

    VariableDeclaration(node) {
        if (!node.declarations.length) {
            return;
        }
        this.addMapping(node);

        this.buf += node.kind;
        this.space();
        node.declarations.forEach((declaration, index) => {
            if (index != 0) {
                this.buf += ',';
                this.printColumn++;
            }
            this[declaration.type](declaration);
        });
        this.buf += ';';
        this.printColumn++;

    }
    VariableDeclarator(node) {
        this.addMapping(node);
        this[node.id.type](node.id);
        this.buf += '=';
        this.printColumn++;
        console.log(node.init.type, '这是节点的类型， 每个节点对应的类型都有相应的处理方式')
        this[node.init.type](node.init);
    }
    Identifier(node) {
        this.addMapping(node);
        this.buf += node.name;
    }
    FunctionDeclaration(node) {
        this.addMapping(node);

        this.buf += 'function ';
        this.buf += node.id.name;
        this.buf += '(';
        this.buf += node.params.map(item => item.name).join(',');
        this.buf += '){';
        this.nextLine();
        this[node.body.type](node.body);
        this.buf += '}';
        this.nextLine();
    }
    CallExpression(node) {
        this.addMapping(node);

        this[node.callee.type](node.callee);
        this.buf += '(';
        node.arguments.forEach((item, index) => {
            if (index > 0) this.buf += ', ';
            this[item.type](item);
        })
        this.buf += ')';

    }
    ExpressionStatement(node) {
        this.addMapping(node);

        this[node.expression.type](node.expression);

    }
    ReturnStatement(node) {
        this.addMapping(node);

        this.buf += 'return ';
        this[node.argument.type](node.argument);

    }
    BinaryExpression(node) {
        this.addMapping(node);

        this[node.left.type](node.left);
        this.buf += node.operator;
        this[node.right.type](node.right);

    }
    BlockStatement(node) {
        this.addMapping(node);

        node.body.forEach(item => {
            this.buf += '    ';
            this.printColumn += 4;
            this[item.type](item);
            this.nextLine();
        });

    }
    // 节点为数字
    NumericLiteral(node) {
        this.addMapping(node);
        this.buf += node.value;

    }
    // 节点为字符串
    StringLiteral(node) {
        this.addMapping(node);
        this.buf += '"' + node.value + '"';
    }
}

//结合sourceCode  在 https://astexplorer.net/查看对应的规则

module.exports = Printer