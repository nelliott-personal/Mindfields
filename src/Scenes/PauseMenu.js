import InputMap from '../UserInput/InputMap'

export default class PauseMenu extends Phaser.Scene {
  constructor(){
    super({
        key: 'PauseMenu',
        active: true
    })
    addEventListener('keydown', (e) => {
      if(e.keyCode == InputMap.getControl('PAUSE') && this.scene.get('SpaceScene').isPaused){
        e.preventDefault()
        console.log('unpause')
        this.close()
      }
    })
  }
  preload(){
  }
  create(){
    this.drawMenu()
    this.menutext = this.add.text(10, 10, 'PAUSE MENU', { font: '42px Arial', fill: '#FFFFFF' })
    this.scene.sleep()
  }
  drawMenu(){
    this.bg = this.add.graphics()

    this.bg.fillStyle(0x000000, .5)
    this.bg.fillRect(0, 0, this.scene.get('SpaceScene').cameras.main.width, this.scene.get('SpaceScene').cameras.main.height)
  }
  open(){
    this.scene.wake()
  }
  close(){
    this.scene.sleep()
  }
  update(){

  }
}
