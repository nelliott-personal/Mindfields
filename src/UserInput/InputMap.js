import Helpers from '../Utils/Helpers'

export default class InputMap {
  constructor(config) {
    this.state = Helpers.setState(config.state, this.defaultState)
  }

  getDefaultState(){
    return {
      UP: 'w',
      DOWN: 's',
      LEFT: 'a',
      RIGHT: 'd',
      PRIMARY_FIRE: 'MOUSE1',
      SECONDARY_FIRE: 'MOUSE2',
      BOOST: 'SHIFT'
      ABILITY_1: 'SPACE',
      ABILITY_2: 'q',
      ABILITY_3: 'e'
    }
  }

}
