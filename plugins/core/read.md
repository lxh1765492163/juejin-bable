### transformSync 流程讲解
1. 源码先解析为ast， 解析之前会继承parserOpts的插件， 使源码转换ast过程中就使用插件；

2. 调用plugins注册ast对应的类型处理方法。
3. 调用presets, 注意这里会将数组倒序下， 注册ast对应的类型处理方法。（项目的plugins）


4. 调用traverse 进行节点的遍历， 遍历节点的时候会调用ast节点类型注册的方法（plugins & presets注册ast对应的类型处理方法）。


5. 利用generate 将ast转字符串
### plugin & preset & parserOpts 的先后顺序



<blod>注意： 案例中体现不出presets 与 plugin插件先后注册的不同点</blod>
babel 官网提示， 会按照如下顺序处理plugin和 preset的插件先后：
插件的调用顺序：plugin 从前到后，preset 从后到前的顺序遍历插件。

