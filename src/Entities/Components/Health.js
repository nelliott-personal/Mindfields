import Helpers from '../../Utils/Helpers'

export default class Health extends Phaser.GameObjects.GameObject {

    constructor(config) {
        super(config.scene, "Entity_Component")
        this.state = Helpers.setState(config.state, this.defaultState)        
    }

    get defaultState() {

        return {
            maxHealth: 100,
            currentHealth: 100 //default currentHealth should be max health! wat do
        }

    }

    changeHealth(h) {
        if (this.currentHealth + h <= 0) {
            this.emit('you-dead')
        }
        this.currentHealth += h

    }
    set currentHealth(h) {
        this.state.currentHealth = Phaser.Math.Clamp(h, 0, this.maxHealth)

    }

    get currentHealth() {
        return this.state.currentHealth
    }

    get maxHealth() {
        return this.state.maxHealth
    }

}
