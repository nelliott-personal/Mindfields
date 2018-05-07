import Helpers from '../Utils/Helpers'
import SaveState from '../Utils/SaveState'

export default class Player {

  constructor(state = {
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
  })
  {
    this.state = SaveState.setSaveStateProperty('Player', state)
    Helpers.log('Player Init')
  }

}
