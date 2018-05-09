import AnimatedTiles from 'phaser-animated-tiles'
import ChunkManager from '../MapGeneration/ChunkManager'
import Player from '../Player/Player'
import SaveState from '../Utils/SaveState'
import Helpers from '../Utils/Helpers'

export default class SpaceScene extends Phaser.Scene {

  constructor() {
    super({ key: 'SpaceScene' })
  }

  preload() {
    this.load.image('ship', 'assets/images/ship.png')
  }

  create() {
    this.state = SaveState.state
    this.P = new Player({
      scene:this,
      key: 'ship',
      x: this.sys.game.config.width / 2,
      y: this.sys.game.config.height / 2,
      state: this.state.Player
    })
    this.physics.add.sprite(this.P)
    console.log(this.P);
    this.CM = new ChunkManager({
      x: this.state.x,
      y: this.state.y,
      seed: this.state.seed
    })
    this.inputstate = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }
    this.input.mouse.capture = true
    console.log('Saved State: ', this.state)
    this.setupCamera()

  }

  setupCamera(){
    var controlConfig = {
        camera: this.cameras.main,
        left: this.inputstate.left,
        right: this.inputstate.right,
        up: this.inputstate.up,
        down: this.inputstate.down,
        acceleration: 0.006,
        maxSpeed:this.P.body.maxVelocity.x
    };

    this.controls = new Phaser.Cameras.Controls.Smoothed(controlConfig);
    //this.cameras.main.startFollow(this.P)
  }

  update(time, delta) {
    //this.controls.update(delta)
    this.P.update(this.inputstate, time, delta)
  }

}
