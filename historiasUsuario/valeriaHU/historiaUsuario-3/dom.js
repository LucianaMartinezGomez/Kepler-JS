const inputNota = document.getElementById('inputNota')
const listaNotas = document.getElementById('listaNotas')
const btnAgregar = document.getElementById('btnAgregar')

btnAgregar.addEventListener('click', (evento)=>{
    const elemento = evento.target

    if(!elemento)
        return

    const nuevaNota = inputNota.value        
    if(nuevaNota){
        const li = document.createElement('li')
        const btnEliminar = document.createElement('button')

        li.classList.add('item-nota')
        btnEliminar.classList.add('btn-eliminar')

        li.textContent = nuevaNota
        btnEliminar.textContent = 'Eliminar'
        li.appendChild(btnEliminar)
        listaNotas.appendChild(li)
        inputNota.value = ''

        console.log("Nota agregada 👌")

        btnEliminar.addEventListener('click', ()=>{
            listaNotas.removeChild(li)
            console.log("Nota Eliminada 👌")

        })
    }
})

let notas = JSON.parse(localStorage.getItem('notas') || [])

function guardarNotas(){
    localStorage.setItem("notas", JSON.stringify(notas))
    notas.push(nuevaNota)
    guardarNotas()
}