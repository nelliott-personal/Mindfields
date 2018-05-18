export default class DevUI extends Phaser.Scene {
    constructor(gameScene) {
        super({
            key: 'DevUI',
            active: true
        })
        this.gameScene = gameScene
    }

    create() {
        this.fps = this.add.text(10, 10, 'FPS: 0', { font: '12px Arial', fill: '#FFFFFF' })
        console.log('dev')
    }

    update() {
        this.fps.setText('FPS: ' + game.loop.actualFps)
    }
}
