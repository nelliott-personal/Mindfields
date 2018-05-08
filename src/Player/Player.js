import Helpers from '../Utils/Helpers'
import SaveState from '../Utils/SaveState'

export default class Player {

  constructor(state)
  {
    this.state = state || this.defaultState
    Helpers.log('Player Init')
  }

  get defaultState(){
    return {
      id: 1,
      name: 'PlayerName',
      lastPlayed: Date.now(),
      x:0,
      y:0,
      inventory: [],
      ships: [{
        id:1,
        ship:{
          // default ship
        }
      }],
      shipID: 1 // what ship you're in
    }
  }

}
