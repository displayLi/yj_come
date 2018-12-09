import Base from 'Base.js'

class Product extends Base{

  constructor(){
    super()
  }

  /* 获取商品列表 */
  getList(data,callback){
    let params = {
      url: '/v1/productList',
      data: data,
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }

  /* 获取商品详情 */
  getInfo(data,callback){
    let params = {
      url: '/v1/productInfo',
      data: data,
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }

  /* 获取商品评价 */
  getComments(id,callback){
    let params = {
      url: '/v1/getComments',
      data: {
        id: id
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }

  /* 获取商品规格 */
  getProductSpec(id,callback){
    let params = {
      url: '/v1/productSpec',
      data: {
        id: id
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }

}

export default Product