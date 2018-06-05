import AnimatedTiles from 'phaser-animated-tiles'
import ChunkManager from '../MapGeneration/ChunkManager'
import Player from '../Entities/Player/Player'
import Asteroid from '../Entities/ResourceNodes/Asteroid'
import Entity from '../Entities/Entity'
import SaveState from '../Utils/SaveState'
import Helpers from '../Utils/Helpers'
import InputMap from '../UserInput/InputMap'

export default class SpaceScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'SpaceScene'
        })
    }

    preload() {
        this.load.image('ship', 'assets/images/ship.png')
        this.load.image('targeter', 'assets/images/crosshair.png')
        this.load.image('spacerock', 'assets/images/spacerock.png')
        this.load.image('bg1', 'assets/images/bg/bg1.png')
        this.load.image('bg2', 'assets/images/bg/bg2.png')
        this.load.image('bg3', 'assets/images/bg/bg3.png')
        this.load.image('bg4', 'assets/images/bg/bg4.png')
        this.load.image('bg5', 'assets/images/bg/bg5.png')

        this.load.atlas('flares', 'assets/images/particles/flares.png', 'assets/images/particles/flares.json');

        this.load.image('viscerared', 'assets/images/bg/viscera_transparent.png')
        if (!this.scene.isActive('DevUI')) {
            this.scene.launch('DevUI', {
                gameScene: this
            })
        }
    }

    create() {
        console.log('Saved State: ', SaveState.state)
        this.events.on('gameOver', this.onGameOver, this)
        this.state = SaveState.state
        this.isStopped = false;
        this.CM = new ChunkManager({
            scene: this,
            state: {
                seed: this.state.seed
            }
        })

        this.Entities = this.add.group()

        this.Entities.add(
            new Player({
                scene: this,
                key: 'ship',
                x: 1250,
                y: 1250,
                state: this.state.Player,
                targeter: this.add.image(1250, 1250, 'targeter')
            })
        )
        for (var i = 0; i < 8; i++) {
            var x = Phaser.Math.Between(1250 - 550, 1250 + 600);
            var y = Phaser.Math.Between(1250 - 550, 1250 + 600);
            this.Entities.add(
                new Asteroid({
                    scene: this,
                    key: 'spacerock',
                    x: x,
                    y: y,
                    state: {
                        maxHealth: 10000
                    }
                })
            )
        }

        this.matter.world.on('collisionstart', function(event, bodyA, bodyB) {
            if (bodyA.gameObject instanceof Entity) {
                bodyA.gameObject.onCollision(event, bodyB)
            }
            if (bodyB.gameObject instanceof Entity) {
                bodyB.gameObject.onCollision(event, bodyA)
            }
        })

        this.P = this.Entities.getChildren()[0]
        //this.physics.add.collider(this.P, this.Entities.getChildren()[1])
        this.input.mouse.capture = true
        this.isPaused = false;
        this.setupCamera()
        this.setupKeys()
        this.setupBG()
    }

    setupBG() {

        this.bg = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, 'bg5')
        this.bg.setOrigin(0)
        this.bg.depth = -20
        this.bg.setScrollFactor(0)

    }

    setupCamera() {
        this.cameras.main.startFollow(this.P)
        this.cameras.main.on('camerafadeoutcomplete', function() {

            this.scene.restart();

        }, this);
    }

    setupKeys() {
        this.inputstate = {
            z: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
            x: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X)
        }

        addEventListener('keydown', (e) => {
            if (e.keyCode == InputMap.getControl('PAUSE')) {
                e.preventDefault()
                if (this.isPaused) {
                    this.isPaused = false
                    this.scene.get('PauseMenu').close()
                    this.scene.resume()
                }
                else {
                    this.isPaused = true
                    this.scene.pause()
                    this.scene.get('PauseMenu').open()
                }
            }
            else if (e.keyCode == InputMap.getControl('FULLSCREEN')) {
                window['game']['canvas'][game.device.fullscreen.request]();
            }
        })

    }

    update(time, delta) {
        if (this.P.isAc) {
            this.bg.setTilePosition(this.P.x * .25, this.P.y * .25)
        }

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
    }

    onGameOver(e) {
        this.cameras.main.stopFollow(this.P)
        this.cameras.main.fade(2000);
    }
}
