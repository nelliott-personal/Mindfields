import SaveState from '../../Utils/SaveState'
import Helpers from '../../Utils/Helpers'
import Entity from '../Entity'
import Inventory from '../../Items/Inventory'

export default class Player extends Entity{

  constructor(config)
  {
    super(config)
    this.state.x = config.x
    this.state.y = config.y
    this.inventory = new Inventory(this.state.inventory)
    ///Physics Settings
    this.setBody({
        type: 'rectangle',
        width: 312,
        height: 96
    });
    ///////////////////
    this.acc = this.state.physics.acc
    this.body.maxVelocity = 10
    this.setMass(this.state.physics.mass)
    this.setFrictionAir(0)
      

    //this.body.maxAngular = 800
    //this.body.setFriction(10)
    //this.body.setDrag(300) //Keep Drag off
    this.scaleX = .5
    this.scaleY = .5

    this.targeter = config.targeter;
    this.targeter.scaleX = .5
    this.targeter.scaleY = .5
    this.targeter.depth = 10

    this.inputstate = {
      up: config.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: config.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: config.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: config.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      space: config.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    console.log('Player Init')

    // Move reticle upon locked pointer move
    this.scene.input.on('pointermove', function (pointer) {
        if (this.scene.input.mouse.locked) {
            // Move reticle with mouse
            this.targeter.x += pointer.movementX;
            this.targeter.y += pointer.movementY;
        }
    }, this);
  }

  changedRoom(e){
    if(this.previousRoom.name != this.currentRoom.name){
      this.scene.CM.Chunk.shiftRooms(this.changedDirection)
      this.scene.CM.drawRooms()
    }
  }

  get changedDirection(){
    let dir = ''
    if(this.currentRoom.coords.x < this.previousRoom.coords.x){
      dir = 'LEFT'
    }
    else if(this.currentRoom.coords.x > this.previousRoom.coords.x){
      dir = 'RIGHT'
    }
    else if(this.currentRoom.coords.y < this.previousRoom.coords.y){
      dir = 'UP'
    }
    else if(this.currentRoom.coords.y > this.previousRoom.coords.y){
      dir = 'DOWN'
    }

    return dir
  }
  get defaultState(){
    return {
      id: 1,
      name: 'PlayerName',
      lastPlayed: Date.now(),
      x: 0,
      y: 0,
      physics: { //Placeholder physics parameters. Should be defined from ship type/ inventory data and added to config in a preload function before the constructor fires
          mass: 1000,
          acc: 10,
          maxVelocity: 10
      },
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

  update(time, delta) {
    let xAcc = 0
    let yAcc = 0
    let force = new Phaser.Math.Vector2()
    for (var input in this.inputstate) {
      if (this.inputstate[input].isDown) {
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
        force.x = xAcc 
        this.setAngularVelocity(0)
        if (Phaser.Math.Difference(this.body.angle, force.angle() >= 0.05)) {
            this.setRotation(Phaser.Math.Angle.RotateTo(this.body.angle, force.angle(), .1) );
         }
      }

    }
    this.prev = new Phaser.Math.Vector2(this.state.x, this.state.y)
    this.updatePosition()
    this.applyForce({ x: xAcc / 100, y: yAcc / 100 })
    this.setVelocityX(Phaser.Math.Clamp(this.body.velocity.x, -this.body.maxVelocity, this.body.maxVelocity))
    this.setVelocityY(Phaser.Math.Clamp(this.body.velocity.y, -this.body.maxVelocity, this.body.maxVelocity))
    this.targeter.x += this.x - this.prev.x
    this.targeter.y += this.y - this.prev.y
  }

}
