module.exports = {
    description: '创建全局组件',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: '请输入组件名称',
            validate: v => {
                if (!v || v.trim === '') {
                    return '组件名称不能为空'
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
                path: 'src/components/{{properCase name}}/index.vue',
                templateFile: 'plop-templates/component/index.hbs'
            }
        ]
        return actions
    }
}
