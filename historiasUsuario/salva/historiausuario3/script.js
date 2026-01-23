const input = document.getElementById("inp-nota");
const boton = document.getElementById("btn");
const lista = document.getElementById("listaNotas");


let notas = [];

if (localStorage.getItem("notas")) {
    notas = JSON.parse(localStorage.getItem("notas"));
    console.log(`Se cargaron ${notas.length} notas`);

    notas.forEach(nota => {
        crearNotaEnDOM(nota);
    });
}


boton.addEventListener("click", () => {
    const textoNota = input.value.trim();

    if (textoNota === "") {
        alert("Escribe una nota primero");
        return;
    }

    notas.push(textoNota);
    localStorage.setItem("notas", JSON.stringify(notas));

    crearNotaEnDOM(textoNota);
    input.value = "";
});


function crearNotaEnDOM(textoNota) {
    const li = document.createElement("li");
    li.textContent = textoNota;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";

    btnEliminar.addEventListener("click", () => {
        lista.removeChild(li);


        notas = notas.filter(nota => nota !== textoNota);

        localStorage.setItem("notas", JSON.stringify(notas));
        console.log("Nota eliminada:", textoNota);
    });

    li.appendChild(btnEliminar);
    lista.appendChild(li);
}
