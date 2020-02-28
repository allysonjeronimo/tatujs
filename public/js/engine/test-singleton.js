function Renderer(){

    if(!Renderer.instance){
        console.log('New Instance')
        Renderer.instance = this
    }

    Renderer.instance.func1 = function (){
        console.log('func1()')
    }

    return Renderer.instance
}

let renderer = new Renderer()
renderer = new Renderer()
renderer = new Renderer()
renderer.func1()