import Helpers from '../Utils/Helpers'
import noise from 'noisejs-ilmiont'

export default class Room {

  constructor(state)
  {
    this.state = state || this.defaultState
    noise.seed(this.state.seed)
    this.state.noiseVal = Math.abs(noise.simplex2(this.state.x, this.state.y))
  }

  get defaultState(){
    return {
      x: 0,
      y: 0,
      lastEntered: Date.now(),
      seed: 0
    }
  }

}
