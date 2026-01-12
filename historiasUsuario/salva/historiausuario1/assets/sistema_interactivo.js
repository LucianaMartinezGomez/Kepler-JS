const nombre = prompt("Por favor, ingresa tu nombre:");


let edad = prompt("Por favor, ingresa tu edad:");


edad = Number(edad);

if (isNaN(edad)) {
    console.error("Error: Por favor, ingresa una edad válida en números.");
    alert("Error: Por favor, ingresa una edad válida en números.")
} else {

    if (edad < 18) {
        alert(
            "Hola " + nombre +
            ", eres menor de edad. ¡Sigue aprendiendo y disfrutando del código!"
        );
        console.log(
            "Hola " + nombre +
            ", eres menor de edad. ¡Sigue aprendiendo y disfrutando del código!"
        );
    } else {
        alert(
            "Hola " + nombre +
            ", eres mayor de edad. ¡Prepárate para grandes oportunidades en el mundo de la programación!"
        );
        console.log(
            "Hola " + nombre +
            ", eres mayor de edad. ¡Prepárate para grandes oportunidades en el mundo de la programación!"
        );
    }
}


