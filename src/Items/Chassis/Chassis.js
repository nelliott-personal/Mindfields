class Chassis {

  constructor(config = null){

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

class Osprey extends Chassis {
  constructor(config){
    super(config)
  }
  get defaultState(){
    return {
      baseWeight: 100,
      maxWeight: 800,
      maxCargoWeight:400,
      maxHealth: 100,
      maxEnergy: 100,
      cargo:[
        {
          itemID: 1,
          itemName: 'Thorium',
          quantity: 5
        }
      ],
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

export { Chassis, Osprey }
