import AfterSale from  '../../model/AfterSale'
let afterSale = new AfterSale()

Page({

    data: {
        page: 1,
        pageSize: 3,

        list: [],
        has_more: true,
    },

    onLoad: function () {
        this._onLoad()
    },

    _onLoad(){
        this._getAfterSaleList()
    },

    _getAfterSaleList(){
        if(this.data.has_more){
            let data = {
                page: this.data.page,
                pageSize: this.data.pageSize
            }
            afterSale.getAfterSaleList(data,(res) => {
                let list = [...this.data.list,...res.data]
                this.setData({
                    list: list,
                    has_more: res.has_more,
                    page: data.page + 1
                })
            })
        }
    },

    onReachBottom: function () {
        this._getAfterSaleList()
    },

})