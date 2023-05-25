export default [
  {
    url: '/mock/app/menu/list',
    method: 'get',
    response: () => {
      return {
        error: '',
        status: 1,
        data: [
          {
            title: '演示',
            icon: 'sidebar-default',
            children: [
              {
                title: '窗口功能',
                icon: 'sidebar-window',
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
                    title: '窗口最大化',
                    windowName: 'WindowExampleMaximize',
                  },
                  {
                    title: '无标题窗口',
                    windowName: 'WindowExampleNoTitle',
                    noTitle: true,
                  },
                  {
                    title: '带参窗口',
                    windowName: 'WindowExampleParams',
                  },
                ],
              },
            ],
          },
        ],
      }
    },
  },
]
