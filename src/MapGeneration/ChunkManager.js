import noise from 'noisejs-ilmiont'
import Helpers from '../Utils/Helpers'
import SaveState from '../Utils/SaveState'
import { Planets, Biomes, RoomTypes, RoomLayouts } from './MapObjects'
import Chunk from './Chunk'

// A Chunk has 9 Rooms

// Do I even need this chunkmanager?

export default class ChunkManager extends Phaser.GameObjects.Graphics {

  constructor(config) {
    super(config.scene)
    this.state = Helpers.setState(config.state, this.defaultState)
    config.scene.add.existing(this)
    this.generateChunk(this.state.x, this.state.y)
    console.log(this.Chunk.Rooms)
    console.log('ChunkManager Init')
  }

  get defaultState(){
    return {
      x: 0,
      y: 0,
      seed: 0
    }
  }

  generateChunk(x, y){
    this.Chunk = new Chunk({
      x: x,
      y: y,
      seed: this.state.seed,
      Rooms: Array.apply(null, Array(9)).map(x => x = null)
    })
    this.drawRooms()
  }
  drawRooms(){
    this.clear()
    this.scene.debugTextGroup.destroy()
    this.scene.debugTextGroup = this.scene.add.group()
    for(let r of this.Chunk.Rooms){
      let config = {
        x: r.position.x + 10,
        y: r.position.y + 10,
        text: r.coords.x + ',' + r.coords.y,
        style: { fontSize:'36px', align:'center' }
      }
      this.scene.debugTextGroup.add(this.scene.make.text(config))
      //let t = this.scene.add.text(r.position.x + 10, r.position.y + 10, r.coords.x + ',' + r.coords.y, { fontSize:'36px', align:'center' })
      this.fillStyle('0xFF0000', r.noiseVal)
      this.fillRect(r.position.x, r.position.y, r.size.width, r.size.height)
    }
  }
  update(){

  }

}
