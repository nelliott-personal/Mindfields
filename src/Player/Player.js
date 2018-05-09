import Helpers from '../Utils/Helpers'
import SaveState from '../Utils/SaveState'

export default class Player extends Phaser.GameObjects.Sprite{

  constructor(config)
  {
    super(config.scene, config.x, config.y, config.key)
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this)
    this.state = config.state || this.defaultState

    this.acc = 2000
    this.body.maxVelocity = new Phaser.Math.Vector2(600, 600)
    //this.body.maxAngular = 400

    console.log('Player Init')
  }

  get defaultState(){
    return {
      id: 1,
      name: 'PlayerName',
      lastPlayed: Date.now(),
      x:0,
      y:0,
      inventory: [],
      ships: [{
        id:1,
        ship:{
          // default ship
        }
      }],
      shipID: 1 // what ship you're in
    }
  }

  update(inputstate, time, delta) {
    let xAcc = 0
    let yAcc = 0
    for (var input in inputstate) {

        if (inputstate[input].isDown) {
          switch(input){
            case 'up':
            yAcc += -this.acc
            break;
            case 'down':
            yAcc += this.acc
            break;
            case 'left':
            xAcc += -this.acc
            break;
            case 'right':
            xAcc += this.acc
            break;
          }
        }

    }
    this.body.acceleration = new Phaser.Math.Vector2(xAcc, yAcc)
    this.body.rotation = Phaser.Math.Angle.Between(this.x, this.y, this.scene.input.mouse.manager.activePointer.x + this.scene.cameras.main.scrollX, this.scene.input.mouse.manager.activePointer.y + this.scene.cameras.main.scrollY) * 180 / Math.PI + 90
    //this.body.angularAcceleration = Phaser.Math.Distance.Between(this.scene.input.mouse.manager.activePointer.x, this.scene.input.mouse.manager.activePointer.y, this.x)
  }

}
