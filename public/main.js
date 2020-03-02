import Game from './js/engine/core/Game.js'
import Player from './js/objects/Player.js'
import ObstacleManager from './js/objects/ObstacleManager.js'

const game = new Game()

// create and add components to game
const player = new Player({ x: 10, y: 10, width: 30, height: 30, collision: true })
const obstacleManager = new ObstacleManager()

game.addComponent(player)
game.addComponent(obstacleManager)



