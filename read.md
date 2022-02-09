### 为什么需要babel-cli 
Babel 附带一个内置的 CLI，可用于从命令行编译文件，
主要的 Babel cli 脚本命令，babel.js


### babel-node
会在运行之前编译 ES6 代码




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

### generate
对不同的 AST 节点做不同的处理，在这个过程中把抽象语法树中省略掉的一些分隔符重新加回来。


### plugin
babel 的 plugin 是在配置文件里面通过 plugins 选项配置，值为字符串或者数组。
如果需要传参就用数组格式，第二个元素为参数。

### plugin & preset 
babel 会按照如下顺序处理插件和 preset：

先应用 plugin，再应用 preset
plugin 从前到后，preset 从后到前


### browserslist 
browserslist 使用 Can I Use 网站的数据来查询浏览器版本范围
.browserslistrc 文件 已经package.json 中browserslist字段规定


### @babel/preset-env
只转换目标环境确定不支持的特性，这就是 @babel/preset-env 做的事情。（以前是全部都转换成es5）

compat-table 提供了每个特性在不同环境中的支持版本
electron-to-chromium 这个项目，它维护了 electron 版本到 chromium 版本的映射关系。



### debugger 模式
所以调试是分为客户端和服务端的， node运行的代码就相当于是一个服务端， 不管是用vscode还是devtools调试都属于客户端调试了
启动 node.js 的调试模式，需要加上 --inspect 或者 --inspect-brk（在首行断住）参数，之后会启动一个 websocket server，等待客户端链接。
vsocde 的 debug 配置分为 launch 和 attach

<b>客户端和服务端是通过 v8 debug protocol 来通信的。</b>





