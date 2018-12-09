import Base from 'Base.js'

class Carts extends Base{

  constructor(){
    super()
  }

  /* 添加购物车 */
  addCarts(data, callback){
      let params = {
        url: '/v1/addCarts',
        type: 'post',
        data: data,
        sCallback: (res) => {
          callback && callback(res)
        }
      }
      this.request(params)
  }

  /* 获取购物车 */
  getCarts(callback) {
      let params = {
        url: '/v1/getCarts',
        type: 'post',
        sCallback: (res) => {
          callback && callback(res)
        }
      }
      this.request(params)
  }

  /* 更改数量 */
  countChange(arr, callback) {
      let params = {
        url: '/v1/countChange',
        type: 'post',
        data: {
          carts: arr
        },
        sCallback: (res) => {
          callback && callback(res)
        }
      }
      this.request(params)
  }

  /* 删除购物车 */
  deleteCarts(ids, callback) {
      let params = {
        url: '/v1/deleteCarts',
        type: 'post',
        data: {
          ids: ids
        },
        sCallback: (res) => {
          callback && callback(res)
        }
      }
      this.request(params)
  }

}

export default Carts