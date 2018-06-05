import SaveState from '../../Utils/SaveState'
import Helpers from '../../Utils/Helpers'
import Entity from '../Entity'
import Ship from '../../Ships/Ship'
import Health from '../Components/Health'
import Energy from '../Components/Energy'

export default class Player extends Entity {

    constructor(config) {
        super(config)
        this.state.x = config.x
        this.state.y = config.y

        ///Physics Settings
        this.setBody({
            type: 'rectangle',
            width: 312,
            height: 96
        });
        ///////////////////
        this.acc = this.state.physics.acc
        this.maxTurn = 0.15
        this.body.maxVelocity = 10
        this.setMass(this.state.physics.mass)
        this.setFrictionAir(0)
        this.targetAngle = 0
        this.setBounce(0.5, 0.5)
        this.depth = 1
        this.boostCost = 100
        this.boostReady = false
        this.boostPower = 1.5

        //this.body.maxAngular = 800
        //this.body.setFriction(10)
        //this.body.setDrag(300) //Keep Drag off
        this.scaleX = .4
        this.scaleY = .4

        this.targeter = config.targeter;
        this.targeter.scaleX = .5
        this.targeter.scaleY = .5
        this.targeter.depth = 10
        this.targeter.setAlpha(0.65)

        this.inputstate = {
            up: config.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: config.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: config.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: config.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            space: config.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        }
        
        this.health = new Health(config, this)
        this.energy = new Energy(config, this)
        console.log('Player Init')

        // Move reticle upon locked pointer move
        this.scene.input.on('pointermove', function (pointer) {
            if (this.active && this.scene.input.mouse.locked) {
                // Move reticle with mouse
                this.targeter.x += pointer.movementX;
                this.targeter.y += pointer.movementY;
            }
        }, this);

        this.createParticles()

    }

    createParticles(){
      this.particles = this.scene.add.particles('flares');
      this.particleEmitter = this.particles.createEmitter({
          frame: 'blue',
          x: 0,
          y: 0,
          alpha: { min: .3, max: .6 },
          lifespan: 400,
          speed: { min: 0, max: 400 },
          angle: 0,
          scale: { start: 0.4, end: 0 },
          quantity: 2,
          blendMode: 'ADD'
      });

      this.particleEmitter.depth = 0
      this.particleEmitter.startFollow(this)
    }

    changedRoom(e) {
        if (this.previousRoom.name != this.currentRoom.name) {
            this.scene.CM.Chunk.shiftRooms(this.changedDirection)
        }
    }

    get changedDirection() {
        let dir = ''
        if (this.currentRoom.coords.x < this.previousRoom.coords.x) {
            dir = 'LEFT'
        }
        else if (this.currentRoom.coords.x > this.previousRoom.coords.x) {
            dir = 'RIGHT'
        }
        else if (this.currentRoom.coords.y < this.previousRoom.coords.y) {
            dir = 'UP'
        }
        else if (this.currentRoom.coords.y > this.previousRoom.coords.y) {
            dir = 'DOWN'
        }

        return dir
    }
    get defaultState() {
        return {
            id: 1,
            name: 'PlayerName',
            lastPlayed: Date.now(),
            x: 0,
            y: 0,
            physics: { //Placeholder physics parameters. Should be defined from ship type/ inventory data and added to config in a preload function before the constructor fires
                mass: 300,
                acc: 10,
                maxVelocity: 5
            },
            inventory: [],
            ships: [{
                id: 1,
                ship: {
                    // default ship
                }
            }],
            maxHealth: 100,
            maxEnergy: 1500,            
            shipID: 1 // what ship you're in
        }
    }

    onDeath() {
        this.fireEvent('gameOver')
        this.fireEvent('removeEntity')
        this.destroy()
        this.particleEmitter.pause()
        this.particleEmitter.setVisible(false)
        this.targeter.setVisible(false)
    }

