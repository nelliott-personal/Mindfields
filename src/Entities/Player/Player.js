import SaveState from '../../Utils/SaveState'
import Helpers from '../../Utils/Helpers'
import Entity from '../Entity'
import Ship from '../../Ships/Ship'

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

        //this.body.maxAngular = 800
        //this.body.setFriction(10)
        //this.body.setDrag(300) //Keep Drag off
        this.scaleX = .4
        this.scaleY = .4

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
                mass: 1000,
                acc: 10,
                maxVelocity: 10
            },
            inventory: [],
            ships: [{
                id: 1,
                ship: {
                    // default ship
                }
            }],
            shipID: 1 // what ship you're in
        }
    }

    update(time, delta) {
        let inputVector = new Phaser.Math.Vector2()
        //let xAcc = 0
        //let yAcc = 0
        //let force = new Phaser.Math.Vector2()
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
                }
                this.targetAngle = Phaser.Math.Angle.WrapDegrees(Phaser.Math.RadToDeg(inputVector.angle()))

            }

        }
        this.prev = new Phaser.Math.Vector2(this.state.x, this.state.y)
        this.updatePosition()
        this.applyForce({ x: inputVector.x / 100, y: inputVector.y / 100 })
        this.setVelocityX(Phaser.Math.Clamp((inputVector.x != 0) ? this.body.velocity.x: this.body.velocity.x * 0.95, -this.body.maxVelocity, this.body.maxVelocity))
        this.setVelocityY(Phaser.Math.Clamp((inputVector.y != 0) ? this.body.velocity.y : this.body.velocity.y * 0.95, -this.body.maxVelocity, this.body.maxVelocity))
        this.targeter.x += this.x - this.prev.x
        this.targeter.y += this.y - this.prev.y

        if (inputVector.length() == 0) {
            this.targetAngle = this.angle
        }

        let turnDirection = Phaser.Math.Angle.ShortestBetween(this.angle, this.targetAngle)
        let turnAngle = Phaser.Math.Difference(this.angle, this.targetAngle)
        if (this.body.angularVelocity != 0 || turnAngle > 1) {
            if (turnAngle > 90) {
                (turnDirection > 0 ?
                    this.setAngularVelocity(this.body.angularVelocity += 0.015) :
                    this.setAngularVelocity(this.body.angularVelocity -= 0.015)
                )
            }
            else {
                this.setAngularVelocity(this.body.angularVelocity *= 0.85)
            }

            if (turnAngle <= 2) {
                this.angle = this.targetAngle
                this.setAngularVelocity(0)
            }
            else if (turnAngle <= 10) {
                this.setAngularVelocity(this.body.angularVelocity *= 0.75)
            }
            else {
                (turnDirection > 0 ?
                    this.setAngularVelocity(this.body.angularVelocity += 0.01) :
                    this.setAngularVelocity(this.body.angularVelocity -= 0.01)
                )
            }

        }

        if (Math.abs(this.body.angularVelocity) > this.maxTurn) {
            this.setAngularVelocity(this.body.angularVelocity *= 0.85)
        }       
    }
}
