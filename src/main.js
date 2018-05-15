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

localforage.clear()

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

let startGame = function (val) {
    SaveState.state = val;
    game = new Phaser.Game(config)

    game.canvas.addEventListener('mousedown', function () {
        game.input.mouse.requestPointerLock();
    });
}

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
