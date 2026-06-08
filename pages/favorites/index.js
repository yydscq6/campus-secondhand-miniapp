const api = require('../../utils/api')
const util = require('../../utils/util')
Page({
  data: { favorites: [], loading: true },
  onLoad() { this.loadFavorites() },
  async loadFavorites() {
    this.setData({ loading: true })
    const favorites = await api.getFavorites()
    this.setData({ favorites, loading: false })
  },
  removeFavorite(e) {
    const { id } = e.currentTarget.dataset
    wx.showModal({ title: '取消收藏', content: '确定取消收藏该商品吗？', confirmColor: '#6C5CE7',
      success: async (res) => {
        if (res.confirm) {
          await api.toggleFavorite(id)
          this.loadFavorites()
          util.showToast('已取消收藏')
        }
      }
    })
  },
  goDetail(e) { wx.navigateTo({ url: '/pages/detail/index?id=' + e.currentTarget.dataset.id }) }
})