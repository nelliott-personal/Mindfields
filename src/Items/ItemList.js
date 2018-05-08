let Items = [
  {
    id: 1,
    name: 'Shield Generator',
    slotTypeID: 1,
    ingredients:[ // For crafting
      {
        resourceID: 1,
        quantity: 5
      }
    ]
  }
]

/*

Slots:

Engine
Booster Engine
Power Plant
Mining laser
Weapon Hardpoint 1
Weapon Hardpoint 2
Computer (hacking the environment, doors, etc)
Sensors (upgrades allow you to see enemy health, detect ajacent room types)
Fuel Processor (Inferior versions only use certain kinds of fuel, therefor can only get you so far away from base)

Equipment (Can be placed in world)

Turrets
Walls
Doors
Long range sensors (can scan distant sectors on a long cooldown)
Mining / Collection drones
Refinery (To harvest from gas and liquid resource nodes)
Resource Processors (kind of like a minecraft furnace)
Pipeline (Can connect rooms together to ship items)
Warp Gates (expensive to build, allows travel between distant points)
Uplink (Connect to mothership, used for saving game and...leveling up?...sending goods back?)


*/

export { Items }
