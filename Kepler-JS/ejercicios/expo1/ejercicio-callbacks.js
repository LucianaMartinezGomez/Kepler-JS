const baseDatos1 = ['Canada', 'EUA', 'Mexico', 'Ecuador', 'Brazil', 'Argentina', 'Uruguay'];
const baseDatos2 = ['Japon', 'Iran', 'Corea del Sur', 'Alemania', 'Croacia', 'España', 'Inglaterra'];

// 1. Función de Orden Superior: Ahora es más genérica
function buscarPais(pais, db, callback) {
    const existe = db.includes(pais);
    // Ejecutamos el callback pasando el resultado y el nombre del país
    callback(existe, pais);
}

// 2. Funciones de respuesta (más limpias)
function finalizarBusqueda(encontrado) {
    if (encontrado) {
        console.log("¡País encontrado!");
    } else {
        console.log("Ese País no está registrado en nuestra base de datos");
    }
}

// 3. Ejecución del flujo
buscarPais("Canada", baseDatos1, (encontradoEn1, nombre) => {
    if (encontradoEn1) {
        // Si está en la primera, esperamos y finalizamos
        setTimeout(() => finalizarBusqueda(true), 2000);
    } else {
        // Si no está, buscamos en la segunda base de datos
        console.log(`${nombre} no está en BD1, buscando en BD2...`);
        setTimeout(() => {
            buscarPais(nombre, baseDatos2, (encontradoEn2) => {
                finalizarBusqueda(encontradoEn2);
            });
        }, 3000);
    }
});




// 1. Unimos todo usando el operador Spread (Ciudadanos de primera clase en acción)
//const todasLasBD = [...baseDatos1, ...baseDatos2];

// 2. Función de Orden Superior para buscar con filtros personalizados
//const filtrarPaises = (lista, criterioBusqueda) => {
    // .filter es una HOF que recibe una función de prueba (callback)
   // return lista.filter(pais => pais.toLowerCase().includes(criterioBusqueda.toLowerCase()));
//};

// 3. Transformación con .map() 
// Imagina que queremos normalizar todos los nombres a Mayúsculas antes de mostrar
//const normalizarYMostrar = (lista) => {
    //return lista.map(pais => ` País registrado: ${pais.toUpperCase()}`);
//};

// --- EJECUCIÓN ---
//const busqueda = "an"; // Queremos países que contengan "an" (Canada, Argentina, Iran, Alemania, Inglaterra)

//const resultados = filtrarPaises(todasLasBD, busqueda);
//const listaFinal = normalizarYMostrar(resultados);

//console.log(`Resultados para "${busqueda}":`);
//listaFinal.forEach(p => console.log(p));




