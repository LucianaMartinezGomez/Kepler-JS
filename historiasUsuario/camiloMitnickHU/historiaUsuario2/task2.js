const lista=[1,2,3,3,3,4,5,4,6,7,8,8,8]

console.log("Lista con repetidos-> "+lista)

const listaSinDuplicados=new Set(lista)


const listaUnica=[...listaSinDuplicados]

console.log("Lista unicos-> "+listaUnica)