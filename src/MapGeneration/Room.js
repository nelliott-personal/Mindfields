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
      if(err){

      }
      else{
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

        this.drawTile = co.wrap(function* (x, y, s, bG, col){
          bG.fillStyle(col)
          bG.fillRect(x, y, s, s)

          return yield Promise.resolve(bG)
        })
        this.noiseGen = co.wrap(function* (x, y, w, h, s){
          let nV
          let nV2
          let bgGraphics = this.scene.make.graphics({x: 0, y: 0, add: false})
          let rand = Math.random() * 2 - 1

          let mapData = []
          let tileIndex = Math.floor(this.noiseVal * 30)
          for(let j = 0; j < w - 2; j += s ){
            let row = []
            for(let i = 0; i < h - 2; i += s ){
              noise.seed(this.state.seed)
              nV = Math.abs(noise.perlin2((x + i) / w / 2.6, (y + j) / h / 2.6))
              noise.seed(this.state.seed * 2.2)
              nV2 = Math.abs(noise.perlin2((x + i) / w / 1.4, (y + j) / h / 1.4))
              if(nV2 < .05){
                if(nV2 > .04995 && nV > .12){
                  this.drawTile(i, j, s, bgGraphics, 0xAF83FF)
                  row.push(94)
                }
                else{
                  row.push(null)
                }
              }
              else if(nV2 > .3 && nV2 < .4){
                row.push(null)
              }
              else if(nV < .12){
                if(nV > .1199 && nV2 >= .05){
                  row.push(95)
                  this.drawTile(i, j, s, bgGraphics, 0xFF0000)
                  if(nV >= .11998){
                    this.drawTile(i, j, s, bgGraphics, 0xFF0000)
                  }
                }
                else{
                  row.push(null)
                }
              }
              else{
                bgGraphics.fillStyle(Phaser.Display.Color.GetColor(nV * 100, nV * 300, Math.abs(nV * 200 - 200)))
                bgGraphics.fillRect(i, j, s, s)
                row.push(tileIndex)
              }

            }
            mapData.push(row)
          }
          /*
          let map = this.scene.make.tilemap({ data:mapData, tileWidth:s, tileHeight:s })
          let tileset = map.addTilesetImage('viscerared')
          let layer = map.createDynamicLayer(0, tileset, this.position.x, this.position.y)
          layer.depth = -10

          //map.setCollision(96)
          this.scene.matter.world.convertTilemapLayer(layer, { isStatic:true })
          */


          return yield Promise.resolve(bgGraphics)
        })

        this.generateTiles = co.wrap(function* (){


          //return yield Promise.resolve(map.fill('Tile Layer 1', 0, 0, 2500, 2500, true, layer))

        })



        this.drawRoom()
      }
    })
  }

  destroyRoom(){
    if(this.bgGraphics){
      this.bgGraphics.destroy()
    }
    this.destroy()
  }

  drawRoom(){
    this.clear()
    /*
    if(this.isNew == true){
      this.fillStyle(Phaser.Display.Color.GetColor(0, this.noiseVal * 50, this.noiseVal * 255), this.noiseVal)
    }
    else{
      this.fillStyle(Phaser.Display.Color.GetColor(255 * this.noiseVal, this.noiseVal * 50, 0), this.noiseVal)
    }
    */
    this.generateTiles().then(() =>{
      let pxSize = 32
      this.noiseGen(this.position.x, this.position.y, this.size.width, this.size.height, pxSize).then((bgGraphics) => {
        
        bgGraphics.x = this.position.x
        bgGraphics.y = this.position.y
        bgGraphics.depth = -1
        this.bgGraphics = this.scene.add.existing(bgGraphics)

      })
    })

  }


  get defaultState(){
    return {
      x: 0,
      y: 0,
      width: 2400,
      height: 2400,
      lastActive: Date.now(),
      seed: 0,
      noiseVal:0
    }
  }
  get position(){
    return { x: this.state.x * this.size.width, y: this.state.y * this.size.height }
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
