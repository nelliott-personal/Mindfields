import noise from 'noisejs-ilmiont'
import { Biomes, RoomTypes, RoomLayouts } from './Biomes'

// A chunk is 9 rooms

export default class MapGenerator{
  constructor(){
    console.log('mapgen')
    noise.seed(localStorage.getItem('MainSeed'))
  }
  loadSurroundingChunks(x, y){
    let arr = new Array()
  }
  loadChunk(x, y){

  }
}
