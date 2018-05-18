import Helpers from '../Utils/Helpers'
import noise from 'noisejs-ilmiont'
import localforage from 'localforage'
import co from 'co'

export default class Room extends Phaser.GameObjects.Graphics{

  constructor(config)
  {
    super(config.scene)
    this.state = Helpers.setState(config.state, this.defaultState)
    noise.seed(this.state.seed)
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

      this.depth = -1
      this.scene.add.existing(this)

      this.noiseGen = co.wrap(function* (x, y, w, h, s){
        let nV
        let nV2
        let bgGraphics = this.scene.make.graphics({x: 0, y: 0, add: false})
        for(let i = 0; i < w; i += s ){
          for(let j = 0; j < h; j += s ){
            noise.seed(this.state.seed)
            nV = Math.abs(noise.perlin2((x + i) / w, (y + j) / h))

            noise.seed(this.state.seed * 2)
            nV2 = Math.abs(noise.perlin2((x + i) / w * 1.1, (y + j) / h * 1.1))

            if(nV < .12){
              //bgGraphics.fillStyle(0x00FF00)
              //bgGraphics.fillRect(i, j, s, s)
              if(nV > .1199){
                bgGraphics.fillStyle(0xFF0000)
                bgGraphics.fillRect(i, j, s, s)
                if(nV >= .11998){
                  bgGraphics.fillStyle(0x00FF00)
                  bgGraphics.fillRect(i, j, s, s)
                }
              }
            }
            else if(nV2 < .05){

            }
            else if(nV2 > .5 && nV2 < .6){

            }
            else{
              bgGraphics.fillStyle(0x000000)
              bgGraphics.fillRect(i, j, s, s)
            }



          }
        }
        //bgGraphics.generateTexture(this.name + 'bgGraphics', 5000, 5000)
        //return yield Promise.resolve(bgGraphics.generateTexture(this.name + 'bgGraphics', 5000, 5000))
        return yield Promise.resolve(bgGraphics.generateTexture())
      })

      this.drawRoom()
    })
  }

  destroyRoom(){
    this.bgGraphics.destroy()
    this.destroy()
  }

  drawRoom(){
    this.clear()
    if(this.isNew == true){
      this.fillStyle(Phaser.Display.Color.GetColor(0, this.noiseVal * 50, this.noiseVal * 255), this.noiseVal)
    }
    else{
      this.fillStyle(Phaser.Display.Color.GetColor(255 * this.noiseVal, this.noiseVal * 50, 0), this.noiseVal)
    }
    this.fillRect(this.position.x, this.position.y, this.size.width, this.size.height)
    let pxSize = 80
    this.noiseGen(this.position.x, this.position.y, this.size.width, this.size.height, pxSize).then((bgGraphics) =>{
      bgGraphics.x = this.position.x
      bgGraphics.y = this.position.y
      bgGraphics.depth = -1
      this.bgGraphics = this.scene.add.existing(bgGraphics)
      //this.bgSprite = this.scene.add.sprite(this.position.x + this.size.width / 2, this.position.y + this.size.height / 2, this.name + 'bgGraphics')
      //this.bgSprite = this.scene.make.sprite({x: this.position.x + this.size.width / 2, y: this.position.y + this.size.height / 2, add: true})
      //this.scene.add.sprite(this.position.x, this.position.y, bgGraphics)
    })
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
