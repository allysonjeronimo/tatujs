import GameObject from "../../engine/entity/GameObject.js";
import MathUtil from '../../engine/util/MathUtil.js'
import Obstacle from "./Obstacle.js";

export default class ObstacleManager extends GameObject {

    constructor(settings){
        super({...settings, visible: false})
    }

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
                detectCollision: true
            }

            let obstacle = new Obstacle(settings)

            super.addChild(obstacle)
        }
    }
}