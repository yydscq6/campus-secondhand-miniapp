const campusGroups = [
  { city: '北京', schools: ['北京大学', '清华大学', '中国人民大学', '北京师范大学'] },
  { city: '上海', schools: ['复旦大学', '上海交通大学', '同济大学', '华东师范大学'] },
  { city: '广州', schools: ['中山大学', '华南理工大学', '暨南大学', '华南师范大学'] },
  { city: '南京', schools: ['南京大学', '东南大学', '南京师范大学', '南京理工大学'] },
  { city: '武汉', schools: ['武汉大学', '华中科技大学', '华中师范大学', '武汉理工大学'] },
  { city: '杭州', schools: ['浙江大学', '浙江工业大学', '杭州电子科技大学', '浙江师范大学'] },
  { city: '成都', schools: ['四川大学', '电子科技大学', '西南交通大学', '成都理工大学'] },
  { city: '西安', schools: ['西安交通大学', '西北工业大学', '西安电子科技大学', '陕西师范大学'] },
  { city: '长沙', schools: ['中南大学', '湖南大学', '湖南师范大学', '湖南工商大学'] },
]

Component({
  properties: {
    value: { type: String, value: '' },
    placeholder: { type: String, value: '请选择所在学校' },
  },
  data: {
    cities: [],
    schools: [],
    displayList: [[], []],
    pickerIndex: [0, 0],
    selected: '',
  },
  lifetimes: {
    attached() {
      const cities = campusGroups.map(g => g.city)
      const schools = campusGroups[0].schools
      this.setData({ cities, schools, displayList: [cities, schools] })
      if (this.data.value) this.setData({ selected: this.data.value })
    },
  },
  observers: {
    'value'(val) { this.setData({ selected: val }) },
  },
  methods: {
    onColumnChange(e) {
      const { column, value } = e.detail
      const pickerIndex = [...this.data.pickerIndex]
      pickerIndex[column] = value
      if (column === 0) {
        pickerIndex[1] = 0
        const schools = campusGroups[value].schools
        this.setData({ schools, pickerIndex, displayList: [this.data.cities, schools] })
      } else {
        this.setData({ pickerIndex })
      }
    },
    onChange(e) {
      const [ci, si] = e.detail.value
      const campus = campusGroups[ci].schools[si]
      this.setData({ selected: campus })
      this.triggerEvent('change', { value: campus })
    },
  },
})
