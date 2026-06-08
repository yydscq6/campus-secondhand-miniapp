const api = require('../../utils/api')
const util = require('../../utils/util')
Page({
  data: { reviews: [], rating: 5, content: '', orderId: null, isWriteMode: false, submitting: false },
  onLoad(opts) {
    if (opts.orderId) { this.setData({ orderId: opts.orderId, isWriteMode: true }) }
    else { this.loadReviews() }
  },
  async loadReviews() {
    const reviews = await api.getProductReviews(1)
    this.setData({ reviews })
  },
  setRating(e) { this.setData({ rating: e.currentTarget.dataset.rating }) },
  onInput(e) { this.setData({ content: e.detail.value }) },
  async submitReview() {
    const { rating, content, orderId } = this.data
    if (!content.trim()) { util.showToast('请输入评价内容'); return }
    this.setData({ submitting: true })
    await api.submitReview({ orderId, rating, content })
    wx.showToast({ title: '评价成功', icon: 'success' })
    setTimeout(() => wx.navigateBack(), 1500)
  }
})