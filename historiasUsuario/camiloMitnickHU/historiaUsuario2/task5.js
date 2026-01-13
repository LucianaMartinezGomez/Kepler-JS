
const entradaProductos = [
    { id: 1, nombre: "Laptop", precio: 1200, categoria: "Computación" },
    { id: 2, nombre: "Monitor", precio: 300, categoria: "Periféricos" },
    { id: 1, nombre: "Laptop", precio: 1200, categoria: "Computación" }, // Duplicado
    { id: 3, nombre: "Mouse", precio: -50, categoria: "Periféricos" },   // Inválido (precio)
    { id: 4, nombre: "", precio: 100, categoria: "Otros" },             // Inválido (nombre)
    { id: 5, nombre: "Teclado", precio: 80, categoria: "Periféricos" }
];

//Lógica de Validacion
const esProductoValido = (p) => {
    return (
        p.id && typeof p.id === 'number' &&
        p.nombre && p.nombre.trim() !== "" &&
        p.precio && typeof p.precio === 'number' && p.precio > 0
    );
};



// A. Lista completa de productos 
const listaValidados = entradaProductos.filter(esProductoValido);

// B. Lista de productos únicos (Set)

const setUnicos = new Set(listaValidados.map(p => JSON.stringify(p)));
const productosUnicos = Array.from(setUnicos).map(p => JSON.parse(p));

// C. Categorías y nombres de productos (Map)
const categoriasMap = new Map();
productosUnicos.forEach(p => {
    if (!categoriasMap.has(p.categoria)) {
        categoriasMap.set(p.categoria, []);
    }
    categoriasMap.get(p.categoria).push(p.nombre);
});



console.log("1. PRODUCTOS VALIDADOS (Objeto):");
console.log(listaValidados);

console.log("\n2. PRODUCTOS ÚNICOS (Set - Sin duplicados):");
console.log(productosUnicos);

console.log("\n3. MAPA DE CATEGORÍAS (Categoría => Nombres):");
categoriasMap.forEach((nombres, cat) => {
    console.log(`${cat}: ${nombres.join(", ")}`);
});