import Order from '../../model/Order.js'
let order = new Order()

Page({
  data: {
    orderInfo: null
  },

  onLoad: function (options) {
    this._onLoad(options)
  },
  
  _onLoad(data){
    order.getOrderInfo(data.id,(res) => {
      this.setData({
        orderInfo: res
      })
    })
  },

  /* 取消订单 */
  _cancelOrder(e) {
    wx.showModal({
      content: '确定取消该订单？',
      confirmColor: '#d6000f',
      success: (res) => {
        if (res.confirm) {

          let id = this.data.orderInfo.id
          order.cancelOrder(id, (res) => {
            this.setData({
              ['orderInfo.order_status.status']: 0,
              ['orderInfo.order_status.statusName']: '已取消'
            })
          })

        }
      }
    })
  },

  _pay() {
    console.log(111)
  },

  _confirmDelivery(){
    wx.showModal({
      content: '确定收货？',
      confirmColor: '#d6000f',
      success: (res) => {
        if (res.confirm) {

          let id = this.data.orderInfo.id
          order.confirmDelivery(id, (res) => {
            this.setData({
              ['orderInfo.order_status.status']: 4,
              ['orderInfo.order_status.statusName']: '待评价'
            })
          })

        }
      }
    })
  },

  /* 删除订单 */
  _deleteOrder(e) {
    wx.showModal({
      content: '确定收货？',
      confirmColor: '#d6000f',
      success: (res) => {
        if (res.confirm) {


          let id = this.data.orderInfo.id
          order.deleteOrder(id, (res) => {
            wx.navigateBack()
          })

        }
      }
    })
  },

  _goComment(e) {
    let id = this.data.orderInfo.id
    wx.navigateTo({
      url: '/pages/comment/comment?id=' + id,
    })
  },
})