
Page({

  data: {
    orderId: null,
    cartsId: null,
    id: null
  },

  onLoad: function (options) {
    this.setData({
      orderId: options.orderId,
      cartsId: options.cartsId,
      id: options.id
    })
  },
})