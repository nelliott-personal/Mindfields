import Helpers from '../Utils/Helpers'

export default class DebugOverlay extends Phaser.GameObjects.Graphics {
  constructor(config){
    super(config.scene)

    this.scene.add.existing(this)
  }

  drawRooms(){
    this.clear()
    this.scene.debugTextGroup.destroy()
    this.scene.debugTextGroup = this.scene.add.group()
    for(let r of this.scene.CM.Chunk.Rooms){
      let config = {
        x: r.position.x + 10,
        y: r.position.y + 10,
        text: r.coords.x + ',' + r.coords.y,
        style: { fontSize:'36px', align:'center' }
      }
      this.scene.debugTextGroup.add(this.scene.make.text(config))
      //let t = this.scene.add.text(r.position.x + 10, r.position.y + 10, r.coords.x + ',' + r.coords.y, { fontSize:'36px', align:'center' })
      if(r.isNew == true){
        this.fillStyle('0x0046FF', r.noiseVal)
      }
      else{
          this.fillStyle('0xFF0000', r.noiseVal)
      }

      this.fillRect(r.position.x, r.position.y, r.size.width, r.size.height)
    }
  }
}
