import Helpers from '../Utils/Helpers'
import localforage from 'localforage'

export default class Entity extends Phaser.GameObjects.Sprite{
  constructor(config){
    super(config.scene, config.x, config.y, config.key)
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
    return this.state.currentRoom
  }
  get previousRoom(){
    return this.state.previousRoom
  }
  set previousRoom(pR){
    this.state.previousRoom = pR
    return this.state.previousRoom
  }
  save(){
    //localforage.save()
  }
  changedRoom(e){

  }
  update(time, delta){
    this.updatePosition()
  }
  updatePosition(){
    this.state.x = this.x
    this.state.y = this.y

    let cR = this.scene.CM.Chunk.getCurrentRoom(this.x, this.y)

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
