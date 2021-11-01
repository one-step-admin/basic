import WindowExample from './modules/window.example'
import ComponentBasicExample from './modules/component.basic.example'
import ComponentExtendExample from './modules/component.extend.example'
import PermissionExample from './modules/permission.example'
import MockExample from './modules/mock.example'
import ExternalLinkExample from './modules/external.link.example'

const menu = [
    {
        title: '演示',
        icon: 'sidebar-default',
        children: [
            WindowExample,
            ComponentBasicExample,
            ComponentExtendExample,
            PermissionExample,
            MockExample,
            ExternalLinkExample
        ]
    }
]

export default menu
