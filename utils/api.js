// ===== API 接口层（当前使用Mock，后续对接云函数） =====
const mock = require('./mock')

// 模拟网络延迟
const delay = (data, ms = 300) => new Promise(r => setTimeout(() => r(data), ms))

const api = {
  // ---- 用户 ----
  login: (username, password) => {
    // 演示账号：保留已认证状态
    if (username === 'zhangsan' && password === '123456') {
      return delay({ id: 1, username: 'zhangsan', nickname: '张三', phone: '138****8888', email: 'zhangsan@pku.edu.cn', avatar: '', role: 'client', certified: true, campus: '北京大学', studentId: '20230001' })
    }
    // 查找已注册用户
    const users = wx.getStorageSync('registeredUsers') || []
    const found = users.find(u => u.username === username && u.password === password)
    if (found) {
      const { password: _, ...safeUser } = found
      return delay(safeUser)
    }
    // 账号或密码错误
    return delay(null)
  },
  register: (data) => {
    const users = wx.getStorageSync('registeredUsers') || []
    if (users.find(u => u.username === data.username)) {
      return delay({ success: false, msg: '用户名已存在' })
    }
    const newUser = {
      id: Date.now(),
      username: data.username,
      password: data.password,
      nickname: data.nickname || data.username,
      phone: data.phone || '',
      email: '',
      avatar: '',
      role: 'client',
      certified: false,
      campus: '',
      studentId: '',
    }
    users.push(newUser)
    wx.setStorageSync('registeredUsers', users)
    return delay({ success: true })
  },
  getUserInfo: () => delay(wx.getStorageSync('userInfo') || mock.products[0]),
  updateProfile: (data) => delay({ success: true }),

  // ---- 校园认证 ----
  sendVerifyCode: (email) => delay({ success: true, hint: '演示验证码：123456' }),
  verifyCampus: (data) => delay({ success: true, certified: true, ...data }),
  getUserCampus: () => {
    const info = wx.getStorageSync('userInfo')
    return delay({ certified: !!(info && info.certified), campus: (info && info.campus) || '' })
  },

  // ---- 商品 ----
  getProducts: (params = {}) => {
    let list = [...mock.products]
    if (params.keyword) list = list.filter(p => p.name.includes(params.keyword) || p.description.includes(params.keyword))
    if (params.category) list = list.filter(p => p.category === params.category)
    if (params.campus) list = list.filter(p => p.campus === params.campus)
    if (params.minPrice) list = list.filter(p => p.price >= params.minPrice)
    if (params.maxPrice) list = list.filter(p => p.price <= params.maxPrice)
    return delay(list)
  },
  getProductById: (id) => delay(mock.products.find(p => p.id === id) || null),
  getHotProducts: (campus) => {
    let list = campus ? mock.products.filter(p => p.campus === campus) : [...mock.products]
    return delay(list.sort((a, b) => b.viewCount - a.viewCount).slice(0, 6))
  },
  getNewProducts: (campus) => {
    let list = campus ? mock.products.filter(p => p.campus === campus) : [...mock.products]
    return delay(list.reverse().slice(0, 6))
  },
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
