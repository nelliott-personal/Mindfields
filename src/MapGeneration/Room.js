import Helpers from '../Utils/Helpers'
import noise from 'noisejs-ilmiont'
import localforage from 'localforage'

export default class Room extends Phaser.GameObjects.Graphics{

  constructor(config)
  {
    super(config.scene)
    this.state = Helpers.setState(config.state, this.defaultState)
    localforage.getItem(this.name, (err, val) => {
      if(val){
        this.isNew = false
        this.state = Helpers.setState(val, this.defaultState)
      }
      else{
        this.isNew = true
        this.state = Helpers.setState(config.state, this.defaultState)
        //this.state.noiseVal = Math.abs(noise.simplex2(this.state.x, this.state.y))
        this.state.noiseVal = ((noise.perlin2(this.state.x / 2, this.state.y / 2) * 2) + 1) / 2
        localforage.setItem(this.name, this.state)
      }
      this.scene.CM.debugOverlay.drawRooms()
      noise.seed(this.state.seed)
    })

  }

  get defaultState(){
    return {
      x: 0,
      y: 0,
      width: 1000,
      height: 1000,
      lastActive: Date.now(),
      seed: 0,
      noiseVal:0
    }
  }
  get position(){
    return { x: this.state.x * this.state.width, y: this.state.y * this.state.height }
  }
  get coords(){
    return { x: this.state.x, y: this.state.y }
  }
  get size(){
    return { width: this.state.width, height: this.state.height }
  }
  get noiseVal(){
    return (this.state.noiseVal + 1) / 2
  }

  get id(){
    return this.state.x + '^' + this.state.y
  }

  get name(){
    return 'Room' + this.state.x + '^' + this.state.y
  }

}
