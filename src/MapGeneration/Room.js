import Helpers from '../Utils/Helpers'
import noise from 'noisejs-ilmiont'



export default class Room {

  constructor(state)
  {
    this.state = Helpers.setState(state, this.defaultState)
    noise.seed(this.state.seed)
    this.state.noiseVal = Math.abs(noise.simplex2(this.state.x, this.state.y))
  }

  get defaultState(){
    return {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      lastActive: Date.now(),
      seed: 0,
      noiseVal:0
    }
  }

  get id(){
    return this.state.x + '^' + this.state.y
  }

  get name(){
    return 'Room' + this.state.x + '^' + this.state.y
  }

}
