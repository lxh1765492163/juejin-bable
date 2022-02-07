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


