const api = require('../../utils/api')
const util = require('../../utils/util')
Page({
  data: { messages: [], loading: true, unreadCount: 0 },
  onLoad() { this.loadMessages() },
  async loadMessages() {
    this.setData({ loading: true })
    const messages = await api.getMessages()
    const unreadCount = messages.filter(function(m){ return !m.read }).length
    this.setData({ messages, loading: false, unreadCount })
  },
  markRead(e) {
    const { id } = e.currentTarget.dataset
    const messages = this.data.messages.map(function(m){ return m.id === id ? Object.assign({}, m, { read: true }) : m })
    const unreadCount = messages.filter(function(m){ return !m.read }).length
    this.setData({ messages, unreadCount })
    api.markRead(id)
  }
})