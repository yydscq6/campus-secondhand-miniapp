const api = require('../../utils/api')
const util = require('../../utils/util')
Page({
  data: { product: null, reviews: [], isFavorite: false, statusBarHeight: 0, showBargain: false, bargainPrice: '' },
  onLoad(opts) {
    this.setData({ statusBarHeight: wx.getWindowInfo().statusBarHeight })
    if (opts.id) this.loadDetail(opts.id)
  },
  async loadDetail(id) {
    const product = await api.getProductById(Number(id))
    const reviews = await api.getProductReviews(Number(id))
    this.setData({ product, reviews, isFavorite: product ? product.isFavorite : false })
  },
  async toggleFavorite() {
    if (!util.isLoggedIn()) { wx.navigateTo({ url: '/pages/login/index' }); return }
    const res = await api.toggleFavorite(this.data.product.id)
    this.setData({ isFavorite: res.isFavorite })
    util.showToast(res.isFavorite ? '已收藏' : '已取消收藏')
  },
  goBuy() {
    if (!util.isLoggedIn()) { wx.navigateTo({ url: '/pages/login/index' }); return }
    wx.showModal({
      title: '确认购买',
      content: '确定要购买「' + this.data.product.name + '」吗？价格：¥' + this.data.product.price,
      confirmColor: '#6C5CE7',
      success: async (res) => {
        if (res.confirm) {
          await api.createOrder(this.data.product.id)
          wx.showToast({ title: '下单成功！', icon: 'success' })
          setTimeout(() => wx.navigateTo({ url: '/pages/orders/index' }), 1500)
        }
      }
    })
  },
  showBargainPanel() { this.setData({ showBargain: true }) },
  hideBargain() { this.setData({ showBargain: false, bargainPrice: '' }) },
  onBargainInput(e) { this.setData({ bargainPrice: e.detail.value }) },
  async sendBargain() {
    if (!this.data.bargainPrice || isNaN(this.data.bargainPrice)) { util.showToast('请输入有效价格'); return }
    await api.sendBargain({ productId: this.data.product.id, price: this.data.bargainPrice })
    util.showToast('议价请求已发送')
    this.hideBargain()
  },
  goChat() { wx.navigateTo({ url: '/pages/chat/index?sellerId=' + this.data.product.sellerId + '&sellerName=' + this.data.product.sellerNickname }) },
  goBack() { wx.navigateBack() },
  onShareAppMessage() { const p = this.data.product; return { title: p ? p.name : '校易淘', path: '/pages/detail/index?id=' + (p?p.id:'') } }
})