import validate from '../../utils/validate.js'
import Address from '../../model/Address.js'
let address = new Address()

Page({
  data: {
    ids: null,            // 购物车id,选择地址时使用
    addressInfo: {        // 收货地址详细
      default: 0
    },    

    provinceIndex: 0,     // 省份选择
    provinceList: null,   // 省份列表

    cityIndex: 0,         // 城市选择
    cityList: null,       // 城市列表

    areaIndex: 0,         // 县区选择
    areaList: null,       // 县区列表

    detaileLen: 0         // 详情字数
  },

  onLoad: function (options) {
    this._onLoad(options)
  },

  _onLoad(data){
    if(data.id){
      address.getInfo(data.id,(res) => {
        this.setData({
          addressInfo: res,
          detaileLen: res.detaile.length
        })
        this._getCity(res.province.provinceID)
        this._getArea(res.city.cityID)
      })
    }
    if(data.ids){
      this.setData({
        ids: data.ids
      })
    }
    this._getProvince()
  },

  /* 选择省份 */
  _provinceChange(e){
    address.iptChange(e,this)
    let index = this.data.provinceIndex
    let province = this.data.provinceList[index]
    this._getCity(province.provinceID)
    this.setData({
      ['addressInfo.province']: province,
      ['addressInfo.city']: null,
      ['addressInfo.area']: null,
    })
  },

  /* 选择城市 */
  _cityChange(e) {
    address.iptChange(e, this)
    let index = this.data.cityIndex
    let city = this.data.cityList[index]
    this._getArea(city.cityID)
    this.setData({
      ['addressInfo.city']: city,
      ['addressInfo.area']: null,
    })
  },

  /* 选择县区 */
  _areaChange(e) {
    address.iptChange(e, this)
    let index = this.data.areaIndex
    let area = this.data.areaList[index]
    this._getArea(area.areaID)
    this.setData({
      ['addressInfo.area']: area,
    })
  },

  _getProvince(){
    address.getProvince((res) => {
      this.setData({
        provinceList: res
      })
    })
  },

  _getCity(id){
    address.getCity(id,(res) => {
      this.setData({
        cityList: res
      })
    })
  },

  _getArea(id){
    address.getArea(id, (res) => {
      this.setData({
        areaList: res
      })
    })
  },

  _input(e) {
    if (this.data.detaileLen >= 200) {
      return false
    }
    address.iptChange(e, this)
    let str = this.data.addressInfo.detaile
    this.setData({
      detaileLen: str.length
    })
  },

  /* 默认地址 */
  _defaultChange(){
    this.setData({
      ['addressInfo.default']: this.data.addressInfo.default ? 0 : 1
    })
  },

  _formSubmit(e){
    let params = this._getParams(e.detail.value)
    if (params){
      address.editAddress(params,(res) => {
        let ids = this.data.ids
        let path = '/pages/addressList/addressList'
        if (ids) {
          path += '?ids=' + ids
        }
        wx.navigateTo({
          url: path
        })
      })
    }
  },
  
  /* 获取参数 */
  _getParams(data){
    let params = data;
    let addressInfo = this.data.addressInfo
    if (addressInfo.id){
      params.id = addressInfo.id
    }
    params.provinceId = addressInfo.province ? addressInfo.province.provinceID : null
    params.cityId = addressInfo.city ? addressInfo.city.cityID : null
    params.areaId = addressInfo.area ? addressInfo.area.areaID : null
    params.default = addressInfo.default
    if (this._validateParams(params)){
      return params
    }
    return false
  },

  /* 验证 */
  _validateParams(params){
    return  validate.requireVal('姓名不能为空', params.consignee)&&
            validate.mobile(params.mobile) &&
            validate.requireVal('请选择省份', params.provinceId) &&
            validate.requireVal('请选择城市', params.cityId) &&
            validate.requireVal('请选择县区', params.areaId) &&
            validate.requireVal('请填写详细地址', params.detaile)
  }

})