import Helpers from '../Utils/Helpers'
import noise from 'noisejs-ilmiont'

export default class Room {

  constructor(state = {
    x: 0,
    y: 0,
    lastEntered: Date.now(),
    seed: 0
  })
  {
    this.state = state
    noise.seed(this.state.seed)
    this.state.noiseVal = Math.abs(noise.simplex2(this.state.x, this.state.y))
    Helpers.log(this.state)

  }

}
