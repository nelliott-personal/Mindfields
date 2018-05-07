import AnimatedTiles from 'phaser-animated-tiles';

class SpaceScene extends Phaser.Scene {
  constructor(test) {
    super({
      key: 'SpaceScene'
    })
  }
  preload(){

  }
  create(){
    this.inputstate = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      m1: this.input.activePointer.leftButton,
      m2: this.input.activePointer.rightButton
    }
    this.input.mouse.capture = true

  }
  update(){
    if(this.inputstate.up.isDown){
      
    }

  }
}

export default SpaceScene;
