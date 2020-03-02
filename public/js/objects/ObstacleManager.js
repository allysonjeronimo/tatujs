import GameComponent from "../engine/core/GameComponent.js";
import Obstacle from "./Obstacle.js";
import MathUtil from '../engine/util/MathUtil.js'
import Colors from '../engine/util/Colors.js'

export default class ObstacleManager extends GameComponent {

    init(game) {
        super.init(game)
        this.interval = 200
        this.screenSize = this.renderer.getScreenSize()
    }

    update() {
        super.update()
        this.spawn()
    }

    spawn() {
        if (this.game.everyInterval(this.interval)) {

            let math = new MathUtil()
            let heights = [30, 60, 90]
            let height = heights[math.random(0,2)]
            let width = 10

            let settings = {
                x: this.screenSize.width + width,
                y: this.screenSize.height - height,
                width: width,
                height: height,
                color: Colors.RED,
                detectCollision: true
            }

            let obstacle = new Obstacle(settings)
            super.addComponent(obstacle)
        }
    }
}