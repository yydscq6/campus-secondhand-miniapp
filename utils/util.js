const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  return `${year}-${month.toString().padStart(2,'0')}-${day.toString().padStart(2,'0')} ${hour.toString().padStart(2,'0')}:${minute.toString().padStart(2,'0')}`
}

const formatPrice = price => {
  return parseFloat(price).toFixed(2)
}

const showToast = (title, icon = 'none') => {
  wx.showToast({ title, icon, duration: 2000 })
}

const isLoggedIn = () => {
  return !!wx.getStorageSync('userInfo')
}

const getUserInfo = () => {
  return wx.getStorageSync('userInfo') || null
}

const setUserInfo = (info) => {
  wx.setStorageSync('userInfo', info)
}

const clearUserInfo = () => {
  wx.removeStorageSync('userInfo')
}

// ===== 校园认证 =====
const isCampusCertified = () => {
  const info = wx.getStorageSync('userInfo')
  return !!(info && info.certified && info.campus)
}

const getUserCampus = () => {
  const info = wx.getStorageSync('userInfo')
  return (info && info.campus) || ''
}

module.exports = { formatTime, formatPrice, showToast, isLoggedIn, getUserInfo, setUserInfo, clearUserInfo, isCampusCertified, getUserCampus }
