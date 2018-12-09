// pages/components/success/success.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    btnName: String,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goIndex(){
      wx.switchTab({
        url: '/pages/index/index',
      })
    },
    btnFun(){
      this.triggerEvent('btn')
    }
  },

  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
})
