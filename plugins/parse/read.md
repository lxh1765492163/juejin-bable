### Parser 的历史
babel 的 parser 是基于 acorn 扩展而来的,
也不是所有的 js parser 都是 estree 标准的，比如 terser、typescript 等都有自己的 AST 标准



### babel parser 对 estree AST 的扩展
<blod>注意目前案例使用的还是acorn.parse做的ast解析,   不过当前案例中parseLiteral 方法将Literal 类型的字符串 ， 数字进行了类型转换</blod>



babel 基于 acorn 插件对 estree AST 做了如下扩展， 
1. 把 Literal 替换成了 StringLiteral、NumericLiteral、 BigIntLiteral、 BooleanLiteral、 NullLiteral、 RegExpLiteral。
```
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
```

2. 把 Property 替换成了 ObjectProperty 和 ObjectMethod
3. 把 MethodDefinition 替换成了 ClassMethod
4. Program 和 BlockStatement 支持了 directives 属性，也就是 'use strict' 等指令的解析，对应的 ast 是 Directive 和 DirectiveLiteral
5. ChainExpression 替换为了 ObjectMemberExpression 和 OptionalCallExpression
6. ImportExpression 替换为了 CallExpression 并且 callee 属性设置为 Import