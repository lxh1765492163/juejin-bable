const acorn = require("acorn");

const syntaxPlugins = {
    'literal': require('./plugins/literal')
}

const defaultOptions = {
    plugins: []
}

function parse(code, options) {
    const resolvedOptions = Object.assign({}, defaultOptions, options);

    // 利用三方库acorn 去解析code为ast， 在解析字面量的时候重新定义了字面量的格式
    const newParser = resolvedOptions.plugins.reduce((Parser, pluginName) => {
        let plugin = syntaxPlugins[pluginName];
        return plugin ? Parser.extend(plugin) : Parser;
    }, acorn.Parser);

    return newParser.parse(code, {
        ...options,
        locations: true
    });
}

module.exports = {
    parse
}