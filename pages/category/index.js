const api = require('../../utils/api')
Page({
  data: { categories: [], products: [], activeCate: '', keyword: '', loading: true, sortOrder: '' },
  onLoad(opts) {
    if (opts.keyword) this.setData({ keyword: opts.keyword })
    this.loadCategories()
    this.loadProducts()
  },
  async loadCategories() {
    const categories = await api.getCategories()
    this.setData({ categories })
  },
  async loadProducts() {
    this.setData({ loading: true })
    const { keyword, activeCate } = this.data
    const products = await api.getProducts({ keyword, category: activeCate })
    this.setData({ products, loading: false })
  },
  filterByCategory(name) {
    this.setData({ activeCate: name || '' })
    this.loadProducts()
  },
  onCateTap(e) {
    const { name } = e.currentTarget.dataset
    this.setData({ activeCate: name === this.data.activeCate ? '' : name })
    this.loadProducts()
  },
  onSearchInput(e) { this.setData({ keyword: e.detail.value }) },
  onSearchConfirm() { this.loadProducts() },
  goDetail(e) { wx.navigateTo({ url: `/pages/detail/index?id=${e.currentTarget.dataset.id}` }) },
  onSortChange(e) {
    const sort = e.currentTarget.dataset.sort
    this.setData({ sortOrder: this.data.sortOrder === sort ? '' : sort })
    let products = [...this.data.products]
    if (this.data.sortOrder === 'price-asc') products.sort((a,b) => a.price - b.price)
    else if (this.data.sortOrder === 'price-desc') products.sort((a,b) => b.price - a.price)
    else if (this.data.sortOrder === 'new') products.sort((a,b) => b.id - a.id)
    this.setData({ products })
  }
})
