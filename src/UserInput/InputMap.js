import Helpers from '../Utils/Helpers'

export default class InputMap {
  static getControls(){
    return this.state.controls
  }
  static saveControl(k, v){
    this.state.controls[k] = v
  }
  static getControl(k){
    return this.getDefaultState().controls[k]
  }
  static getDefaultState(){
    return {
      controls: {
        UP: Phaser.Input.Keyboard.KeyCodes.W,
        DOWN: Phaser.Input.Keyboard.KeyCodes.S,
        LEFT: Phaser.Input.Keyboard.KeyCodes.A,
        RIGHT: Phaser.Input.Keyboard.KeyCodes.D,
        PRIMARY_FIRE: 'MOUSE1',
        SECONDARY_FIRE: 'MOUSE2',
        BOOST: 'SHIFT',
        ABILITY_1: 'SPACE',
        ABILITY_2: 'q',
        ABILITY_3: 'e',
        PAUSE: Phaser.Input.Keyboard.KeyCodes.TAB,
        FULLSCREEN: Phaser.Input.Keyboard.KeyCodes.P
      }
    }
  }

}
