import AnimatedTiles from 'phaser-animated-tiles';
import MapGenerator from '../MapGeneration/MapGeneration'

class SpaceScene extends Phaser.Scene {
  constructor(test) {
    super({
      key: 'SpaceScene'
    })
  }
  preload(){

  }
  create(){
    let m = new MapGenerator()
    this.inputstate = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }
    this.input.mouse.capture = true

  }
  update(){

  }
}

export default SpaceScene;
