import Game from './js/engine/core/Game.js'
import Player from './js/objects/Player.js'
import Obstacle from './js/objects/Obstacle.js'

const game = Game()
// create and add components to game
const player = new Player(10, 10, 30, 30, 2, '#8be9fd')
const obstacle = new Obstacle(300, 120, 10, 200, 0, '#8be9fd')

game.addComponent(player)
game.addComponent(obstacle)



