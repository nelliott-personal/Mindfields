export default class Helpers {
  
  static hasOwn(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key)
  }

}
