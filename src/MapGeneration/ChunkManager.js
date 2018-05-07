import noise from 'noisejs-ilmiont'
import Helpers from '../Utils/Helpers'
import SaveState from '../Utils/SaveState'
import { Planets, Biomes, RoomTypes, RoomLayouts } from './MapObjects'

// A chunk is 9 rooms

export default class ChunkManager {

  constructor() {
    Helpers.log('ChunkManager Init')
    noise.seed(SaveState.getSaveState().GameSeed)
  }

  loadSurroundingChunks(x, y) {
    //for each chunk surrounding x,y: loadChunk
  }

  loadChunk(x, y) {

  }

}
