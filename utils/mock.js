// ===== Mock 数据（路演演示用） =====
const categories = [
  { id: 1, name: '电子产品', icon: '📱', color: '#6C5CE7', desc: '手机/电脑/平板/耳机' },
  { id: 2, name: '书籍教材', icon: '📚', color: '#00b894', desc: '教材/考研/考公/小说' },
  { id: 3, name: '生活用品', icon: '🏠', color: '#fdcb6e', desc: '日用品/收纳/清洁' },
  { id: 4, name: '服饰鞋包', icon: '👟', color: '#fd79a8', desc: '衣服/鞋子/包包' },
  { id: 5, name: '运动户外', icon: '⚽', color: '#e17055', desc: '球类/健身/户外装备' },
  { id: 6, name: '文具办公', icon: '✏️', color: '#0984e3', desc: '文具/打印/办公设备' },
  { id: 7, name: '美妆护肤', icon: '💄', color: '#e84393', desc: '化妆品/护肤品/香水' },
  { id: 8, name: '其他', icon: '🎁', color: '#636e72', desc: '其他二手商品' },
]

const products = [
  { id: 1, name: 'iPad Pro 2021 256G', description: '99新，无划痕，配件齐全，送保护壳和键盘', category: '电子产品', price: 3500, originalPrice: 6000, condition: '几乎全新', imageUrl: '/images/demo/ipad.jpg', status: 1, sellerId: 2, viewCount: 120, createTime: '2026-06-01 10:00', sellerNickname: '张三', sellerAvatar: '', isFavorite: false },
  { id: 2, name: '高等数学（第七版）上下册', description: '教材全套，高数线代概率论，笔记很少，9成新', category: '书籍教材', price: 45, originalPrice: 120, condition: '二手', imageUrl: '/images/demo/book.webp', status: 1, sellerId: 3, viewCount: 88, createTime: '2026-05-28 14:30', sellerNickname: '李四', sellerAvatar: '', isFavorite: true },
  { id: 3, name: '小米无线蓝牙耳机 Air2 SE', description: '续航正常，轻微使用痕迹，音质清晰', category: '电子产品', price: 120, originalPrice: 200, condition: '二手', imageUrl: '/images/demo/earphone.webp', status: 1, sellerId: 2, viewCount: 65, createTime: '2026-05-25 09:15', sellerNickname: '张三', sellerAvatar: '', isFavorite: false },
  { id: 4, name: '宿舍收纳置物架 三层', description: '三层置物架，宽50cm，适合桌面使用，承重好', category: '生活用品', price: 35, originalPrice: 80, condition: '二手', imageUrl: '/images/demo/shelf.jpg', status: 1, sellerId: 3, viewCount: 43, createTime: '2026-05-20 16:45', sellerNickname: '李四', sellerAvatar: '', isFavorite: false },
  { id: 5, name: '耐克跑步鞋 42码', description: '穿了两个月，尺码不合适，低价出，鞋底无磨损', category: '服饰鞋包', price: 180, originalPrice: 500, condition: '二手', imageUrl: '/images/demo/shoe.webp', status: 1, sellerId: 2, viewCount: 32, createTime: '2026-05-18 11:20', sellerNickname: '张三', sellerAvatar: '', isFavorite: true },
  { id: 6, name: 'MacBook Air M1 256G', description: '2020款，银色，电池循环62次，无维修，送内胆包', category: '电子产品', price: 5200, originalPrice: 7999, condition: '几乎全新', imageUrl: '/images/demo/macbook.jpg', status: 1, sellerId: 4, viewCount: 256, createTime: '2026-06-05 08:00', sellerNickname: '王五', sellerAvatar: '', isFavorite: false },
  { id: 7, name: '考研英语真题全套', description: '2020-2025真题详解，含作文模板，部分有笔记标注', category: '书籍教材', price: 28, originalPrice: 89, condition: '二手', imageUrl: '/images/demo/engbook.webp', status: 1, sellerId: 5, viewCount: 76, createTime: '2026-06-03 13:10', sellerNickname: '赵六', sellerAvatar: '', isFavorite: false },
  { id: 8, name: '小米台灯 Pro', description: '护眼台灯，无频闪，色温可调，8成新', category: '生活用品', price: 55, originalPrice: 169, condition: '二手', imageUrl: '/images/demo/lamp.webp', status: 1, sellerId: 3, viewCount: 44, createTime: '2026-06-02 20:00', sellerNickname: '李四', sellerAvatar: '', isFavorite: false },
  { id: 9, name: 'AirPods Pro 2', description: '降噪功能完好，充电盒有轻微划痕，国行正品', category: '电子产品', price: 980, originalPrice: 1899, condition: '二手', imageUrl: '/images/demo/airpods.jpg', status: 1, sellerId: 4, viewCount: 189, createTime: '2026-06-07 09:30', sellerNickname: '王五', sellerAvatar: '', isFavorite: false },
  { id: 10, name: '瑜伽垫加厚款', description: '10mm加厚，防滑，送绑带和网袋，只用过3次', category: '运动户外', price: 38, originalPrice: 89, condition: '几乎全新', imageUrl: '/images/demo/yoga.jpg', status: 1, sellerId: 5, viewCount: 22, createTime: '2026-06-06 15:40', sellerNickname: '赵六', sellerAvatar: '', isFavorite: false },
  { id: 11, name: '得力打印机 考试专用', description: '激光打印机，可双面打印，附送硒鼓2个', category: '文具办公', price: 320, originalPrice: 699, condition: '二手', imageUrl: '/images/demo/printer.jpg', status: 1, sellerId: 2, viewCount: 55, createTime: '2026-06-04 10:25', sellerNickname: '张三', sellerAvatar: '', isFavorite: false },
  { id: 12, name: 'Nike双肩包 黑色', description: '经典款，容量大，可放15.6寸电脑，拉链顺滑', category: '服饰鞋包', price: 120, originalPrice: 399, condition: '二手', imageUrl: '/images/demo/bag.webp', status: 1, sellerId: 3, viewCount: 38, createTime: '2026-06-01 17:50', sellerNickname: '李四', sellerAvatar: '', isFavorite: false },
]

