import noise from 'noisejs-ilmiont'
import Helpers from '../Utils/Helpers'
import SaveState from '../Utils/SaveState'
import { Planets, Biomes, RoomTypes, RoomLayouts } from './MapObjects'
import Chunk from './Chunk'
import DebugOverlay from './DebugOverlay'

// A Chunk has 9 Rooms

// Do I even need this chunkmanager?

export default class ChunkManager extends Phaser.GameObjects.GameObject {

  constructor(config) {
    super(config.scene)
    this.state = Helpers.setState(config.state, this.defaultState)
    this.scene.add.existing(this)
    this.debugOverlay = new DebugOverlay({
      scene:this.scene
    })

    this.Chunk = new Chunk({
      scene: this.scene,
      x: this.state.x,
      y: this.state.y,
      seed: this.state.seed,
      Rooms: Array.apply(null, Array(9)).map(x => x = null)
    })
    console.log('ChunkManager Init')
    console.log(this.Chunk.Rooms)
  }

  get defaultState(){
    return {
      x: 0,
      y: 0,
      seed: 0
    }
  }

  drawRooms(){
    this.debugOverlay.drawRooms()
  }
  update(){

  }

}
