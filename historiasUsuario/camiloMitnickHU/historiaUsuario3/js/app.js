
const inputNota = document.getElementById("inputNota");
const btnAgregar = document.querySelector("#btnAgregar");
const listaNotas = document.getElementById("listaNotas");


console.log("Input:", inputNota);
console.log("Botón:", btnAgregar);
console.log("UL:", listaNotas);


let notas = [];


const guardarNotas = () => {
    localStorage.setItem("notas", JSON.stringify(notas));
    console.log("Notas guardadas:", notas);
};


const crearNota = (texto) => {
    const li = document.createElement("li");
    li.textContent = texto + " ";

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";

    btnEliminar.addEventListener("click", () => {
        listaNotas.removeChild(li);
        notas = notas.filter(nota => nota !== texto);
        guardarNotas();
        console.log("Nota eliminada:", texto);
    });

    li.appendChild(btnEliminar);
    listaNotas.appendChild(li);
};


btnAgregar.addEventListener("click", () => {
    const textoNota = inputNota.value.trim();

    if (textoNota === "") {
        alert("La nota no puede estar vacía");
        return;
    }

    notas.push(textoNota);
    crearNota(textoNota);
    guardarNotas();

    inputNota.value = "";
    inputNota.focus();

    console.log("Nota agregada:", textoNota);
});



window.addEventListener("DOMContentLoaded", () => {
    const notasGuardadas = localStorage.getItem("notas");

    if (notasGuardadas) {
        notas = JSON.parse(notasGuardadas);
        notas.forEach(nota => crearNota(nota));
        console.log(`Se cargaron ${notas.length} notas desde LocalStorage`);
    }
});
