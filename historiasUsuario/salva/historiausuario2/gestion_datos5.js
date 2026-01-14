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

const numeros = new Set([1, 2, 3, 4, 5, 6]);

const categorias = new Map([
  ["Ropa", "Camisa"],
  ["Calzado", "Zapatos"],
  ["Accesorios", "Gorra"]
]);

for (let p in productos) {
  const prod = productos[p];

  if (prod.id && prod.nombre && typeof prod.precio === "number") {
    console.log("Producto válido:", prod);
  } else {
    console.log("Producto inválido:", prod);
  }
}

console.log("Productos únicos (Set):");
for (let n of numeros) console.log(n);

console.log("Categorías y productos (Map):");
categorias.forEach((v, k) => console.log(k, "=>", v));
