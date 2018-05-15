import Helpers from '../Utils/Helpers'

export default class Entity extends Phaser.GameObjects.Sprite{
  constructor(config){
    super(config.scene, config.x, config.y, config.key) // calls Phaser.GameObjects.Sprite.constructor
    config.scene.physics.world.enable(this)
    config.scene.add.existing(this)
    this.state = Helpers.setState(config.state, this.defaultState)
    config.scene.physics.world.enable(this);
    this.body.setMass(10)
    this.body.setBounce(0.8, 0.8)
    this.addListener('roomchange', this.changedRoom, this)
  }
  get defaultState() {
      return {
          id: 1,
          name: 'Entity',
          x: 0,
          y: 0
      }
  }
  get currentRoom(){
    return this.state.currentRoom
  }
  set currentRoom(cR){
    this.state.currentRoom = cR
    console.log(this)
    return this.state.currentRoom
  }
  get previousRoom(){
    return this.state.previousRoom
  }
  set previousRoom(pR){
    this.state.previousRoom = pR
    return this.state.previousRoom
  }
  changedRoom(e){

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
