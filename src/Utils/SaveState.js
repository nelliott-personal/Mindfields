import Helpers from './Helpers'

/*

Manages the saved game state in the user's LocalStorage.  The state is an object formatted like:

{
  GameSeed:1234,
  Player:{ ... }, // Player state
  Planets:{ ... } // State of all rooms organized into chunks, and chunks into planets (faster lookups)
}

*/

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
    return this.getSaveState()[key]
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
