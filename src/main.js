import 'phaser'
import SpaceScene from './Scenes/SpaceScene'

//If new game, start fresh.  Otherwise populate w/ saved data
//if(localStorage.getItem('SaveState') == null){
  console.log('new game')
  localStorage.setItem('SaveState', JSON.stringify({
    x: 2,
    y: 2,
    'seed': Math.random(),
    'Player': {},
    'Planets': {
      id: 1,
      Chunk:{
        x: 0,
        y: 0,
        Rooms: []
      }

    }
  }))
//}

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
    scene: [
        SpaceScene
    ]
}

let game = new Phaser.Game(config)
