import Helpers from '../Utils/Helpers'

export default class Entity extends Phaser.GameObjects.Sprite{
  constructor(config){
    super(config.scene, config.x, config.y, config.key) // calls Phaser.GameObjects.Sprite.constructor
    this.state = Helpers.setState(config.state, this.defaultState)
    console.log('Entity Init')
  }
  get currentRoom(){
    return this.state.currentRoom
  }
  set currentRoom(cR){
    return this.state.currentRoom = cR
  }
  get previousRoom(){
    return this.state.previousRoom
  }
  set previousRoom(pR){
    return this.state.previousRoom = pR
  }
  updatePosition(x, y){
    this.state.x = x
    this.state.y = y

    let cR = this.scene.CM.Chunk.getCurrentRoom(x, y)

    if(cR != this.currentRoom){
      if(this.previousRoom == null){
        this.previousRoom = cR
      }
      else{
        this.previousRoom = this.currentRoom;
      }
      this.currentRoom = cR
      this.emit('roomchange')
    }
  }
}
