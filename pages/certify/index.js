const api = require('../../utils/api')
const util = require('../../utils/util')

const campusEmailMap = {
  '北京大学': 'pku.edu.cn', '清华大学': 'tsinghua.edu.cn',
  '中国人民大学': 'ruc.edu.cn', '北京师范大学': 'bnu.edu.cn',
  '复旦大学': 'fudan.edu.cn', '上海交通大学': 'sjtu.edu.cn',
  '同济大学': 'tongji.edu.cn', '华东师范大学': 'ecnu.edu.cn',
  '中山大学': 'sysu.edu.cn', '华南理工大学': 'scut.edu.cn',
  '暨南大学': 'jnu.edu.cn', '华南师范大学': 'scnu.edu.cn',
  '南京大学': 'nju.edu.cn', '东南大学': 'seu.edu.cn',
  '南京师范大学': 'njnu.edu.cn', '南京理工大学': 'njust.edu.cn',
  '武汉大学': 'whu.edu.cn', '华中科技大学': 'hust.edu.cn',
  '华中师范大学': 'ccnu.edu.cn', '武汉理工大学': 'whut.edu.cn',
  '浙江大学': 'zju.edu.cn', '浙江工业大学': 'zjut.edu.cn',
  '杭州电子科技大学': 'hdu.edu.cn', '浙江师范大学': 'zjnu.edu.cn',
  '四川大学': 'scu.edu.cn', '电子科技大学': 'uestc.edu.cn',
  '西南交通大学': 'swjtu.edu.cn', '成都理工大学': 'cdut.edu.cn',
  '西安交通大学': 'xjtu.edu.cn', '西北工业大学': 'nwpu.edu.cn',
  '西安电子科技大学': 'xidian.edu.cn', '陕西师范大学': 'snnu.edu.cn',
  '中南大学': 'csu.edu.cn', '湖南大学': 'hnu.edu.cn',
  '湖南师范大学': 'hunnu.edu.cn', '湖南工商大学': 'hutb.edu.cn',
}

Page({
  data: {
    form: { campus: '', studentId: '', email: '', code: '' },
    codeSent: false, codeCooling: 0, loading: false, certified: false,
  },
  onLoad() {},

  onCampusChange(e) {
    this.setData({ 'form.campus': e.detail.value })
  },

  onInput(e) {
    const { field } = e.currentTarget.dataset
    this.setData({ ['form.' + field]: e.detail.value })
  },

  sendCode() {
    if (this.data.codeCooling > 0) return
    const { campus, email } = this.data.form
    if (!campus) { util.showToast('请先选择所在学校'); return }
    if (!email.trim()) { util.showToast('请输入校园邮箱'); return }
    const suffix = campusEmailMap[campus]
    if (suffix && !email.endsWith(suffix)) {
      util.showToast('邮箱后缀应为 ' + suffix); return
    }
    this.setData({ codeSent: true, codeCooling: 60 })
    api.sendVerifyCode(email)
    const timer = setInterval(() => {
      if (this.data.codeCooling <= 0) { clearInterval(timer); return }
      this.setData({ codeCooling: this.data.codeCooling - 1 })
    }, 1000)
    wx.showToast({ title: '验证码已发送（演示：任意6位数字）', icon: 'none', duration: 2500 })
  },

  async submitCertify() {
    const { form } = this.data
    if (!form.campus) { util.showToast('请选择所在学校'); return }
    if (!form.studentId.trim()) { util.showToast('请输入学号'); return }
    if (!form.email.trim()) { util.showToast('请输入校园邮箱'); return }
    if (!form.code || form.code.length < 4) { util.showToast('请输入验证码（任意4-6位数字）'); return }
    this.setData({ loading: true })
    await api.verifyCampus({ campus: form.campus, studentId: form.studentId, email: form.email })
    const userInfo = util.getUserInfo() || {}
    userInfo.certified = true
    userInfo.campus = form.campus
    userInfo.studentId = form.studentId
    util.setUserInfo(userInfo)
    this.setData({ loading: false, certified: true })
    wx.showToast({ title: '认证成功！', icon: 'success' })
  },

  goBack() { wx.navigateBack() },
})
