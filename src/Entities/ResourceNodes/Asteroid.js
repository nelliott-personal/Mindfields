import Helpers from '../../Utils/Helpers'
import Entity from '../Entity'
import Health from '../Components/Health'

export default class Asteroid extends Entity{

  constructor(config){
    super(config)
    this.body.allowRotation = true
    this.scaleX = 1
    this.scaleY = 1
    this.setBody({
        type: 'polygon',
        sides:8,
        radius: 24
    })
    this.setMass(10000)
    //this.setDensity(1000)
    this.setBounce(0.5, 0.5)
    this.setFrictionAir(0)
    this.setAngularVelocity(0.01)

    this.health = new Health(this)
  }

  changedRoom(e){
    console.log('Asteroid changed room')
  }

  update(time, delta){
    this.updatePosition()
  }

}
