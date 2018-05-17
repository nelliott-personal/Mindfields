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
        this.state.noiseVal = Math.abs(noise.perlin2(this.state.x / 4, this.state.y / 4))
        localforage.setItem(this.name, this.state)
      }
      noise.seed(this.state.seed)
      this.depth = -1;
      this.scene.add.existing(this)
      this.drawRoom()
    })
  }

  destroyRoom(){
    this.coordDisplay.destroy()
    this.destroy()
  }

  drawRoom(){
    this.clear()
    let config = {
      x: this.position.x + 10,
      y: this.position.y + 10,
      text: this.coords.x + ',' + this.coords.y,
      style: { fontSize:'36px', align:'center' }
    }
    this.coordDisplay = this.scene.make.text(config)
    if(this.isNew == true){
      this.fillStyle(Phaser.Display.Color.GetColor(0, (this.noiseVal + .25) * 100, 255), Math.abs(this.noiseVal))
    }
    else{
      this.fillStyle(Phaser.Display.Color.GetColor(255, 0, 0), Math.abs(this.noiseVal))
    }
    this.fillRect(this.position.x, this.position.y, this.size.width, this.size.height)
  }

  get defaultState(){
    return {
      x: 0,
      y: 0,
      width: 5000,
      height: 5000,
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
