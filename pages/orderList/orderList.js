import Order from '../../model/Order.js'
let order = new Order()

Page({
  data: {
    status: -1,                  // 当前订单状态
    orderStatus: [              // 订单状态
      {
        statusName: '全部',
        status: -1
      }, 
      {
        statusName: '待付款',
        status: 1
      }, 
      {
        statusName: '待发货',
        status: 2
      }, 
      {
        statusName: '待收货',
        status: 3
      }, 
      {
        statusName: '待评价',
        status: 4
      },
      {
        statusName: '已完成',
        status: 5
      }, 
    ],
    orderList: null,            // 订单列表
    page: 1,
    pageSize: 10,

  },

  onLoad: function (options) {
    this._onLoad(options)
  },

  onShow: function() {
    this._getList(true)
  },

  _onLoad(data){
    if(data.status){
      this.setData({
        status: data.status
      })
    }
    this._getList(true)
  },

  /* 获取订单列表 */
  _getList(reset){
    if (reset) {
      this.setData({
        page: 1
      })
    }
    let data = {
      page: this.data.page,
      pageSize: this.data.pageSize,
    }
    let status = this.data.status
    if (~status){
      data.status = status
    }

    order.getOrderList(data, (res) => {
      let orderList = []
      if (reset){
        orderList = res.data
      } else{
        orderList = [...this.data.orderList, ...res.data]
      }
      this.setData({
        orderList: orderList,
        has_more: res.has_more,
        page: data.page + 1
      })
    })

  },

  /* 选项卡切换 */
  _statusChange(e){
    let status = order.getDataSet(e,'status')
    this.setData({
      status: status
    })
    this._getList(true)
  },

  /* 取消订单 */
  _cancelOrder(e){
    wx.showModal({
      content: '确定取消该订单？',
      confirmColor: '#d6000f',
      success: (res) => {
        if (res.confirm) {

          let index = order.getDataSet(e, 'index')
          let orderList = this.data.orderList
          let id = orderList[index].id
          order.cancelOrder(id, (res) => {
            if (this.data.status != this.data.orderStatus[0].status){
              orderList.splice(index, 1)
            }else{
              orderList[index].order_status.status = 0
              orderList[index].order_status.statusName = '已取消'
            }
            this.setData({
              orderList: orderList
            })
          })

        }
      }
    })
  },

  _pay(){
    console.log(111)
  },

  /* 确认收货 */
  _confirmDelivery(e){
    wx.showModal({
      content: '确定收货？',
      confirmColor: '#d6000f',
      success: (res) => {
        if (res.confirm) {

          let index = order.getDataSet(e, 'index')
          let orderList = this.data.orderList
          let id = orderList[index].id
          order.confirmDelivery(id, (res) => {
            if (this.data.status != this.data.orderStatus[0].status) {
              orderList.splice(index, 1)
            } else {
              orderList[index].order_status.status = 4
              orderList[index].order_status.statusName = '待评价'
            }
            this.setData({
              orderList: orderList
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

          let index = order.getDataSet(e, 'index')
          let orderList = this.data.orderList
          let id = orderList[index].id
          order.deleteOrder(id, (res) => {
            orderList.splice(index, 1)
            this.setData({
              orderList: orderList
            })
          })

        }
      }
    })
  },
    
  _goComment(e){
    let id = order.getDataSet(e,'id');
    wx.navigateTo({
      url: '/pages/comment/comment?id=' + id,
    })
  },

  onReachBottom: function () {
    if(this.data.has_more){
      this._getList(false)
    }
  },

})