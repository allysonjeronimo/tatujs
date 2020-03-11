let myCollection = {
    0 : {id: 1, type: 'Body'},
    1 : {id: 2, type: 'Transform'}
}

let components = Object.values(myCollection)

console.log(components)

components.forEach(c => console.log(c))
let vieweds = components.map(c => {return {...c, viewed: true}})

console.log(components.find(c => c.type === 'Body'))


