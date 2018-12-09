import WxParse from '../../utils/wxParse/wxParse.js'
import countChange from '../../utils/countChange.js'

import Product from '../../model/Product.js'
let product = new Product()

import Carts from '../../model/Carts.js'
let carts = new Carts()

Page({
  data: {
    /* 数据 */
    product: null,            // 商品列表 
    commentList: null,        // 评论列表
    productSpecInfo: null,    // 规格详情列表
    specToSizelist: {        // 规格尺码对应列表
      spec: null,
      size: null
    },
    specName: null,           // 规格名称
    sizeName: null,           // 尺码名称
    count: 1,                 // 数量
    carts:{                   // 加入购物车头部
      product_name: null,
      pic: null,
      price: null,
    },
    stockInfo: null,              // 库存信息
    snav: {                   // 详情与评论
      detail: 1,
      comments: 2,
    },

    /* 控制 */
    snavbar: 1,               
    addCartHidden: true
  },

  onLoad: function (options) {
    this._onLoad(options)
  },

  _onLoad(params){
    product.getInfo(params,(res) => {
      this.setData({
        product: res,
        ['carts.product_name']: res.product_name
      })
      this._setCarts(res.pic_list[0].pic, res.shop_price)

      var that = this
      WxParse.wxParse('productContent', 'html', res.product_content, that)
    })
  },

  /* 详情与评价切换 */
  _snavChange(e){
    let snavbar = product.getDataSet(e,'snavbar')
    this.setData({
      snavbar: snavbar
    })

    if (snavbar == 2 && !this.data.commentList){
      let id = this.data.product.id
      product.getComments(id, (res) => {
        this.setData({
          commentList: res
        })
      })
    }

  },

  /* 加入购物车弹窗显示隐藏 */
  _addCartShow(){
    this.setData({
      addCartHidden: !this.data.addCartHidden
    })
    if (!this.data.productSpecInfo) {
      this._getProductSpec()
    }
  },

  /* 获取规格列表 */
  _getProductSpec(){
    let id = this.data.product.id
    product.getProductSpec(id, (res) => {
      let spec = []
      let size = [],sizeObj = {}

      for (let i = 0, iLen = res.length; i < iLen; i++){
        let specItem = res[i]
        spec.push(specItem.spec)
        for (let j = 0, jLen = specItem.stock.length; j < jLen; j++){
          var sizeItem = specItem.stock[j]
          if (!sizeObj[sizeItem.size]) {
            size.push(sizeItem.size)
            sizeObj[sizeItem.size] = true
          }
        }
      }

      this.setData({
        productSpecInfo: res,
        ['specToSizelist.spec']: spec,
        ['specToSizelist.size']: size
      })
    })
  },

  /* 设置加入购物车头部 */
  _setCarts(pic, price){
    this.setData({
      ['carts.pic']: pic,
      ['carts.price']: price
    })
  },

  /* 选择规格 */
  _selectSpec(e){
    let spec = product.getDataSet(e,'spec')
    let specInfo = this._schSpec(spec)

    let sizeList = []
    for (let i = 0, len = specInfo.stock.length; i < len; i++){
      let stock = specInfo.stock[i]
      sizeList.push(stock.size);
    }

    this.setData({
      specName: spec,
      ['specToSizelist.size']: sizeList,
      ['carts.pic']: specInfo.pic,
      count: 1
    })
    this._setStock();
  },

  /* 通过规格名称搜索规格 */
  _schSpec(specName){
    let productSpecInfo = this.data.productSpecInfo
    for (let i = 0, len = productSpecInfo.length; i < len; i++){
      let specItem = productSpecInfo[i]
      if (specItem.spec == specName){
        return specItem
      }
    }
  },

  /* 选择尺码 */
  _selectSize(e){
    let size = product.getDataSet(e, 'size')
    let specList = this._schSpecList(size)
    this.setData({
      sizeName: size,
      ['specToSizelist.spec']: specList,
      count: 1
    })
    this._setStock();
  },

  /* 通过尺码获取规格列表 */
  _schSpecList(size){
    let productSpecInfo = this.data.productSpecInfo
    let specList = []
    for (let i = 0, iLen = productSpecInfo.length; i < iLen; i++) {
      let specItem = productSpecInfo[i]
      for (let j = 0, jLen = specItem.stock.length; j < jLen; j++) {
        var sizeItem = specItem.stock[j]
        if (sizeItem.size == size) {
          specList.push(specItem.spec)
        }
      }
    }
    return specList
  },

  /* 查询库存信息 */
  _setStock(){
    let specName = this.data.specName
    let sizeName = this.data.sizeName
    if (specName && sizeName){
      let productSpecInfo = this.data.productSpecInfo
      for (let i = 0, iLen = productSpecInfo.length; i < iLen; i++) {
        let specItem = productSpecInfo[i]
        if (specItem.spec == specName){
          for (let j = 0, jLen = specItem.stock.length; j < jLen; j++) {
            var sizeItem = specItem.stock[j]
            if (sizeItem.size == sizeName) {
              this.setData({
                stockInfo: sizeItem,
                ['carts.price']: sizeItem.shop_price
              })
            }
          }
        }
      }
    }
  },

  /* 加入购物车 */
  _addCarts(gCallback){
    let stockInfo = this.data.stockInfo
    if (stockInfo){
      let params = {
        id: stockInfo.id,
        count: this.data.count
      }
      carts.addCarts(params, (res) => {
        if(res.error_code == 0){
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
          gCallback && gCallback()
        }
      })
    }
  },

  /* 立即购买 */
  _purchaseNow(){
    this._addCarts(() => {
      wx.switchTab({
        url: '/pages/carts/carts',
        // success: (e) => {
        //   var page = getCurrentPages().pop();
        //   console.log(page)
        //   if (page == undefined || page == null) return;
        //   page.onShow();
        // }
      })
    })
  },

  _countInput(e) {
    let stockInfo = this.data.stockInfo
    if (stockInfo) {
      countChange.countInput(this, 'count', e.detail.value, stockInfo.stock)
    }
  },

  _minusCount(){
    let stockInfo = this.data.stockInfo
    if (stockInfo){
      countChange.minusCount(this, 'count', this.data.count)
    }
  },

  _addCount(){
    let stockInfo = this.data.stockInfo
    if (stockInfo) {
      countChange.addCount(this, 'count', this.data.count, stockInfo.stock)
    }
  }
})