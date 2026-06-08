App({
  onLaunch() {
    if (wx.cloud) {
      try {
        wx.cloud.init({
          env: 'campus-secondhand-prod',
          traceUser: true
        })
      } catch(e) {
        console.log('云开发初始化跳过（本地演示模式）')
      }
    }
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.globalData.isLoggedIn = true
      this.globalData.userInfo = userInfo
    }
  },
  globalData: {
    userInfo: null,
    isLoggedIn: false,
    themeColor: '#6C5CE7'
  }
})