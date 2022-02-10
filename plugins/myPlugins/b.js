function plugin1(api, options) {
    return {
        visitor: {
            Identifier: {
                exit(path) {  // 如变量名，函数名，属性名，都归为标识符。相应的接口是这样的：
                    if (path.findParent(p => p.isCallExpression())) {
                        console.log('exit')
                        path.replaceWith(api.template.expression(options.replaceName));
                    }

                }
            }
        }
    }
}

module.exports = plugin1;