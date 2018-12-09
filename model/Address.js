import Base from 'Base.js'

class Address extends Base{

  constructor(){
    super()
  }

  /* 获取地址列表 */
  getAddressList(callback){
    let params = {
      url: '/v1/getAddressList',
      type: 'post',
      sCallback:(res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }

  /* 设置默认地址 */
  setDefaultAddress(id,callback){
    let params = {
      url: '/v1/setDefaultAddress',
      data:{
        id: id
      },
      type: 'post',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }

  /* 删除默认地址 */
  deleteAddress(id, callback) {
    let params = {
      url: '/v1/deleteAddress',
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

  /* 获取地址详情 */
  getInfo(id, callback){
    let params = {
      url: '/v1/getAddress',
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

  /* 获取省份 */
  getProvince(callback){
    let params = {
      url: '/v1/getProvince',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }

  /* 获取城市 */
  getCity(id,callback) {
    let params = {
      url: '/v1/getCity',
      data:{
        id: id
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }

  /* 获取县区 */
  getArea(id,callback) {
    let params = {
      url: '/v1/getArea',
      data: {
        id: id
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
  
  /* 修改或新增 */
  editAddress(data, callback) {
    let params = {
      url: '/v1/editAddress',
      type: 'post',
      data: data,
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }

}

export default Address