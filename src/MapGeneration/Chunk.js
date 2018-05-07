import Helpers from '../Utils/Helpers'
import Room from './Room'

/*

  A Chunk has 9 Rooms

*/

export default class Chunk {

  constructor (state = {
    x: 0,
    y: 0,
    seed: 0,
    Rooms: Array.apply(null, Array(9)).map(x => x = null)
  })
  {
    this.state = state
    this.state.Rooms = this.setRooms(this.state.x, this.state.y, this.state.seed)
  }

  setRooms (x, y, seed) {
    var xInc = -1;
    var yInc = -1;
    let rooms = new Array()
    for(var room of this.state.Rooms){
      rooms.push(new Room({
        x: x + xInc,
        y: y + yInc,
        lastEntered: 'never',
        seed: seed
      }))
      
      xInc++
      if(xInc == 2){
        xInc = -1
        yInc++
      }

    }
    return rooms
  }

  generateRoom (x, y) {

  }

}
