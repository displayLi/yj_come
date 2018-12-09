import Base from 'Base.js'

class Category extends Base{
  
  constructor(){
    super()
  }
  
  /* 一级分类 */
  getCategory(callback){
    let params = {
      url: '/v1/cat',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }

  /* 二级分类 */
  getExtCategory(id,callback){
    let params = {
      url: '/v1/extendCat',
      data: {
        id: id
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }

}

export default Category