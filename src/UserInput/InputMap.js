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
        BOOST: Phaser.Input.Keyboard.KeyCodes.SPACE,
        ABILITY_1: 'q',
        ABILITY_2: 'w',
        ABILITY_3: 'r',
        PAUSE: Phaser.Input.Keyboard.KeyCodes.TAB,
        FULLSCREEN: Phaser.Input.Keyboard.KeyCodes.P
      }
    }
  }

}
