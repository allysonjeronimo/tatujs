import Game from './js/engine/core/Game.js'
import Player from './js/objects/Player.js'
import ObstacleManager from './js/objects/ObstacleManager.js'
import Colors from './js/engine/util/Colors.js'

const game = new Game({renderer:{width:300, height: 200}})

// create and add components to game
const player = new Player({ x: 10, y: 170, width: 30, height: 30, detectCollision: true, color: Colors.DEFAULT, visible: true})
const obstacleManager = new ObstacleManager({visible: false})

game.addComponent(player)
game.addComponent(obstacleManager)



