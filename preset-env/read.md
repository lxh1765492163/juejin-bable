### 指定浏览器版本自动引入垫片

<img src="./c.png"/>



### preset-env的问题
比如使用 preset-env 的时候是全局引入的：polyfill 污染全局环境
<img src="./b.png"/>


解决全局污染则是将 polyfill 作为模块化引入（@babel/plugin-transform-runtime 它可以把直接注入全局的方式改成模块化引入。）
