function* entries(obj) {
   for (let key of Object.keys(obj)) {
     yield [key, obj[key]]
   }
}

export default class Helpers {

  static hasOwn(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key)
  }

  static setState(n, d){
    let s = d
    for (let [key, val] of entries(n)) {
      s[key] = val
    }
    return s
  }

}
