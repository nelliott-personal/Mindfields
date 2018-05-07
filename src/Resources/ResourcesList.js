let Resources = [
  {
    id: 1,
    name: 'Coal',
    containerID: 1,
    respawnTime: 60 // Seconds for resource node to respawn
  },
  {
    id: 2,
    name: 'Diamond',
    containerID: 3,
    respawnTime: 300
  }
  {
    id: 999,
    name: 'Yttrium',
    containerID: 3,
    respawnTime: 600
  }
]

let ResourceContainers = [
  {
    id: 1,
    name: 'Outcropping' // Controls where and how the resource is represented in a room
  },
  {
    id: 2,
    name: 'Geyser'
  },
  {
    id: 3,
    name: 'Asteroid'
  }
]

export { Resources, ResourceContainers }
