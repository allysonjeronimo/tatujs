import inputManager from './js/input-manager.js'
const input = inputManager()

let state = {}

const game = {
    canvas: document.getElementById('content-game'),
    infoPanel: {
        playerPosition: document.getElementById('player-position'),
    },
    start: function () {
        this.context = this.canvas.getContext('2d')
        this.interval = setInterval(updateGame, 20)
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    showDebugPanel: function () {
        this.infoPanel.playerPosition.innerHTML = `(${state.player.x},${state.player.y})`,
    }
}

function startGame() {
    game.start()
    state.player = new Component(30, 30, '#8be9fd', 10, 10)
}

function updateGame() {
    game.clear()
    state.player.update()
    state.player.draw()
    game.showDebugPanel()
}

function Component(width, height, color, x, y) {
    this.width = width
    this.height = height
    this.color = color
    this.x = x
    this.y = y
    this.speed = 2

    this.updatePosition = function () {
        // const axis = input.getAxis()
        // this.x += axis.x * this.speed
        // this.y += axis.y * this.speed
        const position = input.getMousePosition(game.canvas)
        this.x = position.x
        this.y = position.y
    }

    this.update = function () {
        this.updatePosition()
    }

    this.draw = function () {
        game.context.fillStyle = color
        game.context.fillRect(this.x, this.y, this.width, this.height)
    }
}

startGame()