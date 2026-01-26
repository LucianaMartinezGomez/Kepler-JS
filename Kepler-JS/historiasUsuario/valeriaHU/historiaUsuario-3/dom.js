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

        li.textContent = nuevaNota
        btnEliminar.textContent = 'Eliminar'
        li.appendChild(btnEliminar)
        listaNotas.appendChild(li)
        inputNota.value = ''

        btnEliminar.addEventListener('click', ()=>{
            listaNotas.removeChild(li)
        })
    }
})
