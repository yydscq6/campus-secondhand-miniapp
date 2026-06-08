const api = require('../../utils/api')
const app = getApp()

Page({
  data: {
    swiperList: [
      { id: 1, image: '', title: '毕业季清仓', subtitle: '海量好物低价出' },
      { id: 2, image: '', title: '交易有保障', subtitle: '7天售后无忧' },
      { id: 3, image: '', title: '开学季特惠', subtitle: '教材文具专场' },
    ],
    categories: [],
    hotProducts: [],
    newProducts: [],
    currentSwiper: 0,
    statusBarHeight: 0,
    scrollTop: 0,
    showBackTop: false,
    keyword: '',
  },

  onLoad() {
    const sysInfo = wx.getWindowInfo()
    this.setData({ statusBarHeight: sysInfo.statusBarHeight })
    this.loadData()
  },

  onShow() {
    try { if (typeof this.getTabBar === 'function') { this.getTabBar().setData({ selected: 0 }) } } catch(e) {}
  },

  async loadData() {
    wx.showNavigationBarLoading()
    const [categories, hotProducts, newProducts] = await Promise.all([
      api.getCategories(),
      api.getHotProducts(),
      api.getNewProducts()
    ])
    this.setData({ categories, hotProducts, newProducts })
    wx.hideNavigationBarLoading()
  },

  onPullDownRefresh() {
    this.loadData().then(() => wx.stopPullDownRefresh())
  },

  onSwiperChange(e) {
    this.setData({ currentSwiper: e.detail.current })
  },

  onPageScroll(e) {
    this.setData({ showBackTop: e.scrollTop > 600, scrollTop: e.scrollTop })
  },

  goSearch() {
    wx.navigateTo({ url: '/pages/index/index?focus=true' })
  },

  onSearchInput(e) {
    this.setData({ keyword: e.detail.value })
  },

  onSearchConfirm() {
    const { keyword } = this.data
    if (!keyword.trim()) return
    wx.navigateTo({ url: `/pages/category/index?keyword=${encodeURIComponent(keyword)}` })
  },

  goCategory(e) {
    const { name } = e.currentTarget.dataset
    wx.switchTab({ url: '/pages/category/index' })
    setTimeout(() => {
      const pages = getCurrentPages()
      const catePage = pages[pages.length - 1]
      if (catePage && catePage.filterByCategory) catePage.filterByCategory(name)
    }, 300)
  },

  goDetail(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/detail/index?id=${id}` })
  },

  goMessages() {
    wx.navigateTo({ url: '/pages/messages/index' })
  },

  backTop() {
    wx.pageScrollTo({ scrollTop: 0, duration: 300 })
  },

  onShareAppMessage() {
    return { title: '校易淘 - 校园二手交易平台', path: '/pages/index/index' }
  }
})
