import Base from 'Base.js'

class BindMobile extends Base{

  constructor(){
    super()
  }

  /* 获取短信 */
  getSmsCode(mobile,callback){
    let params = {
      url: '/v1/wx/getSmsCode',
      data:{
        mobile: mobile
      },
      type: 'post',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }

  /* 绑定手机 */
  bindMobile(mobile, code, callback) {
    let params = {
      url: '/v1/wx/bindMobile',
      data: {
        mobile: mobile,
        code: code
      },
      type: 'post',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
}

export default BindMobile