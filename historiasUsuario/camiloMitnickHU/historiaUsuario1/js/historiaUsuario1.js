

// Solicitar el nombre del usuario usando prompt()
const nombre = prompt("Por favor, ingresa tu nombre:");

// Solicitar la edad del usuario usando prompt()
const edadInput = prompt("Por favor, ingresa tu edad:");


// Convertir la edad a número
const edad = Number(edadInput);

// Comprobar si el valor ingresado es un número válido
// isNaN() retorna true si NO es un número
// También verificamos que no sea una cadena vacía o null (usuario canceló)
if (isNaN(edad) || edadInput === '' || edadInput === null) {
    // Mostrar mensaje de error en consola
    console.error("Error: Por favor, ingresa una edad válida en números.");

    // Mostrar mensaje de error también en un alert()
    alert("Error: Por favor, ingresa una edad válida en números.");

} else {

    // Variable para almacenar el mensaje personalizado
    let mensaje;

    // Verificar si el usuario es menor de edad (edad < 18)
    if (edad < 18) {
        mensaje = `Hola ${nombre}, eres menor de edad. ¡Sigue aprendiendo y disfrutando del código!`;
    } else {
        // El usuario es mayor de edad (edad >= 18)
        mensaje = `Hola ${nombre}, eres mayor de edad. ¡Prepárate para grandes oportunidades en el mundo de la programación!`;
    }

    // Mostrar el mensaje en consola
    console.log(mensaje);

    // Mostrar el mensaje en un alert()
    alert(mensaje);
}
