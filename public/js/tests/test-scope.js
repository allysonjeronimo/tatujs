function mother(){

    this.test = ''
    
    function son(){
        this.name = 'Ana'
    }

    function show(){
        console.log(this.name)
    }

    son()
}

console.log(mother)
console.log(this)

