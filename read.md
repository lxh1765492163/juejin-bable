### babel 是转译器
编译的定义：
从一种编程语言转成另一种编程语言。主要指的是高级语言到低级语言。

转译器的定义：
高级语言到高级语言的转换工具



### babel 的编译流程
我们知道，babel 的主要编译流程是 parse、transform、generate。

parse 是把源码转成 AST
transform 是对 AST 做增删改
generate 是打印 AST 成目标代码并生成 sourcemap



babel 7 把这些功能的实现放到了不同的包里面：
@babel/parser 解析源码成 AST，对应 parse 阶段
@babel/traverse 遍历 AST 并调用 visitor 函数，对应 transform 阶段
@babel/generate 打印 AST，生成目标代码和 sorucemap，对应 generate 阶段


其中，遍历过程中需要创建 AST，会用到：
@babel/types 创建、判断 AST
@babel/template 根据模块批量创建 AST

上面是每一个阶段的功能， babel 整体功能的入口是在：

@babel/core 解析配置、应用 plugin、preset，整体整体编译流程
插件和插件之间有一些公共函数，这些都是在：

@babel/helpers 用于转换 es next 代码需要的通过模板创建的 AST，比如 _typeof、_defineProperties 等
@babel/helper-xxx 其他的插件之间共享的用于操作 AST 的公共函数
当然，除了编译期转换的时候会有公共函数以外，运行时也有，这部分是放在：

@babel/runtime 主要是包含 corejs、helpers、regenerator 这 3 部分：
helper： helper 函数的运行时版本（不是通过 AST 注入了，而是运行时引入代码）
corejs： es next 的 api 的实现，corejs 2 只支持静态方法，corejs 3 还支持实例方法
regenerator：async await 的实现，由 facebook 维护
（babel 做语法转换是自己实现的 helper，但是做 polyfill 都不是自己实现的，而是借助了第三方的 corejs、regenerator）

@babel/cli babel 的命令行工具，支持通过 glob 字符串来编译多个文件


### ast
AST 也是有标准的 ， JS parser 的 AST 大多是 estree 标准， 可以访问 https://astexplorer.net/ 查看源码相应的ast语法
源码中的字面量、标识符、表达式、语句、模块语法、class 语法都有各自的 AST语法。

ast语法又有一些公用的属性
type： AST 节点的类型
start、end、loc：start 和 end 代表该节点对应的源码字符串的开始和结束下标，不区分行列。而 loc 属性是一个对象，有 line 和 column 属性分别记录开始和结束行列号。
leadingComments、innerComments、trailingComments： 表示开始的注释、中间的注释、结尾的注释，因为每个 AST 节点中都可能存在注释，而且可能在开始、中间、结束这三种位置，通过这三个属性来记录和 Comment 的关联。
extra：记录一些额外的信息，用于处理一些特殊情况。比如 StringLiteral 修改 value 只是值的修改，而修改 extra.raw 则可以连同单双引号一起修改。



### babel 的 api 有哪些
1. parse 阶段有@babel/parser，功能是把源码转成 AST
2. transform 阶段有 @babel/traverse，可以遍历 AST，并调用 visitor 函数修改 AST，修改 AST 自然涉及到 AST 的判断、创建、修改等，这时候就需要 @babel/types
3. @babel/template 批量创建ast
4. generate 阶段会把 AST 打印为目标代码字符串，同时生成 sourcemap，需要 
@babel/generate 包
5. 中途遇到错误想打印代码位置的时候，使用 @babel/code-frame 包
6. @babel/core 统一封装了parse， transform，generate




### 为什么需要babel-cli 
Babel 附带一个内置的 CLI，可用于从命令行编译文件，
主要的 Babel cli 脚本命令，babel.js


### babel-node
会在运行之前编译 ES6 代码




### debugger 模式
所以调试是分为客户端和服务端的， node运行的代码就相当于是一个服务端， 不管是用vscode还是devtools调试都属于客户端调试了
启动 node.js 的调试模式，需要加上 --inspect 或者 --inspect-brk（在首行断住）参数，之后会启动一个 websocket server，等待客户端链接。
vsocde 的 debug 配置分为 launch 和 attach

<b>客户端和服务端是通过 v8 debug protocol 来通信的。</b>


### preset 与 plugin 区别
plugin：用户===》plugin
preset：用户===》preset====>plugin

preset 就是对 babel 配置的一层封装（用户可以通过 preset 来批量引入 plugin 并进行一些配置）


<blod>格式一样</blod>
也是可以是一个对象，或者是一个函数，函数的参数也是一样的 api 和 options
区别只是 preset 返回的是配置对象，包含 plugins、presets 等配置
plugin 返回的格式请查看myPlugins/read.md


<blod>插件与preset 处理的顺序不一样</blod>
先应用 plugin，再应用 preset
plugin 从前到后，preset 从后到前

plugin 和 preset 还有名字的规范，符合规范的名字可以简写，这样 babel 会自动补充上 babel plugin 或 babel preset。
@babel 开头的包会自动添加 plugin，比如 @babel/aa 会变成 @babel/plugin-aa
（preset也是一样）



