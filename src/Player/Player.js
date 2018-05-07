import Helpers from '../Helpers'
import SaveState from '../SaveState'

export default class Player {

  constructor(state = null) { //initialize a player with state object from saved-state, or blank for new player
    Helpers.log('Player Init')
    if( state ){
      this.state = state
    }
    else{
      this.state = {
        name:'PlayerName',
        lastPlayed:'timestamp',
        inventory:[],
        ships:[{
          id:1,
          ship:{
            // default ship
          }
        }],
        currentShipID: 1
      }
      SaveState.setSaveStateProperty('Player', this.state)
    }
  }
  
}
