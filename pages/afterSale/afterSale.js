import validate from "../../utils/validate"
import AfterSale from '../../model/AfterSale.js'
let afterSale = new AfterSale()

Page({

    data: {
        params: null,
        info: null,
        stateIndex: null,
        reasons: null,
        reasonIndex: null
    },

    onLoad: function (options) {
        this._onLoad(options)
    },

    _onLoad(data){
        afterSale.getCreateAfterSale(data,(res) => {
            this.setData({
                info: res,
                params: data
            })
        })
    },

    /* 收货状态改变 */
    _stateChange(e){
        this._input(e)
        let reasons = this.data.info.reasonList[this.data.stateIndex].reason_list
        this.setData({
            reasons: reasons
        })
    },

    /* 输入金额 */
    _moneyInput(e){
      let even = e;
      if (even.detail.value > this.data.info.carts.proPrice){
        even.detail.value = this.data.info.carts.proPrice
      }
      this._input(even)
    },

    _input(e){
        afterSale.iptChange(e,this)
    },

    /* 申请售后 */
    _applyForRefund(){
        let data = this._getParams();
        if(data){
          afterSale.applyForRefund(data, (res) => {
              if(res.error_code == 0){
                  wx.redirectTo({
                      url: '/pages/afterSaleList/afterSaleList',
                  })
              }
          })
        }
    },

    /* 获取参数 */
    _getParams(){
        let params = this.data.params
        if(!this.data.reasonIndex){
            wx.showToast({
                title: '请选择退款理由',
                icon: 'none',
                duration: 2000
            })
            return false
        }
        params.productState = this.data.reasons[this.data.reasonIndex].state
        params.reasonId = this.data.reasons[this.data.reasonIndex].id
        if(this._validateParams(params)){
          return params
        }
        return false
    },

    /* 验证参数 */
    _validateParams(params){
        return  validate.requireVal('请选择货物状态', params.productState)&&
            validate.requireVal('请选择退款理由', params.reasonId) &&
            validate.requireVal('请输入退款金额', params.money)
    }
})