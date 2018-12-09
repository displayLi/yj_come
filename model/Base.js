import config from '../config.js'

class Base{

  constructor() {
    this.baseUrl = config.baseUrl
  }

  /* 请求 */
  request(params) {
    let that = this,
      url = this.baseUrl + params.url
    if (!params.type) {
      params.type = 'get'
    }
    wx.request({
      url: url,
      method: params.type,
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      data: params.data,
      success: (res) => {
        if (res.data.error_code){
          this.error(res.data, params)
        }
        params.sCallback && params.sCallback(res.data)
      },
      fail: (err) => {
        console.log(err)
      }
    })
  }

  /* 请求错误处理 */
  error(res, params){
    console.log(res.error_code)
    switch (res.error_code){
      case 0:
            return true
            break
      case 10001:
            this.getToken(() => {
              this.request(params)
            })
            break
      case 10006:
            this.goBindMobile()
            break
      case 10007:
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            })
            break
    }
  }

  /* 获取token */
  getToken(callback){
    wx.login({
      success: res => {
        let params = {
          url: '/v1/wx/getToken',
          data: {
            code: res.code,
          },
          type: 'post',
          sCallback: (res) => {
            wx.setStorageSync('token', res.token)
            if (res.needBindMobile) {
              this.goBindMobile()
            } else {
              callback && callback()
            }
          }
        }
        this.request(params)
      }
    })
  }

  goBindMobile(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  }

  /* 获得元素上的绑定的值 */
  getDataSet(event, key) {
    return event.currentTarget.dataset[key]
  };
  
  /* 更改input的值 */
  iptChange(event, that) {
    that.setData({
      [event.currentTarget.dataset.name]:event.detail.value
    })
  }
  
}

export default Base