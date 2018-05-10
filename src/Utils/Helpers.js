function* entries(obj) {
   for (let key of Object.keys(obj)) {
     yield [key, obj[key]]
   }
}

export default class Helpers {

  static hasOwn(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key)
  }

  static setState(n, d){ // n = new state, d = default state
    let s = d
    for (let [key, val] of entries(n)) {
      s[key] = val // override default properties with ones defined in the new state object
    }
    return s
  }

}
