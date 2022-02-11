### traverse
遍历节点， 对节点使用plugins | preset 注册到visitor的方法。
babel 会递归遍历 AST，遍历过程中处理到不同的 AST 会调用不同的 visitor 函数来实现 transform。这是 visitor 模式的应用。