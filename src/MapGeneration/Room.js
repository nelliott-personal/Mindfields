import noise from 'noisejs-ilmiont'

export default class Room {

  constructor(state = {
    x: 0,
    y: 0,
    lastEntered: Date.now(),
    resources:[
      {
        id: 1,
        respawnTime: 12 // override respawn time with saved room data
      }
    ],
    entities:[
      {
        // entity state
      }
    ]
  })
  {
    // constructor body
  }

}
