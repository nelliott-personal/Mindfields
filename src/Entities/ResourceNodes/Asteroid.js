import Helpers from '../../Utils/Helpers'
import Entity from '../Entity'

export default class Asteroid extends Entity{

  constructor(config){
    super(config)
    this.body.allowRotation = true
    this.body.setAngularVelocity(25)
  }

}
