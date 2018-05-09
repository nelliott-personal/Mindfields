import Helpers from '../Utils/Helpers'
import Room from './Room'

/*

  A Chunk has 9 Rooms

*/
const slices = {
  TOP    : [0, 1, 2],
  RIGHT  : [2, 5, 8],
  BOTTOM : [6, 7, 8],
  LEFT   : [0, 3, 6],
  MIDDLE : [3, 4, 5],
  CENTER : [1, 4, 7]
}



export default class Chunk {

  constructor (state)
  {
    this.state = state || this.defaultState
    this.state.Rooms = this.setRooms(this.state.x, this.state.y, this.state.seed)
  }

  get defaultState(){
    return {
      x: 0,
      y: 0,
      seed: 0,
      Rooms: Array.apply(null, Array(9)).map(x => x = null)
    }
  }

  get id(){
    return this.state.x + '^' + this.state.y
  }

  get name(){
    return 'chunk-' + this.state.x + '^' + this.state.y
  }

  setRooms (x, y, seed) {
    var xInc = -1
    var yInc = -1
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

  shiftRooms(direction){
    let oldRooms = []
    switch(direction){
      case 'UP':
        oldRooms = this.getSlice(slices.TOP)
        this.swapSlices(slices.BOTTOM, slices.MIDDLE)
        this.swapSlices(slices.MIDDLE, slices.TOP)
        this.generateSlice(slices.TOP)
      break
      case 'RIGHT':
        oldRooms = this.getSlice(slices.RIGHT)
        this.swapSlices(slices.LEFT, slices.CENTER)
        this.swapSlices(slices.CENTER, slices.RIGHT)
        this.generateSlice(slices.RIGHT)
      break
      case 'DOWN':
        oldRooms = this.getSlice(slices.BOTTOM)
        this.swapSlices(slices.TOP, slices.MIDDLE)
        this.swapSlices(slices.MIDDLE, slices.BOTTOM)
        this.generateSlice(slices.BOTTOM)
      break
      case 'LEFT':
        oldRooms = this.getSlice(slices.LEFT)
        this.swapSlices(slices.RIGHT, slices.CENTER)
        this.swapSlices(slices.CENTER, slices.LEFT)
        this.generateSlice(slices.LEFT)
      break
    }
  }
  getSlice(s){
    let rooms = []

    for(var i = 0; i < s.length; i++){
      rooms.push(this.Rooms[s[i]])
    }
    return rooms
  }
  swapSlices(s1, s2){
    let tempRooms = this.Rooms;
    for(var i = 0; i < s1.length; i++){
      this.Rooms[s1[i]] = this.tempRooms[s2[i]]
    }
  }

  generateSlice(s){
    for(var i = 0; i < s.length; i++){
      this.Rooms[I] = new Room(new Room({
        x: 0,
        y: 0,
        lastEntered: 'never',
        seed: this.state.seed
      }))
    }
  }

  generateRoom (x, y) {

  }

}
