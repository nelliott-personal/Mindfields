import 'phaser'
import Helpers from './Utils/Helpers'
import { DefaultGameState } from './DefaultGameState'
import SaveState from './Utils/SaveState'
//import SpaceScene from './Scenes/SpaceScene'
import Scenes from './Scenes/Scenes'
import localforage from 'localforage'

let config = {
    type: Phaser.WEBGL,
    parent: 'content',
    width: 1024,
    height: 768,
    scaleMode: 0,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: Scenes
}
let game = {}

let startGame = function(val){
  SaveState.state = val;
  game = new Phaser.Game(config)
}

SaveState.loadState().then((val) => {
  if(val){
    Helpers.log('new game')
    SaveState.saveState(DefaultGameState).then((val) => {
      startGame(val)
    })
  }
  else{
    startGame(val)
  }
})