const orders = [
  { id: 1, orderNo: 'ORD20260601001', productId: 1, productName: 'iPad Pro 2021 256G', productImageUrl: '/images/demo/ipad.jpg', buyerId: 1, sellerId: 2, amount: 3500, status: 1, createTime: '2026-06-01 10:30', sellerNickname: '张三' },
  { id: 2, orderNo: 'ORD20260602001', productId: 2, productName: '高等数学（第七版）上下册', productImageUrl: '/images/demo/book.webp', buyerId: 1, sellerId: 3, amount: 45, status: 0, createTime: '2026-06-02 14:00', sellerNickname: '李四' },
  { id: 3, orderNo: 'ORD20260603001', productId: 5, productName: '耐克跑步鞋 42码', productImageUrl: '/images/demo/shoe.webp', buyerId: 1, sellerId: 2, amount: 180, status: 3, createTime: '2026-06-03 09:15', sellerNickname: '张三' },
]

const reviews = [
  { id: 1, productId: 1, reviewerId: 1, reviewerNickname: '小明', reviewerAvatar: '', rating: 5, content: 'iPad非常新，和描述完全一致，卖家很靠谱！', createTime: '2026-06-02 12:00' },
  { id: 2, productId: 1, reviewerId: 5, reviewerNickname: '赵六', reviewerAvatar: '', rating: 4, content: '整体不错，发货很快，好评。', createTime: '2026-06-03 08:30' },
  { id: 3, productId: 2, reviewerId: 4, reviewerNickname: '王五', reviewerAvatar: '', rating: 5, content: '教材很新，价格实惠，推荐购买。', createTime: '2026-05-30 16:20' },
]

const messages = [
  { id: 1, type: 'system', title: '欢迎使用校易淘', content: '感谢您注册校易淘校园二手交易平台，祝您交易愉快！', time: '2026-06-07 10:00', read: false },
  { id: 2, type: 'transaction', title: '订单待付款', content: '您购买的「高等数学（第七版）上下册」订单待付款，请及时完成支付。', time: '2026-06-02 14:00', read: false },
  { id: 3, type: 'price', title: '收到议价请求', content: '有买家对您的「iPad Pro 2021 256G」发起议价，出价￥3200。', time: '2026-06-01 11:00', read: true },
  { id: 4, type: 'system', title: '交易保障升级', content: '平台已升级交易保障服务，所有交易均享受7天无理由保障。', time: '2026-05-30 09:00', read: true },
  { id: 5, type: 'transaction', title: '退款申请已通过', content: '您对「耐克跑步鞋 42码」的退款申请已通过，￥180将在1-3个工作日退回。', time: '2026-06-04 16:00', read: false },
]

module.exports = { categories, products, orders, reviews, messages }
