import Helpers from './Helpers'
import localforage from 'localforage'

/*

Manages the saved game state in the user's indexeddb, or if that's unavailable, localstorage.

*/

export default class SaveState {

  static loadState() {
    return localforage.getItem('SaveState')
  }

  static saveState(state) {
    return localforage.setItem('SaveState', state)
  }

  static loadRoom(name){
    return localforage.getItem(name)
  }

  static saveRoom(Room) {
    return localforage.setItem(Room.name, Room.state)
  }

}
