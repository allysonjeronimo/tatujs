import Game from './js/engine/core/Game.js'
import Player from './js/objects/Player.js'

const game = Game()
// create and add components to game
const player = new Player(10, 10, 30, 30, 2, '#8be9fd')

game.addComponent(player)



