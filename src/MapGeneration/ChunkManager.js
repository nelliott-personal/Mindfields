import noise from 'noisejs-ilmiont'
import Helpers from '../Utils/Helpers'
import SaveState from '../Utils/SaveState'
import { Planets, Biomes, RoomTypes, RoomLayouts } from './MapObjects'
import Chunk from './Chunk'

// A Chunk has 9 Rooms

export default class ChunkManager {

  constructor(state = {
    x: 0,
    y: 0,
    seed: 0
  }) {
    this.state = state;
    this.generateChunk(this.state.x, this.state.y)
    Helpers.log('ChunkManager Init')
  }
  
  generateChunk(x, y){
    this.Chunk = new Chunk({
      x: x,
      y: y,
      seed: this.state.seed,
      Rooms: Array.apply(null, Array(9)).map(x => x = null)
    })
  }

}
