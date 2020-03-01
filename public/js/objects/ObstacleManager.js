import GameComponent from "../engine/core/GameComponent.js";
import Obstacle from "./Obstacle.js";

export default class ObstacleManager extends GameComponent{

    init(game){
        super.init(game)
        this.interval = 100
        this.screenSize = this.game.getScreenSize()
        this.settings = {
            x: this.screenSize.width + 10, 
            y: this.screenSize.height - 30,
            width: 10,
            height: 30
        }
    }

    update(){
        super.update()
        this.spawn()
        console.log('Components: ' + Object.keys(this.components).length)
    }

    spawn(){
        if(this.game.everyInterval(this.interval)){
            let obstacle = new Obstacle(this.settings)
            super.addComponent(obstacle)
        }
    }
}