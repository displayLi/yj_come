import validate from '../../utils/validate.js'
import config from '../../config.js'
import BindMobile from '../../model/BindMobile.js'
let bindMobile = new BindMobile()

Page({
  data: {
    /* 数据 */
    mobile: null,
    code: null,

    /* 控制 */
    isAgree: true,
    codeState: true,
    codeTime: 0,
    codeText: '获取验证码'
  },

  onLoad: function () {
    this.setData({
      codeTime: config.codeTime
    })
  },

  _input(e){
    bindMobile.iptChange(e, this)
  },

  /* 同意条款 */
  _agressChange(e){
    this.setData({
      isAgree: e.detail.value.length
    });
  },

  /* 获取验证码 */
  _getCode(){
    if (this.data.codeState){
      let mobile = this.data.mobile
      if (validate.mobile(mobile)) {
        bindMobile.getSmsCode(mobile, (res) => {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 3000
          })
          this._countdown()
        })
      }
    }
  },

  /* 倒计时 */
  _countdown(){
    this.setData({
      codeState: false
    })
    this._time(this.data.codeTime)
  },

  _time(time){
    var that = this
    setTimeout(function(){
      if(time > 0){
        time-- 
        that.setData({
          codeText: time + 's重新发送'
        })
        that._time(time) 
      }else{
        that.setData({
          codeState: true,
          codeText: '重新获取'
        })
      }
    },1000)
  },

  /* 绑定手机号 */
  _bindMobile(){
    bindMobile.bindMobile(this.data.mobile, this.data.code, (res) => {
      if (res.error_code == 0){
        wx.navigateBack()
      }
    })
  }
})