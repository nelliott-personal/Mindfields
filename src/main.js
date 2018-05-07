import 'phaser'
import SpaceScene from './Scenes/SpaceScene'

//If new game, start fresh.  Otherwise populate w/ saved data
if(localStorage.getItem('SaveState') == null){
  console.log('new game')
  localStorage.setItem('SaveState', JSON.stringify({
    'GameSeed': Math.floor(Math.random() * 9999999),
    'Player': {},
    'Map': {}
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
    scene: [
        SpaceScene
    ]
}

let game = new Phaser.Game(config)
