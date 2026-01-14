const app = document.getElementById('app')


function renderHome(){
    app.innertHTML = '<h1> Home </h1><p>Bienvenido a nuestro SPA </p>'
}

function renderServices(){
    app.innertHTML = '<h1> Servicios </h1> <p>Fronted con JS </p>'
}

function renderContact(){
    app.innertHTML = '<h1> Contacto </h1> <p>clan@hamilton </p>'
}

document.getElementById('home').addEventListener('click', renderHome)
document.getElementById('services').addEventListener('click', renderServices)
document.getElementById('contact').addEventListener('click', renderContact)

renderHome()