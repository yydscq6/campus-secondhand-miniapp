const api = require('../../utils/api')
const util = require('../../utils/util')
Page({
  data: { activeTab: 0, buyOrders: [], sellOrders: [], tabs: ['我买到的','我卖出的'] },
  onLoad() { this.loadOrders() },
  async loadOrders() {
    const orders = await api.getOrders()
    this.setData({ buyOrders: orders.filter(o => o.status !== 2), sellOrders: orders.slice(0, 2) })
  },
  onTabChange(e) { this.setData({ activeTab: e.currentTarget.dataset.idx }) },
  getStatusText(s) { return {0:'待付款',1:'已完成',2:'已取消',3:'已退款'}[s] || '未知' },
  getStatusClass(s) { return {0:'warning',1:'success',2:'gray',3:'danger'}[s] || 'gray' },
  payOrder(e) {
    const { id } = e.currentTarget.dataset
    wx.showModal({ title: '确认支付', content: '确定要支付该订单吗？', confirmColor: '#6C5CE7',
      success: async (res) => { if (res.confirm) { await api.payOrder(id); util.showToast('支付成功'); this.loadOrders() } }
    })
  },
  cancelOrder(e) {
    const { id } = e.currentTarget.dataset
    wx.showModal({ title: '取消订单', content: '确定要取消该订单吗？', confirmColor: '#6C5CE7',
      success: async (res) => { if (res.confirm) { await api.cancelOrder(id); util.showToast('已取消'); this.loadOrders() } }
    })
  },
  goReview(e) { wx.navigateTo({ url: '/pages/review/index?orderId=' + e.currentTarget.dataset.id }) },
  goDetail(e) { wx.navigateTo({ url: '/pages/detail/index?id=' + e.currentTarget.dataset.pid }) }
})