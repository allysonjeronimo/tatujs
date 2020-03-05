import Game from './js/engine/core/Game.js'
import Player from './js/objects/Player.js'
import ObstacleManager from './js/objects/ObstacleManager.js'
import Background from './js/objects/Background.js'
import Audio from './js/engine/entity/Audio.js'

const game = new Game({renderer:{width:300, height: 200}, debug: false})

// create and add components to game
const background = new Background()
const player = new Player()
const obstacleManager = new ObstacleManager()
const audioBackground = new Audio({file: 'audio/music.mp3'})

audioBackground.play()
// game.addComponent(background)
game.addComponent(player)
game.addComponent(obstacleManager)



