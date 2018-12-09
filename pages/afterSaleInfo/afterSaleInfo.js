import AfterSale from '../../model/AfterSale.js'
import config from '../../config'
let afterSale = new AfterSale()

Page({

    data: {
        /* 数据 */
        info: null,
        logisticsList: null,
        logisticsIndex: null,
        logisticsCode: null,

        /* 控制 */
        afterSaleCount: null,
        writeShow: false,
    },

    onLoad: function (options) {
        this._onLoad(options)
    },

    _onLoad(data){
        afterSale.getAfterSaleInfo(data.id,(res) => {
            this.setData({
                info: res,
                afterSaleCount: config.afterSaleCount
            })
            if(res.status.status == 3){
                afterSale.getLogistics((res) => {
                    this.setData({
                        logisticsList: res
                    })
                })
            }
        })
    },

    /* 重新申请 */
    _goModality(){
        let info = this.data.info
        let id = info.id
        let cartsId = info.snap_carts.id
        let orderId = info.order.id
        wx.navigateTo({
          url: '/pages/modality/modality?cartsId=' + cartsId + '&orderId=' + orderId + '&id=' + id,
        })
    },

    /* 撤销退款 */
    _cancelTheRefund(){
        wx.showModal({
            content: '确定撤销退款？',
            confirmColor: '#d6000f',
            success: (res) => {
                if (res.confirm) {
                    let id = this.data.info.id
                    afterSale.cancelTheRefund(id,(res) => {
                        if(res.error_code == 0){
                            wx.navigateTo({
                              url: '/pages/afterSaleList/afterSaleList',
                            })
                        }
                    })
                }
            }
        })
    },

    _writeShow(){
        this.setData({
            writeShow: !this.data.writeShow
        })
    },

    _input(e){
        afterSale.iptChange(e, this)
    },

    _submitLogistics(){
        let logistics = this.data.logisticsList[this.data.logisticsIndex]
        let info = this.data.info
        let params = {
            id: info.id,
            logisticsId: logistics.id,
            logisticsCode: this.data.logisticsCode
        }
        afterSale.submitLogistics(params,(res) => {
            if(res.error_code == 0){
                info.logistics_code = params.logisticsCode
                info.logistics = logistics
                this.setData({
                    info: info,
                    writeShow: false
                })
            }
        })
    }
})