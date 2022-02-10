const { parse } = require('../parse');
const generate = require('../generate');
const template = require('../template');
const traverse = require('../traverse');

const transformSync = (sourceCode, options) => {
    //编译成ast
    // 注意options.parserOpts的piugins 会在code解析为ast的时候调用
    const ast = parse(sourceCode, options.parserOpts); // 解析时候修改ast节点的类型

    const pluginApi = {
        template
    }


    //搜集所有的节点类型的处理方法
    const visitors = {};

    // 调用插件， 为ast的节点类型注册节点类型的处理方法
    options.plugins && options.plugins.forEach(([plugin, options]) => {
        const res = plugin(pluginApi, options);
        Object.assign(visitors, res.visitor);
    });


    // 调用预设， 将presets的plugins 中的插件注册到visitors
    options.presets && options.presets.reverse().forEach(([preset, options]) => {
        const plugins = preset(pluginApi, options);
        plugins.forEach(([plugin, options]) => {
            const res = plugin(pluginApi, options);
            Object.assign(visitors, res.visitor);
        })
    })

    // 遍历ast， 
    traverse(ast, visitors);

    // ast 转code
    return generate(ast, sourceCode, options.filename)
}

module.exports = {
    transformSync
}