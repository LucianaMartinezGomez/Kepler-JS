/* Ejemplo de funciones que retornan funciones */
function crearsaludo(saludo){
    /* Esta funcion obtiene un saludo */
    return function(name){
        console.log(`${saludo}, ${name}!
            `)
    }

}
/* Crear variables const para obtener el saludo */
const saludo1 = crearsaludo("Hola buenos dias")/* ("Carlos") */
const saludo2 = crearsaludo("Bienvenid@")/* ("Anabell") */
const saludo3 = crearsaludo("Feliz dia")/* ("Ana") */

/* Se usan las funciones */
saludo1("Luis")
saludo2("Pedro")
saludo3("Marta")

/* Se llama la misma funcion varias veces */
/* saludo1("Veronica")
saludo1("Vale")
saludo2("Stefany") */


