/*TASK 1 - Objetos con productos */
const productos = {id: 1, nombre: "Laptop", precio: 1200};

/*TASK 2 - Crea un Set con una lista de números que incluya valores repetidos. */
const numRepetidos = new Set([1,3,5,2,5,2,1,2,3,4,5]);
const numNuevos = [...numRepetidos];
/* Imprimir en consola del set, mostrando como elimina duplicados*/
console.log(`Numeros sin duplicados: ${numNuevos}.`);

/*Agrega un nuevo número al Set utilizando el método .add().*/
numRepetidos.add(7)
const numActualizado = [...numRepetidos]
console.log(`Numeros con un nuevo número: ${numActualizado}.`);

/* Separador */
console.log('--'.repeat(20));
/* Verifica si un número específico existe dentro del Set con .has(). */
function validarNum(num){
    if (numRepetidos.has(num)){
        console.log(`El Set contiene el número ${num}.`);
    }else{
        console.log(`El Set no contiene el número ${num}.`);
    }
}
validarNum(9)

/* Elimina un número del Set con .delete(). */
console.log(numRepetidos.delete(4))
console.log(numNuevos)

/* Separador */
console.log('--'.repeat(20));
/* Recorre el Set utilizando un for…of para mostrar cada valor. */
for(const mostrarNum of numRepetidos){
    console.log(`Número en Set: ${mostrarNum}`);
}

/* Separador */
console.log('--'.repeat(20));
/*  TASK 3  */
/* Creación de un Map */
const productosMap = new Map([
    ["tv", "smart tv 4k"],
    ["ipad","ipad air"],
    ["tablet", "samsung galaxy tab"]
])

/* Obtiene un valor del Map */
console.log(productosMap.get("ipad"))

/* Separador */
console.log('--'.repeat(20));

const notas = {
    matematicas: 2,
    fisica: 7,
    quimica: 9
}
let suma = 0;
for (const nota in notas){
    suma += notas[nota];
}
console.log(`La suma de las notas es: ${suma}`);

/* Separador */
console.log('--'.repeat(20));
/* Recorre el Set utilizando el método .forEach(). */
productosMap.forEach((dato, clave)=>{
    console.log(`Dato: ${dato} - Clave: ${clave}`);
})