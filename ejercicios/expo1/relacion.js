
const notas = [1, 2, 3, 4, 5];

// MAP
const resultadoMap = notas.map(n => n * 2);
console.log('MAP → transforma:', resultadoMap);

// FILTER
const resultadoFilter = notas.filter(n => n >= 3);
console.log('FILTER → selecciona:', resultadoFilter);

// SUBSCRIBE
console.log('SUBSCRIBE → esperando clic...');
document.addEventListener('click', () => {
console.log('SUBSCRIBE → clic detectado');
});
