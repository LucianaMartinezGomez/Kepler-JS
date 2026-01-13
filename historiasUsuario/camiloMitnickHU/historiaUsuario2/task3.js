const productos = [
    { nombre: 'Laptop', categoria: 'Electrónica' },
    { nombre: 'Silla', categoria: 'Hogar' }
];


const mapaProductos = new Map();

productos.forEach(item => {
    if (mapaProductos.has(item.categoria)) {
      
        mapaProductos.get(item.categoria).push(item.nombre);
    } else {
        
        mapaProductos.set(item.categoria, [item.nombre]);
    }
});

console.log(mapaProductos);