    update(time, delta) {
        if (this.energy) { this.energy.update(time, delta) }
        let inputVector = new Phaser.Math.Vector2()
        let turnDirection = Phaser.Math.Angle.ShortestBetween(this.angle, this.targetAngle)
        let turnAngle = Phaser.Math.Difference(this.angle, this.targetAngle)
        let turnRate = 0.01
        let boost = false;
        let boostVector = new Phaser.Math.Vector2()

        if (Phaser.Input.Keyboard.JustDown(this.inputstate.space)) {
            if (this.energy.currentEnergy > this.boostCost) {
                this.boostReady = true;
            }
        }

        for (var input in this.inputstate) {
            if (this.inputstate[input].isDown) {
                switch (input) {
                    case 'up':
                        inputVector.y += -this.acc
                        break;
                    case 'down':
                        inputVector.y += this.acc
                        break;
                    case 'left':
                        inputVector.x += -this.acc
                        break;
                    case 'right':
                        inputVector.x += this.acc
                        break;
                    case 'space':
                        if (this.boostReady && turnAngle <= 45) {
                            boostVector.x = (Math.cos(this.rotation) / 10) * this.boostPower 
                            boostVector.y = (Math.sin(this.rotation) / 10) * this.boostPower
                            this.energy.currentEnergy -= Math.ceil(this.boostCost / delta)
                        }

                        if (this.energy.currentEnergy <= 1) {
                            this.boostReady = false
                        }
                        break;
                }               
                this.targetAngle = Phaser.Math.Angle.WrapDegrees(Phaser.Math.RadToDeg(inputVector.angle()))
            }

        }

        this.prev = new Phaser.Math.Vector2(this.state.x, this.state.y)
        this.applyForce({ x: boostVector.x + inputVector.x / 1000, y: boostVector.y + inputVector.y / 1000 })
        this.setVelocityX(Phaser.Math.Clamp((inputVector.x != 0) ? this.body.velocity.x: this.body.velocity.x * 0.99, -this.body.maxVelocity, this.body.maxVelocity))
        this.setVelocityY(Phaser.Math.Clamp((inputVector.y != 0) ? this.body.velocity.y: this.body.velocity.y * 0.99, -this.body.maxVelocity, this.body.maxVelocity))
        this.updatePosition()

        this.targeter.x += this.x - this.prev.x
        this.targeter.y += this.y - this.prev.y

        if (inputVector.length() == 0) {
            this.targetAngle = this.angle
        }

        if (this.body.angularVelocity != 0 || turnAngle > 1) {
            if (turnAngle > 90) {
                (turnDirection > 0 ?
                    this.setAngularVelocity(this.body.angularVelocity += turnRate * 1.5) :
                    this.setAngularVelocity(this.body.angularVelocity -= turnRate * 1.5)
                )
            }
            else {
                this.setAngularVelocity(this.body.angularVelocity *= 0.85)
            }

            if (turnAngle <= 2) {
                this.setAngularVelocity(0)
            }
            else if (turnAngle <= 10) {
                this.angle = this.targetAngle
                this.setAngularVelocity(this.body.angularVelocity *= 0.75)
            }
            else {
                (turnDirection > 0 ?
                    this.setAngularVelocity(this.body.angularVelocity += turnRate) :
                    this.setAngularVelocity(this.body.angularVelocity -= turnRate)
                )
            }

        }

        if (Math.abs(this.body.angularVelocity) > this.maxTurn) {
            this.setAngularVelocity(this.body.angularVelocity *= 0.85)
        }
        this.setVelocityX(Phaser.Math.Clamp(this.body.velocity.x, -this.state.physics.maxVelocity, this.state.physics.maxVelocity))
        this.setVelocityY(Phaser.Math.Clamp(this.body.velocity.y, -this.state.physics.maxVelocity, this.state.physics.maxVelocity))
        this.updateParticles()
    }

    updateParticles() {
      let frames = [ 'red', 'pink', 'purple', 'blue', 'teal' ]
      let maxSpeed = 7


      this.particleEmitter.setEmitterAngle(Phaser.Math.RadToDeg(this.body.angle + Math.PI))
      this.particleEmitter.setSpeed(this.body.speed / 2) * 5 + 20
      this.particleEmitter.setScale({ start: (this.body.speed * .04) + .04, end: 0 })
      this.particleEmitter.setLifespan((Math.random() * 300 + 300))
      this.particleEmitter.setFrame(frames[Math.floor((Math.floor(this.body.speed) / maxSpeed) * frames.length) ])

      let newPoint = Phaser.Math.Rotate({x: 0, y: 40}, this.body.angle + Math.PI / 2)
      this.particleEmitter.followOffset = {x: newPoint.x + Math.random() * 10 - 5, y: newPoint.y + Math.random() * 10 - 5}



    }
}
