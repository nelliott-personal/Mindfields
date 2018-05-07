/*

Planets contain distributions of Biomes.

*/

let Planets = [
  {
    id: 1,
    name: 'Planet X',
    biomes:[
      {
        id: 1,
        chance: .1 // chances should always add up to 1
      }
    ]
  }
]

/*

Biomes contain distributions of room types and room layouts

*/

let Biomes = [
  {
    id: 1,
    name: 'Biome 1',
    roomTypes:[
      {
        id: 1,
        chance: .1
      }
    ],
    roomLayouts:[
      {
        id: 1,
        chance: .1
      }
    ]
  }
]

/*

RoomTypes contain distributions of resources

*/

let RoomTypes = [
  {
    id: 1,
    name: 'Room Type 1',
    resources:[
      {
        id: 1,
        chance: .1
      }
    ]
  }
]

/*

RoomLayouts can be applied to any room type and refer to different room generation algorithms

*/

let RoomLayouts = [
  {
    id: 1,
    name: 'Twisting Cavern',
    overrides:[
      {
        CaveBranches: 5 // Can override room generation params
      }
    ]
  },
  {
    id: 2,
    name: 'Open Space'
  },
  {
    id: 3,
    name: 'Rocky'
  }
]

/*

All child objects can be overriden by the parent, for instance:

let Biomes = [
  {
    id: 999,
    name: 'Custom Biome',
    roomTypes: [
      id: 1,
      chance: .1,
      resources: [
        (override default room type resources)
      ]
    ]
  }
]

*/

export { Biomes, RoomTypes, RoomLayouts }
