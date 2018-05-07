import AnimatedTiles from 'phaser-animated-tiles'
import ChunkManager from '../MapGeneration/ChunkManager'
import Player from '../Player/Player'
import SaveState from '../SaveState'
import Helpers from '../Helpers'

export default class SpaceScene extends Phaser.Scene {

  constructor(test) {
    super({
      key: 'SpaceScene'
    })
  }

  preload() {

  }

  create() {
    this.P = new Player()
    this.CM = new ChunkManager()
    this.inputstate = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }
    this.input.mouse.capture = true
    console.log(SaveState.getSaveState())
  }

  update() {

  }

}
