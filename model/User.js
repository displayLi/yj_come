import Base from 'Base.js'

class User extends Base{

  constructor(){
    super()
  }

  getPersonalCenter(callback){
    let params = {
      url: '/v1/getPersonalCenter',
      type: 'post',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params);
  }
}

export default User