import Helpers from './Helpers'

export default class SaveState {

  static getSaveState() {
    return JSON.parse(localStorage.getItem('SaveState'))
  }

  static setSaveState(state) {
    localStorage.setItem('SaveState', JSON.stringify(state))
    return this.getSaveState()
  }

  static setSaveStateProperty(key, val) {
    let state = JSON.parse(localStorage.getItem('SaveState'))
    state[key] = val
    this.setSaveState(state)
    return this.getSaveState()
  }

  static getSaveStateProperty(key, val) {
    let state = JSON.parse(localStorage.getItem('SaveState'))
    if(Helpers.hasOwn(state, key)){
      return state[key]
    }
    else{
      return undefined
    }
  }

}
