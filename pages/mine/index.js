const api = require('../../utils/api')
const util = require('../../utils/util')
Page({
  data: { isLoggedIn: false, userInfo: null, statusBarHeight: 0, stats: { publish: 5, sold: 2, bought: 3, favorite: 2 } },
  onLoad() { this.setData({ statusBarHeight: wx.getWindowInfo().statusBarHeight }) },
  onShow() {
    try { if (typeof this.getTabBar === 'function') this.getTabBar().setData({ selected: 3 }) } catch(e) {}
    const userInfo = util.getUserInfo()
    this.setData({ isLoggedIn: !!userInfo, userInfo })
  },
  goLogin() { wx.navigateTo({ url: '/pages/login/index' }) },
  goPage(e) {
    const { url } = e.currentTarget.dataset
    if (!url) { util.showToast('功能开发中'); return }
    if (!this.data.isLoggedIn) { wx.navigateTo({ url: '/pages/login/index' }); return }
    wx.navigateTo({ url })
  },
  logout() {
    wx.showModal({ title: '提示', content: '确定退出登录吗？', confirmColor: '#6C5CE7',
      success: (res) => { if (res.confirm) { util.clearUserInfo(); this.setData({ isLoggedIn: false, userInfo: null }) } }
    })
  }
})