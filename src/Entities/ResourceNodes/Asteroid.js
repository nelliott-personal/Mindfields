import Helpers from '../../Utils/Helpers'
import Entity from '../Entity'

export default class Asteroid extends Entity{

  constructor(config){
    super(config)
    this.body.allowRotation = true
    this.body.setAngularVelocity(25)
  }

  changedRoom(e){
    console.log('Asteroid changed room')
  }

  update(time, delta){
    this.body.setMass(10)
    this.body.setBounce(0.8, 0.8)
    this.updatePosition()
  }

}
