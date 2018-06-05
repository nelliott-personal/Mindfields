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
    this.setBounce(1, 1)
    this.setFrictionAir(0)
    this.setAngularVelocity(0.01)
    this.setVelocity(Phaser.Math.Between(-1, 1.5), Phaser.Math.Between(-1, 1.5))
    this.health = new Health(config, this)
  }

    onDeath() {
        this.fireEvent('removeEntity')
        this.destroy()
    }

  changedRoom(e){
    console.log('Asteroid changed room')
  }

  update(time, delta){
    this.updatePosition()
  }

}
