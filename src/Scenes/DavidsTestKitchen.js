import Player from '../Entities/Player/Player'
import Asteroid from '../Entities/ResourceNodes/Asteroid'
import Entity from '../Entities/Entity'
import SaveState from '../Utils/SaveState'
import Helpers from '../Utils/Helpers'
import InputMap from '../UserInput/InputMap'

export default class DavidsTestKitchen extends Phaser.Scene {
    constructor() {
        super({ key: 'DavidsTestKitchen' })
    }

    preload() {
        this.load.image('spacebg', 'assets/images/bg/spacebg.png')
        this.load.image('ship', 'assets/images/ship.png')
        this.load.image('targeter', 'assets/images/crosshair.png')
        this.load.image('spacerock', 'assets/images/spacerock.png')
        this.load.atlas('flares', 'assets/images/particles/flares.png', 'assets/images/particles/flares.json');

        if (!this.scene.isActive('DevUI')) {
            this.scene.launch('DevUI', { gameScene: this })
        }
    }

    create() {       
        var bg = this.add.image(0, 0, 'spacebg')
        bg.depth = -10
        //bg.setOrigin(0,0)
        this.state = SaveState.state
        this.events.on('gameOver', this.onGameOver, this) 
        this.Entities = this.add.group(this)

        this.Entities.add(
            this.P = new Player({
                scene: this,
                key: 'ship',
                x: 50,
                y: 50,
                state: this.state.Player,
                targeter: this.add.image(50, 50, 'targeter')
            })
        )
        for (var i = 0; i < 64; i++) {
            var x = Phaser.Math.Between(-750, 800);
            var y = Phaser.Math.Between(-750, 800);
            this.Entities.add(
                new Asteroid({
                    scene: this,
                    key: 'spacerock',
                    x: x,
                    y: y,
                    state: {
                        maxHealth: 10000
                    }
                }).setVelocity(Phaser.Math.Between(-1, 1.5), Phaser.Math.Between(-1, 1.5))
                )
        }
        /*
        this.Entities.add(
            this.A = new Asteroid({
                scene: this,
                key: 'spacerock',
                x: 300,
                y: 50,
                state: {
                    maxHealth: 10000
                }
            })
        )*/

        this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
            bodyA.gameObject.onCollision(event, bodyB)
            bodyB.gameObject.onCollision(event, bodyA)
        })

        this.setupCamera()
        this.debugText = this.add.container(this.P.x, this.P.y + 48)

        this.inputstate = {
            z: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
            x: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X)
        }
    }

    setupCamera() {
        this.cameras.main.setScroll(this.P.x - this.cameras.main.width / 2, this.P.y - this.cameras.main.height / 2)
        this.cameras.main.startFollow(this.P)

        this.cameras.main.on('camerafadeoutcomplete', function () {

            this.scene.restart();

        }, this);
    }

    update(time, delta) {
        for (let gobj of this.Entities.getChildren()) {
            gobj.update(time, delta)
        }
        for (let input in this.inputstate) {
            if (this.inputstate[input].isDown) {
                if (input == 'z') {
                    this.cameras.main.zoom -= .01
                }
                else if (input == 'x') {
                    this.cameras.main.zoom += .01
                }
            }
        }

        //this.debugText.getAt(0).setText('Current Angle: ' + this.P.angle)
        //this.debugText.getAt(1).setText('Target Angle: ' + this.P.targetAngle)
        //this.debugText.setPosition(this.P.x - 48, this.P.y + 48)
    }

    onGameOver(e) {
        this.cameras.main.stopFollow(this.P)
        this.cameras.main.fade(2000);
    }
}
