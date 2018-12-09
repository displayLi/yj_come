import Base from 'Base.js'

class Index extends Base{
  
  constructor(){
    super()
  }

  /* 获取首页 */
  getIndex(callback){
    let params = {
      url: '/v1/index',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
  
}

export default Index