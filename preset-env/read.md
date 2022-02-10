### preset-env优点
是否用 polyfill 要看目标环境的，也就是 targets， targets根据版本查询出支持的， 将不支持的都做垫片， 问题就是垫片会造成环境污染。

### 指定浏览器版本自动引入垫片
<img src="./c.png"/>



### preset-env的弊端
比如使用 preset-env 的时候是全局引入的：polyfill 污染全局环境
<img src="./b.png"/>

解决全局污染则是将 polyfill 作为模块化引入（@babel/plugin-transform-runtime 它可以把直接注入全局的方式改成模块化引入。）



### @babel/preset-env
只转换目标环境确定不支持的特性，这就是 @babel/preset-env 做的事情。（以前是全部都转换成es5）

compat-table 提供了每个特性在不同环境中的支持版本
electron-to-chromium 这个项目，它维护了 electron 版本到 chromium 版本的映射关系。


### browserslist 
browserslist 使用 Can I Use 网站的数据来查询浏览器版本范围
.browserslistrc 文件 已经package.json 中browserslist字段规定