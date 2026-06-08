Page({
  data: {
    sellerName: '', sellerId: '', inputValue: '',
    messages: [
      { id: 1, type: 'other', content: '你好，请问这个还在吗？', time: '14:30' },
      { id: 2, type: 'self', content: '在的，随时可以看货', time: '14:31' },
      { id: 3, type: 'other', content: '可以便宜点吗？', time: '14:32' },
      { id: 4, type: 'self', content: '已经是最低价了哦，可以当面验货', time: '14:33' }
    ]
  },
  onLoad(opts) {
    this.setData({ sellerName: decodeURIComponent(opts.sellerName || '卖家'), sellerId: opts.sellerId })
  },
  onInput(e) { this.setData({ inputValue: e.detail.value }) },
  sendMessage() {
    const { inputValue, messages } = this.data
    if (!inputValue.trim()) return
    const newMsg = { id: Date.now(), type: 'self', content: inputValue, time: new Date().toLocaleTimeString().slice(0,5) }
    this.setData({ messages: [...messages, newMsg], inputValue: '' })
    setTimeout(() => {
      const reply = { id: Date.now()+1, type: 'other', content: '好的，我知道了', time: new Date().toLocaleTimeString().slice(0,5) }
      this.setData({ messages: [...this.data.messages, reply] })
    }, 1500)
  }
})