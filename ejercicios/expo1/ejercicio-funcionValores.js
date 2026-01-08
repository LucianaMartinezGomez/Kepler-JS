// 1. La función guardada como un valor
const sumar = (a, b) => a + b;

// 2. La función que recibe el valor (la lógica)
function calculadora(operacion) {
    let resultado = operacion(15, 10); 
    return resultado + 10;
}

// 3. Pasamos la función como si fuera un dato cualquiera
console.log( calculadora(sumar) ); // Resultado: 25