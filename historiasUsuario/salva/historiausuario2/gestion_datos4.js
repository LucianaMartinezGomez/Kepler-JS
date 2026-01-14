const productos = {
  producto1: {
    id: 1,
    nombre: "Camisa",
    precio: 50000
  },
  producto2: {
    id: 2,
    nombre: "Zapatos",
    precio: 90000
  }
};

const numeros = new Set([1, 2, 3, 3, 4, 4, 5]);

numeros.add(6);
numeros.delete(2);

const categorias = new Map();

categorias.set("Ropa", "Camisa");
categorias.set("Calzado", "Zapatos");
categorias.set("Accesorios", "Gorra");

for (let clave in productos) {
  console.log("Producto:", productos[clave]);
}

for (let numero of numeros) {
  console.log("Set:", numero);
}

categorias.forEach((valor, clave) => {
  console.log(`Categoría: ${clave} - Producto: ${valor}`);
});
