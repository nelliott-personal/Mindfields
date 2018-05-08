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

  }

  create() {
    this.state = SaveState.state
    this.P = new Player(this.state.Player)
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
    Helpers.log('Saved State: ', this.state)
  }

  update() {
    for (var input in this.inputstate) {
      if (this.inputstate.hasOwnProperty(input)) {
        if (this.inputstate[input].isDown) {
            Helpers.log(input);
        }
      }
    }
  }

}
