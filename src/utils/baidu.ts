if (!import.meta.env.DEV) {
  const _hmt = []
  _hmt.push(['_requirePlugin', 'UrlChangeTracker', {
    shouldTrackUrlChange(newPath: any, oldPath: any) {
      return newPath && oldPath
    },
  }]);
  (function () {
    const hm = document.createElement('script')
    hm.src = 'https://hm.baidu.com/hm.js?506cda33993a1a0af70a34ad844b9663'
    const s = document.getElementsByTagName('script')[0]
    s.parentNode?.insertBefore(hm, s)
  })()
}

export {}
