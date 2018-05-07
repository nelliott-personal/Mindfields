import 'phaser'
import SpaceScene from './scenes/SpaceScene'

//Sets main game seed
if(!localStorage.getItem('MainSeed')){
  console.log('new game');
  localStorage.setItem('MainSeed', Math.floor(Math.random() * 9999999))
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
