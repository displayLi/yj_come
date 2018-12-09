import Category from '../../model/Category.js'
import Product from '../../model/Product.js'
let category = new Category()
let product = new Product()

Page({

  data: {
    /* 参数 */
    params: null,
    catId:null,
    order: 2,
    priceMin: null,
    priceMax: null,

    /* 数据 */
    category: null,
    products: null,
    has_more: true,
    orderEnum: {
      productSales: 1,
      productSalesDesc: 2,
      shopPrice: 3,
      shopPriceDesc: 4
    },

    /* 控制 */
    filtrateHidden: true,
    listStyle: false
  },

  onLoad: function (options) {
    this._onLoad();
    this._initParams(options)
  },

  _initParams(params){
    this.setData({
      params: params,
      ['params.page']: 1,
      ['params.pageSize']: 10,
    })
    this._getProducts(true);
  },

  _onLoad(){
    var that = this
    wx.getStorage({
      key: 'listStyle',
      success: function (res) {
        that.setData({
          listStyle: res.data
        })
      }
    })

    category.getCategory((res) => {
      this.setData({
        category: res
      })
    })

  },

  /* 筛选显示或隐藏 */
  _filtrateHidden(){
    this.setData({
      filtrateHidden: !this.data.filtrateHidden
    })
  },

  /* 分类切换 */
  _categoryChange(e){
    let id = product.getDataSet(e,'id')
    this.setData({
      catId: id
    })
  },

  /* input改变触发 */
  _input(e){
    product.iptChange(e,this)
  },

  /* 提交 */
  _submit(){
    let catId = this.data.catId
    if (catId) {
      this._initParams({
        catId: catId
      })
    }
    this._getProducts(true);
    this._filtrateHidden();
  },

  /* 获取列表 */
  _getProducts(reset){
    if(reset){
      this.setData({
        ['params.page']: 1
      })
    }
    let data = this._getParams()
    product.getList(data,(res) => {
      let products = reset ? res.data : [...this.data.products, ...res.data]
      this.setData({
        has_more: res.has_more,
        products: products
      })
    })
  },

  /* 获取所有参数 */
  _getParams(){
    let order = this.data.order
    let priceMin = this.data.priceMin
    let priceMax = this.data.priceMax

    let data = this.data.params
    if (order){
      data.order = order
    }
    if (priceMin) {
      data.priceMin = priceMin
    }
    if (priceMax) {
      data.priceMax = priceMax
    }
    return data
  },

  /* 销量排序 */
  _salesOrderBy(){
    let order = this.data.order
    let orderEnum = this.data.orderEnum

    this.setData({
      order: order == orderEnum.productSales ? orderEnum.productSalesDesc : orderEnum.productSales,
      page: 1
    })
    this._getProducts(true);
  },

  /* 销量排序 */
  _priceOrderBy(){
    let order = this.data.order
    let orderEnum = this.data.orderEnum

    this.setData({
      order: order == orderEnum.shopPrice ? orderEnum.shopPriceDesc : orderEnum.shopPrice,
      page: 1
    })
    this._getProducts(true);
  },

  /* 设置页面显示风格 */
  _listStyleChange(){
    this.setData({
      listStyle: !this.data.listStyle
    })
    wx.setStorage({
      key: 'listStyle',
      data: this.data.listStyle
    })
  },

  catchFun(){
    return false
  },

  /* 页面上拉触底事件的处理函数 */
  onReachBottom: function () {
    if (this.data.has_more){
      this.setData({
        ['params.page']: this.data.params.page+1
      })
      this._getProducts(false);
    }
  },
})