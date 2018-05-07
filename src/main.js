import 'phaser'
import BootScene from './scenes/BootScene'
import SpaceScene from './scenes/SpaceScene'
import TitleScene from './scenes/TitleScene'


let config = {
    type: Phaser.WEBGL,
    parent: 'content',
    width: 400,
    height: 240,
    scaleMode: 0, //Phaser.ScaleManager.EXACT_FIT,
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
