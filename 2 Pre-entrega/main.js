// 2 Pre-entrega de Celina Andino
// La idea de este trabajo es realizar una competencia ficticia con nadadoras olimpicas de los ultimos años 

class Nadador {
    constructor (nombre,apellido,estilo,tiempo){
        this.nombre= nombre;
        this.apellido = apellido;
        this.estilo = estilo;
        this.tiempo = tiempo;
    }
}

let nadadores = [];
let cantidadDeNadadores = prompt("Ingrese la cantidad de Nadadores que desea crear: ");
function ingresarNadador() {

    
    for(let i=0; i< cantidadDeNadadores; i++){
        let nombre = prompt("Ingrese el Nombre del Nadador:");
        let apellido = prompt("Ingrese el Apellido del Nadador:");
        let estilo = prompt("Ingrese el Estilo del Nadador: ");
        let tiempo = parseFloat(prompt("Ingrese el Tiempo del Nadador, con punto en vez de coma: ")); // Utilizo "parseFloat" porque como quiero usar tiempos con decimales, con el "parseInt" no me funciona dado que solo toma la parte entera, y yo quiero todo el tiempo completo.
        let nadador = new Nadador(nombre, apellido, estilo, tiempo); 
        nadadores.push(nadador);
    }
    
    return nadadores;
}

console.log(ingresarNadador());


let tiempos = [];

tiempoDeLosNadadores();

function tiempoDeLosNadadores(){
    nadadores.forEach(nadador => {
        tiempos.push(nadador.tiempo);
    })
    
    return tiempos;
}


let winn = Math.min.apply(null,tiempos);


function obtenerGanador(){
    
    let nadadorGanador = null;
    nadadores.forEach(nadador => {
        
        if (nadador.tiempo == winn){
            nadadorGanador = nadador
        }
    })
    
    return (nadadorGanador);
}

console.log(obtenerGanador());


