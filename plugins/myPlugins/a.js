//删除未使用的变量
function plugin2(api, options) {
    return {
        visitor: {
            Program(path) { //将全局的声明且未使用的变量删除掉
                Object.entries(path.scope.bindings).forEach(([id, binding]) => {
                    if (!binding.referenced) {
                        binding.path.remove();
                    }
                });
            },
            FunctionDeclaration(path) { //将函数内部的声明且未使用的变量删除掉
                Object.entries(path.scope.bindings).forEach(([id, binding]) => {
                    if (!binding.referenced) {
                        binding.path.remove();
                    }
                });
            },

        }
    }
}

module.exports = plugin2;