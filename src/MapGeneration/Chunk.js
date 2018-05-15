import Helpers from '../Utils/Helpers'
import Room from './Room'

/*

  A Chunk has 9 Rooms

*/

const slices = { // Helps deal with an array as a 3x3 grid
  TOP    : [0, 1, 2],
  RIGHT  : [2, 5, 8],
  BOTTOM : [6, 7, 8],
  LEFT   : [0, 3, 6],
  MIDDLE : [3, 4, 5],
  CENTER : [1, 4, 7]
}

export default class Chunk extends Phaser.GameObjects.Group{

  constructor (config)
  {
    super(config.scene)
    this.state = Helpers.setState({}, this.defaultState)

    this.state.Rooms = this.setRooms(this.state.x, this.state.y, this.state.seed)
  }

  get defaultState(){
    return {
      x: 0,
      y: 0,
      seed: 0,
      Rooms: Array.apply('null', Array(9)).map(x => x = null)
    }
  }

  setRooms (x, y, seed) {
    var xInc = -1
    var yInc = -1
    let rooms = new Array()
    for(var room of this.state.Rooms){
      rooms.push(this.generateRoom(x + xInc, y + yInc))
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
        this.generateSlice(slices.TOP, this.getNewCoords(oldRooms, direction))
      break
      case 'RIGHT':
        oldRooms = this.getSlice(slices.RIGHT)
        this.swapSlices(slices.LEFT, slices.CENTER)
        this.swapSlices(slices.CENTER, slices.RIGHT)
        this.generateSlice(slices.RIGHT, this.getNewCoords(oldRooms, direction))
      break
      case 'DOWN':
        oldRooms = this.getSlice(slices.BOTTOM)
        this.swapSlices(slices.TOP, slices.MIDDLE)
        this.swapSlices(slices.MIDDLE, slices.BOTTOM)
        this.generateSlice(slices.BOTTOM, this.getNewCoords(oldRooms, direction))
      break
      case 'LEFT':
        oldRooms = this.getSlice(slices.LEFT)
        this.swapSlices(slices.RIGHT, slices.CENTER)
        this.swapSlices(slices.CENTER, slices.LEFT)
        this.generateSlice(slices.LEFT, this.getNewCoords(oldRooms, direction))
      break
    }
  }

  getSlice(s){
    let rooms = []
    for(var i = 0; i < s.length; i++){
      rooms.push(this.state.Rooms[s[i]])
    }
    return rooms
  }
  swapSlices(s1, s2){
    let tempRooms = this.state.Rooms.slice();
    for(var i = 0; i < s1.length; i++){
      this.state.Rooms[s1[i]] = tempRooms[s2[i]]
    }
  }

  getNewCoords(oldRooms, direction){
    let coords = []
    switch(direction){
      case 'UP':
      coords = [
        { x: oldRooms[0].state.x, y: oldRooms[0].state.y - 1 },
        { x: oldRooms[1].state.x, y: oldRooms[1].state.y - 1 },
        { x: oldRooms[2].state.x, y: oldRooms[2].state.y - 1 }
      ]
      break
      case 'RIGHT':
      coords = [
        { x: oldRooms[0].state.x + 1, y: oldRooms[0].state.y },
        { x: oldRooms[1].state.x + 1, y: oldRooms[1].state.y },
        { x: oldRooms[2].state.x + 1, y: oldRooms[2].state.y }
      ]
      break
      case 'DOWN':
      coords = [
        { x: oldRooms[0].state.x, y: oldRooms[0].state.y + 1 },
        { x: oldRooms[1].state.x, y: oldRooms[1].state.y + 1 },
        { x: oldRooms[2].state.x, y: oldRooms[2].state.y + 1 }
      ]
      break
      case 'LEFT':
      coords = [
        { x: oldRooms[0].state.x - 1, y: oldRooms[0].state.y },
        { x: oldRooms[1].state.x - 1, y: oldRooms[1].state.y },
        { x: oldRooms[2].state.x - 1, y: oldRooms[2].state.y }
      ]
      break
    }
    return coords
  }

  generateSlice(s, newCoords){
    for(var i = 0; i < s.length; i++){
      this.state.Rooms[s[i]] = this.generateRoom(newCoords[i].x, newCoords[i].y)
    }
  }

  get Rooms(){
    return this.state.Rooms
  }

  getCurrentRoom(x, y){
    for(let r of this.Rooms){
      if(x >= r.position.x && x < r.position.x + r.size.width){
        if(y >= r.position.y && y < r.position.y + r.size.height){
          return r
        }
      }
    }
  }

  generateRoom (x, y) {
    return new Room({
      scene: this.scene,
        state: {
        x: x,
        y: y,
        lastActive: Date.now(),
        seed: this.state.seed
      }
    })
  }

}
