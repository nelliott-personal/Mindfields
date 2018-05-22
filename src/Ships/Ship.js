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



class Energy {

  constructor(state = null){

  }

}

export { Ship, Chassis, Energy }
