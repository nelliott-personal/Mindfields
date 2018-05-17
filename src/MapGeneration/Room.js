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
    console.log('draw room')
    this.clear()

    let config = {
      x: this.position.x + 10,
      y: this.position.y + 10,
      text: this.coords.x + ',' + this.coords.y,
      style: { fontSize:'36px', align:'center' }
    }
    this.coordDisplay = this.scene.make.text(config)
    //let t = this.scene.add.text(r.position.x + 10, r.position.y + 10, r.coords.x + ',' + r.coords.y, { fontSize:'36px', align:'center' })

    if(this.isNew == true){
      this.fillStyle('0x0046FF', this.noiseVal)
    }
    else{
        this.fillStyle('0xFF0000', this.noiseVal)
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
