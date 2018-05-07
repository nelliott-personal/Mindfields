export default class Helpers {

  static log(str, obj = null) {
    let logging = true // override on production
    if(logging){
      if(obj)
        console.log(str, obj)
      else
        console.log(str)
    }
  }

  static hasOwn(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key)
  }
  
}
