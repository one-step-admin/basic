module.exports = {
    description: '创建窗口',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: '请输入窗口组件名称',
            validate: v => {
                if (!v || v.trim === '') {
                    return '窗口组件名称不能为空'
                } else {
                    return true
                }
            }
        }
    ],
    actions: () => {
        const actions = [
            {
                type: 'add',
                path: 'src/views/windows/{{properCase name}}/index.vue',
                templateFile: 'plop-templates/page/index.hbs'
            }
        ]
        return actions
    }
}
