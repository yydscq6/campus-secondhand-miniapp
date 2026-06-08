const api = require('../../utils/api')
const util = require('../../utils/util')
Page({
  data: {
    categories: [], form: { name:'', category:'', price:'', originalPrice:'', condition:'二手', description:'', campus:'' },
    conditions: ['全新','几乎全新','二手','旧'], conditionIdx: 2, images: [], submitting: false,
    campusCertified: false, userCampus: '',
  },
  onLoad() {
    this.loadCategories()
    this.loadCampusInfo()
  },
  loadCampusInfo() {
    const campusCertified = util.isCampusCertified()
    const userCampus = util.getUserCampus()
    if (campusCertified && userCampus) {
      this.setData({ campusCertified: true, userCampus, 'form.campus': userCampus })
    }
  },
  onCampusChange(e) {
    this.setData({ 'form.campus': e.detail.value })
  },
  async loadCategories() { const categories = await api.getCategories(); this.setData({ categories }) },
  onInput(e) { const { field } = e.currentTarget.dataset; this.setData({ ['form.'+field]: e.detail.value }) },
  onCategoryChange(e) { const idx = e.detail.value; this.setData({ 'form.category': this.data.categories[idx].name }) },
  onConditionChange(e) { const idx = e.detail.value; this.setData({ conditionIdx: idx, 'form.condition': this.data.conditions[idx] }) },
  chooseImage() {
    wx.chooseMedia({ count: 3, mediaType: ['image'], success: (res) => {
      const imgs = res.tempFiles.map(f => f.tempFilePath)
      this.setData({ images: [...this.data.images, ...imgs].slice(0, 3) })
    }})
  },
  removeImage(e) {
    const idx = e.currentTarget.dataset.idx
    this.setData({ images: this.data.images.filter((_, i) => i !== idx) })
  },
  async submit() {
    const { form } = this.data
    if (!form.name.trim()) { util.showToast('请输入商品名称'); return }
    if (!form.category) { util.showToast('请选择分类'); return }
    if (!form.price) { util.showToast('请输入价格'); return }
    if (!form.description.trim()) { util.showToast('请输入商品描述'); return }
    if (!form.campus) { util.showToast('请选择所在校区'); return }
    this.setData({ submitting: true })
    await api.publishProduct(form)
    wx.showToast({ title: '发布成功！', icon: 'success' })
    setTimeout(() => wx.switchTab({ url: '/pages/mine/index' }), 1500)
  }
})