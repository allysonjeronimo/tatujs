export default function Physics(settings){

    if(typeof Physics.instance === 'object')
        return Physics.instance

    this.checkCollision = function(gameComponent1, gameComponent2){
        if (!gameComponent1.detectCollision || !gameComponent2.detectCollision) return

        let rectangle1 = gameComponent1.getRectangle()
        let rectangle2 = gameComponent2.getRectangle()

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
