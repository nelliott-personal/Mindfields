import noise from 'noisejs-ilmiont'
import Helpers from '../Utils/Helpers'
import { Planets, Biomes, RoomTypes, RoomLayouts } from './MapObjects'
import Chunk from './Chunk'

// A Chunk has 9 Rooms

// Do I even need this chunkmanager?

export default class ChunkManager extends Phaser.GameObjects.GameObject {

  constructor(config) {
    super(config.scene)
    this.state = Helpers.setState(config.state, this.defaultState)
    this.Chunk = new Chunk({
      scene: this.scene,
      state: {
        x: this.state.x,
        y: this.state.y,
        seed: this.state.seed,
        Rooms: Array.apply(null, Array(9)).map(x => x = null)
      }
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

}
