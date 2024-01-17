const menus: Menu.recordRaw = {
  title: '窗口功能',
  icon: 'i-ri:window-2-line',
  children: [
    {
      title: '打开新窗口',
      windowName: 'WindowExampleAdd',
    },
    {
      title: '关闭窗口',
      windowName: 'WindowExampleRemove',
    },
    {
      title: '带参窗口',
      windowName: 'WindowExampleParams',
    },
  ],
}

export default menus
