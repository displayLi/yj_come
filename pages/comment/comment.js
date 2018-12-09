import Order from '../../model/Order.js'
let order = new Order()

Page({

    data: {
        id: null,
        cardsList: null,
        comments: [],
        success: false
    },

    onLoad: function (options) {
        this._onLoad(options)
    },

    _onLoad(data){
        order.getCommentProducts(data.id,(res) => {
            this.setData({
                id: data.id,
                cardsList: res
            })
        })
    },

    /* 评价内容 */
    _input(e){
        let cardsIndex = order.getDataSet(e,'cardsidx')
        if(!this.data.comments[cardsIndex]){
            this.setData({
                ['comments[' + cardsIndex + '].content']: '',
                ['comments[' + cardsIndex + '].grade']: 0
            })
        }
        this.setData({
            ['comments[' + cardsIndex + '].content']: e.detail.value
        })
    },

    /* 评分 */
    _gradeChange(e){
        let cardsIndex = order.getDataSet(e,'cardsidx')
        let index = order.getDataSet(e,'index')
        if(!this.data.comments[cardsIndex]){
            this.setData({
                ['comments[' + cardsIndex + '].content']: '',
                ['comments[' + cardsIndex + '].grade']: 0
            })
        }
        this.setData({
            ['comments[' + cardsIndex + '].grade']: index+1
        })
    },

    _comment(){
        let params = {
            id: this.data.id,
            comments: this.data.comments
        }
        order.commentOrder(params,(res) => {
            if(res.error_code == 0){
                this.setData({
                    success: true
                })
            }
        })
    },

    _goAllOrder(){
        wx.navigateTo({
            url: '/pages/orderList/orderList',
        })
    }
})