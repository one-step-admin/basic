const path = require('path')
const fs = require('fs')

function getFolder(path) {
    let components = []
    const files = fs.readdirSync(path)
    files.forEach(function(item) {
        let stat = fs.lstatSync(path + '/' + item)
        if (stat.isDirectory() === true) {
            components.push(path + '/' + item)
        }
    })
    return components
}

module.exports = {
    description: '创建窗口 Mock',
    prompts: [
        {
            type: 'list',
            name: 'path',
            message: '请选择窗口目录',
            choices: getFolder('src/views/windows')
        }
    ],
    actions: data => {
        let moduleName = path.relative('src/views/windows', data.path)
        const actions = []
        actions.push({
            type: 'add',
            path: 'src/mock/{{kebabCase moduleName}}.js',
            templateFile: 'plop-templates/mock/mock.hbs',
            data: {
                moduleName
            }
        })
        return actions
    }
}
