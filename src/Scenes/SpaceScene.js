import AnimatedTiles from 'phaser-animated-tiles'
import ChunkManager from '../MapGeneration/ChunkManager'
import Player from '../Entities/Player/Player'
import SaveState from '../Utils/SaveState'
import Helpers from '../Utils/Helpers'

export default class SpaceScene extends Phaser.Scene {

  constructor() {
    super({ key: 'SpaceScene' })
  }

  preload() {
    this.load.image('ship', 'assets/images/ship.png')
    this.load.image('targeter', 'assets/images/crosshair.png')
  }

  create() {
    this.state = SaveState.state
    this.isStopped = false;
    this.CM = new ChunkManager({
      scene: this,
      state: {
        seed: this.state.seed
      }
    })
    this.P = new Player({
      scene:this,
      key: 'ship',
      x: 0,
      y: 0,
      state: this.state.Player,
      targeter: this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'targeter')
    })
    this.inputstate = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      q: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q)
    }
    this.input.mouse.capture = true
    console.log('Saved State: ', this.state)
    this.setupCamera()
  }

  setupCamera(){
    this.cameras.main.startFollow(this.P)
  }

  update(time, delta) {
    this.P.update(this.inputstate, time, delta)
    //this.CM.update()
    //this.CM.Chunk.getCurrentRoom(this.P.x, this.P.y)
  }

}
