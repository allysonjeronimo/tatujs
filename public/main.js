import Game from './js/engine/core/Game.js'
import Player from './js/objects/Player.js'
import ObstacleManager from './js/objects/ObstacleManager.js'

const game = new Game({renderer:{width:200, height: 200}, debug: true})

// create and add components to game
const player = new Player()
const obstacleManager = new ObstacleManager()

game.addComponent(player)
game.addComponent(obstacleManager)



