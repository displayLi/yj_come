import Category from '../../model/Category.js'
let category = new Category()

Page({

  data: {
    categoryId: null,
    category: null,
    extCategory: null
  },

  onLoad: function (options) {
    this._onLoad()
  },

  _onLoad(){
    category.getCategory((res) => {
      this.setData({
        category: res,
        categoryId: res[0].id
      })
      this._getExtCategory();
    });
  },

  _categoryChange(e){
    let id = category.getDataSet(e, 'id')
    this.setData({
      categoryId: id
    })
    this._getExtCategory();
  },

  _getExtCategory(){
    category.getExtCategory(this.data.categoryId, (res) => {
      this.setData({
        extCategory: res
      })
    })  
  }

})