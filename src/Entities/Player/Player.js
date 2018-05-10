import SaveState from '../../Utils/SaveState'
import Helpers from '../../Utils/Helpers'
import Entity from '../Entity'
import Inventory from '../../Items/Inventory'

export default class Player extends Entity{

  constructor(config)
  {
    super(config) // Calls Entity.constructor(config)
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this)
    this.inventory = new Inventory(this.state.inventory)
    this.acc = 400
    this.body.maxVelocity = new Phaser.Math.Vector2(600, 600)
    this.body.maxAngular = 800
    this.body.setDrag(100)
    this.scaleX = .5
    this.scaleY = .5

    this.targeter = config.targeter;
    this.targeter.scaleX = .5
    this.targeter.scaleY = .5

    this.addListener('roomchange', this.changedRoom, this)
    console.log('Player Init')
  }
  changedRoom(e){
    console.log(this.previousRoom)
    console.log(this.currentRoom)
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
        if (Phaser.Math.Difference(this.rotation, this.body.acceleration.angle()) >= 0.05) {
          this.rotation = Phaser.Math.Angle.RotateTo(this.rotation, this.body.acceleration.angle(), .2);
        }
      }
    }
    this.updatePosition(this.x, this.y)
    this.body.acceleration = new Phaser.Math.Vector2(xAcc, yAcc)
    this.targeter.x = this.scene.input.activePointer.x;
    this.targeter.y = this.scene.input.activePointer.y;
    //this.body.rotation = Phaser.Math.Angle.Between(this.x, this.y, this.scene.input.mouse.manager.activePointer.x + this.scene.cameras.main.scrollX, this.scene.input.mouse.manager.activePointer.y + this.scene.cameras.main.scrollY) * 180 / Math.PI + 90
    //this.body.angularAcceleration = Phaser.Math.Distance.Between(this.scene.input.mouse.manager.activePointer.x, this.scene.input.mouse.manager.activePointer.y, this.x)
  }

}
