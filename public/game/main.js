import Game from './engine/core/Game.js'
import Audio from './engine/entity/Audio.js'
import Player from './objects/Player.js'
import ObstacleManager from './objects/ObstacleManager.js'
import Background from './objects/Background.js'

const game = new Game({renderer:{width:300, height: 200}, debug: true})

// create and add components to game
const background = new Background()
const player = new Player()
const obstacleManager = new ObstacleManager()
const audioBackground = new Audio({file: 'audio/music.mp3'})

audioBackground.play()
game.addChild(background)
game.addChild(player)
game.addChild(obstacleManager)



