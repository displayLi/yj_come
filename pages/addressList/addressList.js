import Address from '../../model/Address.js'
let address = new Address()

Page({
  data: {
    ids: null,
    addressList: null
  },

  onLoad: function (options) {
    this._onLoad(options)
  },

  _onLoad(data){
    if (data.ids) {
      this.setData({
        ids: data.ids
      })
    }
    address.getAddressList((res) => {
      this.setData({
        addressList: res
      })
    })
  },

  /* 设置默认地址 */
  _defaultChange(e){
    let id = e.detail.value
    let addressList = this.data.addressList
    for (let i = 0, len = addressList.length; i < len; i++){
      if (addressList[i].id == id){
        addressList[i].default = 1
      }else{
        addressList[i].default = 0
      }
    }
    address.setDefaultAddress(id)
    this.setData({
      addressList: addressList
    })
  },

  /* 删除默认地址 */
  _delAddress(e){
    wx.showModal({
      content: '确定删除选中项？',
      confirmColor: '#d6000f',
      success: (res) => {
        if (res.confirm) {
          this._delete(e)
        }
      }
    })
  },

  _delete(e){
    let index = address.getDataSet(e, 'index')
    let addressList = this.data.addressList
    let id = addressList[index].id
    address.deleteAddress(id)
    addressList.splice(index, 1)
    this.setData({
      addressList: addressList
    })
  }
})