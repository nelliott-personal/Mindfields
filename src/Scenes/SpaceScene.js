import AnimatedTiles from 'phaser-animated-tiles'
import ChunkManager from '../MapGeneration/ChunkManager'
import Player from '../Entities/Player/Player'
import Entity from '../Entities/Entity'
import SaveState from '../Utils/SaveState'
import Helpers from '../Utils/Helpers'

export default class SpaceScene extends Phaser.Scene {

  constructor() {
    super({ key: 'SpaceScene' })
  }

  preload() {
    this.load.image('ship', 'assets/images/ship.png')
    this.load.image('targeter', 'assets/images/crosshair.png')
    this.load.image('spacerock', 'assets/images/spacerock.png')
  }

  create() {
    this.state = SaveState.state
    this.isStopped = false;
    this.debugTextGroup = this.add.group()
    this.CM = new ChunkManager({
      scene: this,
      state: {
        seed: this.state.seed
      }
    })
    this.P = new Player({
      scene:this,
      key: 'ship',
      x: 50,
      y: 50,
      state: this.state.Player,
      targeter: this.add.image(50, 50, 'targeter')
    })
    this.O = new Entity({
        scene: this,
        key: 'spacerock',
        x: 300,
        y: 50,
        state: {
            physics: {
                mass: 10,
            }
        }
    })
    this.O.body.allowRotation = true
    this.O.body.setAngularVelocity(25)
    this.physics.add.collider(this.P, this.O)
    this.inputstate = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      x: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
      z: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z)
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
    for(let input in this.inputstate){
      if(this.inputstate[input].isDown){
        if(input == 'z'){
          this.cameras.main.zoom -=.01
        }
        else if(input == 'x'){
          this.cameras.main.zoom +=.01
        }
      }
    }
    //this.CM.update()
    //this.CM.Chunk.getCurrentRoom(this.P.x, this.P.y)
  }

}
