// let components = []
let components = {}

// components.push({id: components.length, value:'A'})
// components.push({id: components.length, value:'B'})
components[Object.keys(components).length] = {value:'A'}
components[Object.keys(components).length] = {value:'B'}

console.log('Antes de remover:')
for(let i in components){
    console.log(i, components[i])
}

console.log('Removendo...')
// components.splice(0, 1)
delete components['0']

console.log('Depois de remover:')
for(let i in components){
    console.log(i, components[i])
}

