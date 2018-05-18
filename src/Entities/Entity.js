import Helpers from '../Utils/Helpers'
import localforage from 'localforage'

export default class Entity extends Phaser.Physics.Matter.Sprite {
    constructor(config) {
        super(config.scene.matter.world, config.x, config.y, config.key)
        config.scene.add.existing(this)
        this.state = Helpers.setState(config.state, this.defaultState)
        this.addListener('roomchange', this.changedRoom, this)
        this.loadTimeout = {}
    }
    get defaultState() {
        return {
            id: 1,
            name: 'Entity',
            x: 0,
            y: 0
        }
    }
    get currentRoom() {
        return this.state.currentRoom
    }
    set currentRoom(cR) {
        this.state.currentRoom = cR
        return this.state.currentRoom
    }
    get previousRoom() {
        return this.state.previousRoom
    }
    set previousRoom(pR) {
        this.state.previousRoom = pR
        return this.state.previousRoom
    }
    save() {
        //localforage.save()
    }
    changedRoom(e) {

    }
    update(time, delta) {
        this.updatePosition()
    }
    updatePosition() {
        this.state.x = this.x
        this.state.y = this.y

        if (this.scene.CM) {
            let cR = this.scene.CM.Chunk.getCurrentRoom(this.x, this.y)

            if (cR != this.currentRoom) {
                if (this.previousRoom == null) {
                    this.previousRoom = cR
                }
                else {
                    this.previousRoom = this.currentRoom;
                }
                this.currentRoom = cR
                /*
                this.loadTimeout = setTimeout(() => {
                    this.emit('roomchange')
                }, Math.random() * 600 + 400)
                */
                this.emit('roomchange')
            }
        }
    }
}
