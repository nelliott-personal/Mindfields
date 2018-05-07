import noise from 'noisejs-ilmiont'
import Helpers from '../Helpers'
import SaveState from '../SaveState'
import { Planets, Biomes, RoomTypes, RoomLayouts } from './MapObjects'

// A chunk is 9 rooms

export default class ChunkManager {

  constructor() {
    noise.seed(SaveState.getSaveState().GameSeed)
  }

  loadSurroundingChunks(x, y) {
    //for each chunk surrounding x,y: loadChunk
  }

  loadChunk(x, y) {

  }

}
