import Base from 'Base.js'

class Order extends Base{

  constructor(){
    super()
  }

  /* 预订单 */
  advanceOrder(data,callback){
    let params = {
      url: '/v1/advanceOrder',
      data: data,
      type: 'post',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }

  /* 下单 */
  placeOrder(data, callback) {
    let params = {
      url: '/v1/placeOrder',
      data: data,
      type: 'post',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
  
  /* 订单列表 */
  getOrderList(data, callback){
    let params = {
      url: '/v1/getOrderList',
      data: data,
      type: 'post',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }

  /* 订单详情 */
  getOrderInfo(id, callback) {
    let params = {
      url: '/v1/getOrderInfo',
      data: {
        id: id
      },
      type: 'post',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }

  /* 取消订单 */
  cancelOrder(id, callback) {
    let params = {
      url: '/v1/cancelOrder',
      data: {
        id: id
      },
      type: 'post',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }

  /* 确认收货 */
  confirmDelivery(id, callback) {
    let params = {
      url: '/v1/confirmDelivery',
      data: {
        id: id
      },
      type: 'post',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }

  /* 删除订单 */
  deleteOrder(id, callback) {
    let params = {
      url: '/v1/deleteOrder',
      data: {
        id: id
      },
      type: 'post',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }

  /* 获取待评价商品 */
  getCommentProducts(id, callback) {
    let params = {
      url: '/v1/getCommentProducts',
      data: {
        id: id
      },
      type: 'post',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }

  /* 评价 */
  commentOrder(data, callback) {
    let params = {
      url: '/v1/commentOrder',
      data: data,
      type: 'post',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
  
}

export default Order