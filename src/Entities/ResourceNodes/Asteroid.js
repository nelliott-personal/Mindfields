import Helpers from '../../Utils/Helpers'
import Entity from '../Entity'

export default class Asteroid extends Entity{

  constructor(config){
    super(config)
    this.body.allowRotation = true
      this.setAngularVelocity(0.1)
      this.setBody({
          type: 'polygon',
          sides:8,
          radius: 24
      })
  }

  changedRoom(e){
    console.log('Asteroid changed room')
  }

  update(time, delta){
    this.setMass(10)
    this.setBounce(0.5, 0.5)
    this.updatePosition()
  }

}
