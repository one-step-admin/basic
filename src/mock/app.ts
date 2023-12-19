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
