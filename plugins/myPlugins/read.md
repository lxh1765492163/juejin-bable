### 插件格式
babel plugin 有两种格式：

第一种是一个函数返回一个对象的格式，对象里有 visitor、pre、post、inherits、manipulateOptions 等属性。
```
export default function(api, options, dirname) {
  return {
    inherits: parentPlugin,
    manipulateOptions(options, parserOptions) {
        options.xxx = '';
    },
    pre(file) {
      this.cache = new Map();
    },
    visitor: {
      StringLiteral(path, state) {
        this.cache.set(path.node.value, 1);
      }
    },
    post(file) {
      console.log(this.cache);
    }
  };
} 

首先，插件函数有 3 个参数，api、options、dirname。

options 就是外面传入的参数
dirname 是目录名（不常用）
api 里包含了各种 babel 的 api，比如 types、template 等，这些包就不用在插件里单独单独引入了，直接取来用就行。
返回的对象有 inherits、manipulateOptions、pre、visitor、post 等属性。

inherits 指定继承某个插件，和当前插件的 options 合并，通过 Object.assign 的方式。
visitor 指定 traverse 时调用的函数。
pre 和 post 分别在遍历前后调用，可以做一些插件调用前后的逻辑，比如可以往 file（表示文件的对象，在插件里面通过 state.file 拿到）中放一些东西，在遍历的过程中取出来。
manipulateOptions 用于修改 options，是在插件里面修改配置的方式，比如 syntaxt plugin一般都会修改 parser options：

```


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