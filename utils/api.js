// ===== API 接口层（当前使用Mock，后续对接云函数） =====
const mock = require('./mock')

// 模拟网络延迟
const delay = (data, ms = 300) => new Promise(r => setTimeout(() => r(data), ms))

const api = {
  // ---- 用户 ----
  login: (username, password) => delay({ id: 1, username, nickname: '小易同学', phone: '138****8888', email: 'xiaoyi@campus.edu', avatar: '', role: 'client' }),
  register: (data) => delay({ success: true }),
  getUserInfo: () => delay(wx.getStorageSync('userInfo') || mock.products[0]),
  updateProfile: (data) => delay({ success: true }),

  // ---- 商品 ----
  getProducts: (params = {}) => {
    let list = [...mock.products]
    if (params.keyword) list = list.filter(p => p.name.includes(params.keyword) || p.description.includes(params.keyword))
    if (params.category) list = list.filter(p => p.category === params.category)
    if (params.minPrice) list = list.filter(p => p.price >= params.minPrice)
    if (params.maxPrice) list = list.filter(p => p.price <= params.maxPrice)
    return delay(list)
  },
  getProductById: (id) => delay(mock.products.find(p => p.id === id) || null),
  getHotProducts: () => delay(mock.products.sort((a, b) => b.viewCount - a.viewCount).slice(0, 6)),
  getNewProducts: () => delay([...mock.products].reverse().slice(0, 6)),
  publishProduct: (data) => delay({ success: true, id: Date.now() }),

  // ---- 分类 ----
  getCategories: () => delay(mock.categories),

  // ---- 订单 ----
  getOrders: (type) => delay(mock.orders),
  getOrderById: (id) => delay(mock.orders.find(o => o.id === id)),
  createOrder: (productId) => delay({ success: true, orderId: Date.now() }),
  payOrder: (orderId) => delay({ success: true }),
  cancelOrder: (orderId) => delay({ success: true }),
  confirmReceive: (orderId) => delay({ success: true }),

  // ---- 评价 ----
  getProductReviews: (productId) => delay(mock.reviews.filter(r => r.productId === productId)),
  submitReview: (data) => delay({ success: true }),

  // ---- 收藏 ----
  getFavorites: () => delay(mock.products.filter(p => p.isFavorite)),
  toggleFavorite: (productId) => {
    const p = mock.products.find(p => p.id === productId)
    if (p) p.isFavorite = !p.isFavorite
    return delay({ success: true, isFavorite: p ? p.isFavorite : false })
  },

  // ---- 消息 ----
  getMessages: () => delay(mock.messages),
  markRead: (id) => delay({ success: true }),
  getUnreadCount: () => delay(mock.messages.filter(m => !m.read).length),

  // ---- 议价 ----
  sendBargain: (data) => delay({ success: true }),
  getBargainList: () => delay([]),
}

module.exports = api
