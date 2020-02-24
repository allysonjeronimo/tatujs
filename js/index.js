let state = {}

const game = {
    canvas: document.getElementById('content-game'),
    infoPanel: {
        playerPosition: document.getElementById('player-position')
    },
    start: function () {
        this.context = this.canvas.getContext('2d')
        this.interval = setInterval(updateGame, 20)

        window.addEventListener('keydown', function (e) {
            state.player.key = e.keyCode
        })

        window.addEventListener('keyup', function () {
            state.player.key = false
        })
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    showDebugPanel: function () {
        this.infoPanel.playerPosition.innerHTML = `(${state.player.x},${state.player.y})`
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
    this.speedX = 0
    this.speedY = 0
    this.key = false
    this.steps = 2

    this.checkInput = function () {
        if (this.key === 37) {
            this.speedX = -this.steps
            this.speedY = 0
        }
        if (this.key === 39) {
            this.speedX = this.steps
            this.speedY = 0
        }
        if (this.key === 38) {
            this.speedY = -this.steps
            this.speedX = 0
        }
        if (this.key === 40) {
            this.speedY = this.steps
            this.speedX = 0
        }
    }

    this.update = function () {
        this.checkInput()
        this.x += this.speedX
        this.y += this.speedY
    }

    this.draw = function () {
        game.context.fillStyle = color
        game.context.fillRect(this.x, this.y, this.width, this.height)
    }
}

startGame()