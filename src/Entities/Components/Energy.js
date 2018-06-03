import Helpers from '../../Utils/Helpers'

export default class Energy extends Phaser.GameObjects.GameObject {

    constructor(config, entity) {
        super(config.scene, "Entity_Component")
        this.state = Helpers.setState(config.state, this.defaultState)
        this.entity = entity
        if (this.state.currentEnergy <= 0) { this.state.currentEnergy = this.state.maxEnergy }
    }

    update(time, delta) {
        this.changeEnergy(15 / delta)
    }

    get defaultState() {
        return {
            maxEnergy: 1500,
            currentEnergy: 0 //default currentHealth should be max health! wat do
        }
    }

    changeEnergy(e) {
        e = Math.ceil(e)
        if (this.currentEnergy + e <= 0) {                        
        }
        this.currentEnergy += e
    }

    set currentEnergy(e) {
        this.state.currentEnergy = Phaser.Math.Clamp(e, 0, this.maxEnergy)

    }

    get currentEnergy() {
        return this.state.currentEnergy
    }

    get maxEnergy() {
        return this.state.maxEnergy
    }
}
