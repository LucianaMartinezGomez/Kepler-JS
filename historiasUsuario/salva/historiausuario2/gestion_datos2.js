const numeros = new Set([1, 2, 3, 3, 4, 4, 5]);
console.log("Set inicial:", numeros);

numeros.add(6);

console.log("Existe el número 3:", numeros.has(3));

numeros.delete(2);

for (let numero of numeros) {
  console.log("Número en el Set:", numero);
}
