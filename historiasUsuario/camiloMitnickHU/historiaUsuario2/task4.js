const persona ={
    nombre:"juan",
    apellido:"mejia",
    edad:20
}

for (let x in persona){
    console.log(`${x} ${persona[x]}`)
}

console.log("-----------")

let frutas = new Set(["manzana", "plátano", "naranja"]);


for (let fruta of frutas) {
  console.log(fruta);
  
}

let nombres=["camilo","juan","valeria"]

nombres.forEach(function(nombre){
    console.log("hola,",nombre)
})