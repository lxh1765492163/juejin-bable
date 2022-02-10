### 插件格式
babel 支持 transform 插件，形式是函数返回一个对象，对象有 visitor 属性。
第一个参数可以拿到 types、template 等常用包的 api，不需要单独引入这些包



### visitor对象格式
visitor 对象的 value 是对象或者函数：

如果 value 为函数，那么就相当于是 enter 时调用的函数。
如果 value 为对象，则可以明确指定 enter 或者 exit 时的处理函数。
函数会接收两个参数 path 和 state。

visitor: {
    Identifier (path, state) {},
    StringLiteral: {
        enter (path, state) {},
        exit (path, state) {}
    }
}

<Bold>注意visitor对应的字面量格式， 决定了在便利ast时候的调用时机</Bold>


### enter | exit
enter 时调用是在遍历当前节点的子节点前调用，
exit 时调用是遍历完当前节点的子节点后调用。