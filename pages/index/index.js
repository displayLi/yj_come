import Index from '../../model/Index.js'
let index = new Index();

Page({

    data: {
        index: null,
        swiperCompatibility: null,

        inputShowed: false,
        inputVal: "",
    },

    onLoad: function (options) {
        this._onLoad()
    },

    _onLoad(){
        index.getIndex((res) => {
            this.setData({
                index: res,
                swiperCompatibility: wx.canIUse('swiper.display-multiple-items')
            })
        })
    },

    _showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    _hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    _clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    _inputTyping: function (e) {
        this.setData({
            inputVal: e.detail.value
        });
    }
})