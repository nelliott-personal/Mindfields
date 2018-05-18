import 'phaser'
import Helpers from './Utils/Helpers'
import { DefaultGameState } from './DefaultGameState'
import SaveState from './Utils/SaveState'
//import SpaceScene from './Scenes/SpaceScene'
import Scenes from './Scenes/Scenes'
import localforage from 'localforage'

// let logging = $$logging$$
/*
(function(){
    var _privateLog = console.log
    //if($$logging$$)
    if(true){
      console.log = function (message) {
      _privateLog.apply(console, arguments)
      }
    }
})();
*/

localforage.config({
    driver: localforage.WEBSQL,
    name: 'mindfields',
    version: 1.0,
    size: 536870912,
    storeName: 'keyvaluepairs',
    description: 'game'
})

//Uncomment to start a new game
localforage.clear().then((val) =>{
  console.log('db clear')
  console.log(val)
})
let config = {
    type: Phaser.WEBGL,
    parent: 'content',
    width: window.screen.availWidth,
    height: window.screen.availHeight,
    scaleMode: 0,
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            gravity: { x: 0, y: 0 }
        }
    },
    scene: Scenes
}
window['game'] = {}

let startGame = function (val) {
    SaveState.state = val;
    window['game'] = new Phaser.Game(config)

    window['game'].canvas.addEventListener('mousedown', function () {
        window['game'].input.mouse.requestPointerLock();
    });
    console.log(window['game'].device)
}

addEventListener('keypress', function(e){
  if(e.key.toLowerCase() == 'q'){
    window['game']['canvas'][game.device.fullscreen.request]();
  }
})

SaveState.loadState().then((val) => {
    if (!val) {
        console.log('new game')
        SaveState.saveState(DefaultGameState).then((val) => {
            startGame(val)
        })
    }
    else {
        startGame(val)
    }
})
