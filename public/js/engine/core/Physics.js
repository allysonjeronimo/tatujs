export default function Physics(settings){

    if(typeof Physics.instance === 'object')
        return Physics.instance

    this.getRectangle = (gameComponent) => {

        let top = gameComponent.y
        let right = gameComponent.x + gameComponent.width
        let bottom = gameComponent.y + gameComponent.height
        let left = gameComponent.x
    
        return {
            top,
            right,
            bottom,
            left
        }
    }

    this.checkCollision = function(gameComponent1, gameComponent2){
        if (!gameComponent1.detectCollision || !gameComponent2.detectCollision) return

        let rectangle1 = this.getRectangle(gameComponent1)
        let rectangle2 = this.getRectangle(gameComponent2)

        if (rectangle1.right > rectangle2.left && rectangle1.left < rectangle2.right &&
            rectangle1.bottom > rectangle2.top && rectangle1.top < rectangle2.bottom) {
            return true
        }
        else {
            return false
        }
    }
        
    Physics.instance = this
}
