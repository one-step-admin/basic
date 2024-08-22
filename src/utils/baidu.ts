if (!import.meta.env.DEV) {
  const _hmt = []
  _hmt.push(['_requirePlugin', 'UrlChangeTracker', {
    shouldTrackUrlChange(newPath: any, oldPath: any) {
      return newPath && oldPath
    },
  }]);
  (function () {
    const hm = document.createElement('script')
    hm.src = 'https://hm.baidu.com/hm.js?d023f22d3c7fd011aed5f4499aebfabe'
    const s = document.getElementsByTagName('script')[0]
    s.parentNode?.insertBefore(hm, s)
  })()
}

export {}
