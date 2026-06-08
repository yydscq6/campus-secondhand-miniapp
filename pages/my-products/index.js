const api = require('../../utils/api')
const util = require('../../utils/util')
Page({
  data: { products: [], loading: true, activeTab: 0 },
  onLoad() { this.loadProducts() },
  async loadProducts() {
    this.setData({ loading: true })
    const products = await api.getProducts({})
    this.setData({ products: products.slice(0, 5), loading: false })
  },
  onTabChange(e) { this.setData({ activeTab: e.currentTarget.dataset.idx }) },
  goDetail(e) { wx.navigateTo({ url: '/pages/detail/index?id=' + e.currentTarget.dataset.id }) },
  editProduct(e) { wx.navigateTo({ url: '/pages/publish/index?editId=' + e.currentTarget.dataset.id }) },
  deleteProduct(e) {
    wx.showModal({ title: '删除商品', content: '确定要删除该商品吗？', confirmColor: '#6C5CE7',
      success: (res) => { if (res.confirm) { util.showToast('已删除'); this.loadProducts() } }
    })
  },
  getStatusText(s) { return {0:'待审核',1:'已上架',2:'已下架',3:'已售出',4:'审核未通过'}[s] || '未知' },
  getStatusClass(s) { return {0:'warning',1:'success',2:'gray',3:'primary',4:'danger'}[s] || 'gray' }
})