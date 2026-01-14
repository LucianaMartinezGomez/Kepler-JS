const productos = {
  producto1: { id: 1, nombre: "Camisa", precio: 50000 },
  producto2: { id: 2, nombre: "Zapatos", precio: 90000 }
}

for (let p in productos) console.log("Producto:", productos[p])

const numeros = new Set([1, 2, 3, 4, 5, 6])
for (let n of numeros) console.log("Set:", n)

const categorias = new Map([
  ["Ropa", "Camisa"],
  ["Calzado", "Zapatos"],
  ["Accesorios", "Gorra"]
])

categorias.forEach((v, k) => console.log(`Categoría: ${k} - Producto: ${v}`))
