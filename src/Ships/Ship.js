import MODULE_TYPES from '../Items/Modules/Modules'

class Ship {

  constructor(state = null) {

  }

}

class Chassis {

  constructor(state = null){

  }

  get defaultState(){
    return {
      baseWeight: 100,
      maxWeight: 800,
      maxCargoWeight:400,
      maxHealth: 100,
      maxEnergy: 100,
      cargo:[],
      modules:[
        {
          type: MODULE_TYPES.ENGINE,
          equipped: {
            // equippable item
          }
        }
      ]

    }
  }

}

{

}

class Health {

  constructor(state = null){

  }

  get defaultState(){

    return {
      maxHealth: 100,
      currentHealth: 100
    }

  }


  changeHealth(h){
    if(this.currentHealth + h <= 0){
      this.emit('you-dead')
    }
    this.currentHealth += h

  }
  set currentHealth(h){
    this.state.currentHealth = Phaser.Math.Clamp(h, 0, this.maxHealth)

  }

  get currentHealth(){
    return this.state.currentHealth
  }

  get maxHealth(){
    return this.state.maxHealth
  }

}

class Energy {

  constructor(state = null){

  }

}

export { Ship, Chassis, Health, Energy }
