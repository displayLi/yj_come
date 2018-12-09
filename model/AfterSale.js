import Base from 'Base.js'

class AfterSale extends Base{

    constructor(){
        super()
    }

    /* 获取预退款信息 */
    getCreateAfterSale(data, callback) {
        let params = {
            url: '/v1/getCreateAfterSale',
            type: 'post',
            data: data,
            sCallback: (res) => {
                callback && callback(res)
            }
        }
        this.request(params)
    }

    /* 申请退款 */
    applyForRefund(data, callback) {
        let params = {
            url: '/v1/applyForRefund',
            type: 'post',
            data: data,
            sCallback: (res) => {
                callback && callback(res)
            }
        }
        this.request(params)
    }

    /* 获取售后列表 */
    getAfterSaleList(data, callback) {
        let params = {
            url: '/v1/getAfterSaleList',
            type: 'post',
            data: data,
            sCallback: (res) => {
                callback && callback(res)
            }
        }
        this.request(params)
    }

    /* 获取售后详情 */
    getAfterSaleInfo(id, callback) {
      let params = {
        url: '/v1/getAfterSaleInfo',
        type: 'post',
        data: {
          id: id
        },
        sCallback: (res) => {
          callback && callback(res)
        }
      }
      this.request(params)
    }

    /* 撤销退款 */
    cancelTheRefund(id, callback) {
        let params = {
            url: '/v1/cancelTheRefund',
            type: 'post',
            data: {
                id: id
            },
            sCallback: (res) => {
                callback && callback(res)
            }
        }
        this.request(params)
    }

    /* 获取所有快递 */
    getLogistics(callback){
        let params = {
            url: '/v1/getLogistics',
            sCallback: (res) => {
                callback && callback(res)
            }
        }
        this.request(params)
    }

    /* 提交物流信息 */
    submitLogistics(data, callback) {
        let params = {
            url: '/v1/submitLogistics',
            type: 'post',
            data: data,
            sCallback: (res) => {
                callback && callback(res)
            }
        }
        this.request(params)
    }

}

export default AfterSale