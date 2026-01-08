let name = prompt("Enter your name: ")
let age = Number(prompt("Enter your age: "))

let resultNavegador = document.querySelector(".resultadoJS")

if (isNaN(age)){
    let errorMes = "La edad no es valido!"
    console.error(errorMes)
    resultNavegador.innerHTML = errorMes
}else{
    console.log("La edad es correcta")

    let mensaje;
    if (age >= 18){
        mensaje = `Hola ${name}, eres mayor de edad`
    }else if(age < 18 && age > 0){
        mensaje = `Hola ${name}, eres menor de edad`
    }else{
        mensaje = `Hola ${name}, no tienes una edad válida`
    }

    console.log(mensaje)
    resultNavegador.innerHTML = mensaje
}