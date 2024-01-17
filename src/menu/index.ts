import WindowExample from './modules/window.example'
import ComponentExample from './modules/component.example'
import IconExample from './modules/icon.example'
import PermissionExample from './modules/permission.example'
import MockExample from './modules/mock.example'
import ExternalLinkExample from './modules/external.link.example'
import EcologyExample from './modules/ecology.example'

const menu = [
  {
    title: '演示',
    icon: 'i-uim:box',
    children: [
      WindowExample,
      ComponentExample,
      IconExample,
      PermissionExample,
      MockExample,
      ExternalLinkExample,
    ],
  },
  {
    title: '生态',
    icon: 'i-icon-park-outline:circular-connection',
    children: [
      ...EcologyExample,
    ],
  },
]

export default menu
