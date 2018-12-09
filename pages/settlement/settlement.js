import Order from '../../model/Order.js'
let order = new Order()

Page({
  data: {
    ids: null,
    advanceOrder: null,
    note: null,
    noteLen: 0,

    success: false
  },

  onLoad: function (options) {
    this._onLoad(options);
  },
  
  _onLoad(data) {
    order.advanceOrder(data,(res) => {
      res.totalPrice = res.totalPrice.toFixed(2)
      this.setData({
        ids: data.ids,
        advanceOrder: res
      })
    })
  },

  _input(e) {
    if (this.data.noteLen >= 200) {
      return false
    }
    order.iptChange(e, this)
    let str = this.data.note
    this.setData({
      noteLen: str.length
    })
  },

  /* 结算 */
  _settleAccounts(){
    let data = {
      ids: this.data.ids,
      addressId: this.data.advanceOrder.address.id,
      note: this.data.note
    }
    order.placeOrder(data,(res) => {
      if(res.orderId){
        this.setData({
          success: true
        })
      }
    })
  },

  /* 付款 */
  _pay(){
  }
})