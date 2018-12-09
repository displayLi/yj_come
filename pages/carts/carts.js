import countChange from '../../utils/countChange.js'

import Carts from '../../model/Carts.js'
let carts = new Carts()

Page({

  data: {
    /* 数据 */
    cartsList: [],        // 购物车列表

    totalPrices: 0,       // 商品总价格
    total: 0,             // 商品总数量
    counts: {},

    /* 控制 */
    checkVal: null,       // 选中的index
    allCheck: false,      // 是否全选
    edit: false           // 是否编辑
  },

  onLoad: function (options) {
    
  },

  onShow: function () {
    this._onLoad()
  },

  _onLoad(){
    this.setData({
      totalPrices: 0,
      total: 0,
    })
    carts.getCarts((res) => {
      this.setData({
        cartsList: res,
      })
    })
  },

  /* 多选 */
  _checkChange(e){
    var val = e.detail.value
    this.setData({
      checkVal: val
    })
    this._cartsIsCheck(val)
  },

  _cartsIsCheck(arr){
    let cartsList = this.data.cartsList
    let total = 0, totalPrices = 0
    for (var i = 0, len = cartsList.length; i<len; i++){
      if(~arr.indexOf(''+i)){
        cartsList[i].isCheck = true
        total += cartsList[i].count
        totalPrices += cartsList[i].stock_info.shop_price * cartsList[i].count
      }else{
        cartsList[i].isCheck = false
      }
    }
    this.setData({
      cartsList: cartsList,
      total: total,
      totalPrices: totalPrices.toFixed(2)
    })
  },

  /* 全选 */
  _allCheckChange(e){
    var bol = !!e.detail.value.length
    this.setData({
      allCheck: bol
    })
    this._allCarts(bol)
  },

  _allCarts(bol){
    let cartsList = this.data.cartsList
    let checkVal = []
    let total = 0, totalPrices = 0
    for (var i = 0, len = cartsList.length; i < len; i++) {
      if (bol) {
        checkVal.push(i)
        cartsList[i].isCheck = true
        total += cartsList[i].count
        totalPrices += cartsList[i].stock_info.shop_price * cartsList[i].count
      } else {
        cartsList[i].isCheck = false
      }
    }
    this.setData({
      cartsList: cartsList,
      checkVal: checkVal,
      total: total,
      totalPrices: totalPrices.toFixed(2)
    })
  },

  /* 编辑显示 */
  _editShow(){
    this.setData({
      edit: !this.data.edit
    })
    if(!this.data.edit){
      this._countChange()
    }
  },

  /* 完成 */
  _countChange(){
    let counts = this.data.counts
    let data = []
    for (let key in counts){
      let obj = {
        id: key,
        count: counts[key]
      }
      data.push(obj)
    }
    carts.countChange(data)
  },

  /* 删除 */
  _remove(){
    wx.showModal({
      content: '确定删除选中项？',
      confirmColor: '#d6000f',
      success: (res) => {
        if (res.confirm) {
          this._removeCarts()
        }
      }
    })
  },

  _removeCarts(){
    let ids = '';
    let cartsList = this.data.cartsList
    let checkVal = this.data.checkVal
    let newCartsList = []
    for (var i = 0, len = cartsList.length; i < len; i++) {
      if (~checkVal.indexOf('' + i)) {
        ids += ids ? ',' + cartsList[i].id : cartsList[i].id
      }else{
        newCartsList.push(cartsList[i])
      }
    }
    carts.deleteCarts(ids)
    this.setData({
      cartsList: newCartsList,
      total: 0,
      totalPrices: 0
    })
  },

  _goSettlement(){
    let ids = '';
    let cartsList = this.data.cartsList
    let checkVal = this.data.checkVal
    for (var i = 0, len = cartsList.length; i < len; i++) {
      if (~checkVal.indexOf('' + i)) {
        ids += ids ? ',' + cartsList[i].id : cartsList[i].id
      }
    }

    wx.navigateTo({
      url: '../settlement/settlement?ids=' + ids
    })
  },

  _countInput(e) {
    let index = carts.getDataSet(e,'index')
    let cart = this.data.cartsList[index]
    countChange.countInput(this, 'cartsList[' + index + '].count', e.detail.value, cart.stock_info.stock)
    this._counts(index)
  },

  _minusCount(e) {
    let index = carts.getDataSet(e, 'index')
    let cart = this.data.cartsList[index]
    countChange.minusCount(this, 'cartsList[' + index + '].count', cart.count)
    this._counts(index)
  },

  _addCount(e) {
    let index = carts.getDataSet(e, 'index')
    let cart = this.data.cartsList[index]
    countChange.addCount(this, 'cartsList[' + index + '].count', cart.count, cart.stock_info.stock)
    this._counts(index)
  },

  _counts(index){
    let cart = this.data.cartsList[index]
    this.setData({
      ['counts.' + cart.id] : cart.count
    })
  }
})