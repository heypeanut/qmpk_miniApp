// component/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    border:{
      type:String,
      value:'1rpx solid #fff'
    },
    color:{
      type: String,
      value: '#fff'
    },
    bgColor: {
      type: String,
      value: 'transparent'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeValue(e){
      const myEventDetail = {
        value: e.detail.value
      } // detail对象，提供给事件监听函数
      const myEventOption = {} // 触发事件的选项
      this.debounce(this.triggerEvent('change', myEventDetail, myEventOption),2000)
      this.setData({
        value: e.detail.value
      })
    },
    inputClear(e){
      this.setData({
        value:''
      })
      this.debounce(this.triggerEvent('clear'), 2000)
    },
    debounce(func, delay) {
      let timer
      return function (...args) {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      }
    }
  }
})
