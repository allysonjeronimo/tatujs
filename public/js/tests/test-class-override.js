class Person{

    constructor(name, age){
        this.name = name
        this.age = age
    }

    print(){
        console.log('Person', this.name, this.age);
    }
}

class Costumer extends Person{

    print(){
        super.print()
        console.log('Customer', this.name, this.age)
    }
}

// const p = new Person('Allyson', 34)
// p.print()

const c = new Costumer('Nayanne', 30)
c.print()

