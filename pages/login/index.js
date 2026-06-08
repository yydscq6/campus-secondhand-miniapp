const api = require('../../utils/api')
const util = require('../../utils/util')
Page({
  data: { mode: 'login', username: '', password: '', nickname: '', phone: '', statusBarHeight: 0, showPwd: false, loading: false },
  onLoad(opts) {
    this.setData({ statusBarHeight: wx.getWindowInfo().statusBarHeight })
    if (opts.mode === 'profile') this.setData({ mode: 'profile' })
  },
  switchMode() { this.setData({ mode: this.data.mode === 'login' ? 'register' : 'login' }) },
  togglePwd() { this.setData({ showPwd: !this.data.showPwd }) },
  onInput(e) { const { field } = e.currentTarget.dataset; this.setData({ [field]: e.detail.value }) },
  async doLogin() {
    const { username, password } = this.data
    if (!username.trim()) { util.showToast('请输入用户名'); return }
    if (!password) { util.showToast('请输入密码'); return }
    this.setData({ loading: true })
    const userInfo = await api.login(username, password)
    if (!userInfo) {
      util.showToast('用户名或密码错误')
      this.setData({ loading: false })
      return
    }
    util.setUserInfo(userInfo)
    getApp().globalData.isLoggedIn = true
    getApp().globalData.userInfo = userInfo
    wx.showToast({ title: '登录成功', icon: 'success' })
    setTimeout(() => wx.navigateBack(), 1000)
    this.setData({ loading: false })
  },
  async doRegister() {
    const { username, password, nickname, phone } = this.data
    if (!username.trim()) { util.showToast('请输入用户名'); return }
    if (!password) { util.showToast('请输入密码'); return }
    if (password.length < 6) { util.showToast('密码不少于6位'); return }
    this.setData({ loading: true })
    const res = await api.register({ username, password, nickname, phone })
    if (!res.success) {
      util.showToast(res.msg || '注册失败')
      this.setData({ loading: false })
      return
    }
    wx.showToast({ title: '注册成功，请登录', icon: 'success' })
    this.setData({ mode: 'login', loading: false })
  },
  goBack() { wx.navigateBack() }
})