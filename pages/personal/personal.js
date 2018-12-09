import User from '../../model/User.js'
let user = new User()

Page({
  data: {
    personalData: null,
    orderCount:[
      {
        order_status:{
          status: 1,
          icon: 'imgs/icon1.png',
          statusName: '待付款'
        },
        order_sum: 0
      },
      {
        order_status: {
          status: 2,
          icon: 'imgs/icon2.png',
          statusName: '待发货'
        },
        order_sum: 0
      },
      {
        order_status: {
          status: 3,
          icon: 'imgs/icon3.png',
          statusName: '待收货'
        },
        order_sum: 0
      },
      {
        order_status: {
          status: 4,
          icon: 'imgs/icon4.png',
          statusName: '待评价'
        },
        order_sum: 0
      }
    ]
  },

  onShow: function (options) {
    this._onLoad()
  },

  _onLoad(){
    user.getPersonalCenter((res) => {
      this.setData({
        personalData: res
      })
      this._updateOrderCount(res.orderCount)
    })
  },

  /* 更新orderCount */
  _updateOrderCount(newOrderCount){
    if (newOrderCount){
      let orderCount = this.data.orderCount
      for (let i = 0, iLen = newOrderCount.length; i < iLen; i++) {
        for (let j = 0, jLen = orderCount.length; j < jLen; j++) {
          if (newOrderCount[i].order_status.status === orderCount[j].order_status.status) {
            orderCount[j].order_sum = newOrderCount[i].order_sum
            break
          }
        }
      }
      this.setData({
        orderCount: orderCount
      })
    }
  },

})