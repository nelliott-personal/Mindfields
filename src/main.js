import 'phaser'
//import SpaceScene from './Scenes/SpaceScene'
import Scenes from './Scenes/Scenes'

//If new game, start fresh.  Otherwise populate w/ saved data
if(localStorage.getItem('SaveState') == null){
  console.log('new game')
  localStorage.setItem('SaveState', JSON.stringify({
    x: 2,
    y: 2,
    'seed': Math.random(),
    'Player': {
      id: 1,
      name: 'PlayerName',
      lastPlayed: Date.now(),
      x:0,
      y:0,
      inventory: [],
      ships: [{
        id:1,
        ship:{
          // default ship
        }
      }],
      shipID: 1 // what ship you're in
    },
    'Planets': {
      id: 1,
      Chunk:{
        x: 0,
        y: 0,
        Rooms: []
      }
    }
  }))
}

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

let game = new Phaser.Game(config)
