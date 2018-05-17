import Player from '../Entities/Player/Player'
import Asteroid from '../Entities/ResourceNodes/Asteroid'
import Entity from '../Entities/Entity'
import SaveState from '../Utils/SaveState'
import Helpers from '../Utils/Helpers'

export default class DavidsTestKitchen extends Phaser.Scene {
    constructor() {
        super({ key: 'DavidsTestKitchen' })
    }

    preload() {
        this.load.image('spacebg', 'assets/images/spacebg.png')
        this.load.image('ship', 'assets/images/ship.png')
        this.load.image('targeter', 'assets/images/crosshair.png')
        this.load.image('spacerock', 'assets/images/spacerock.png')
    }

    create() {
        var bg = this.add.image(50, 50, 'spacebg')
        bg.depth = -10
        this.state = SaveState.state
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
        this.Entities.add(
            new Asteroid({
                scene: this,
                key: 'spacerock',
                x: 300,
                y: 50,
                state: {}
            })
        )
        
        this.setupCamera()
    }

    setupCamera() {
        this.cameras.main.startFollow(this.P)
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
    }
}
