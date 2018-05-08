let DefaultGameState = {
  seed: Math.random(),
  Player: {
    id: 1,
    name: 'PlayerName',
    lastPlayed: Date.now(),
    x:parseInt(Math.random() * 2000) - 1000,
    y:parseInt(Math.random() * 2000) - 1000,
    inventory: [],
    ships: [{
      id:1,
      ship:{
        // default ship
      }
    }],
    shipID: 1 // what ship you're in
  },
  Planets: {
    id: 1,
    Chunk:{
      x: 0,
      y: 0,
      Rooms: []
    }
  }
}

export { DefaultGameState }
