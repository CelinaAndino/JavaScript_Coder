// 1 pre-entrega Celina Andino
// La idea es una agenda de una semana, con el cual con un prot mepregunta el dia y me tira lo que deberia hacer y con el for lo repetiria 2 veces


for (let i = 0; i < 2; i++) {
    let diaActual = (prompt('¿Que dia es hoy?').toLowerCase());
    console.log("La agenda para el dia  " + diaActual + " es: " + actividadDelDia(diaActual));
}

function actividadDelDia(diaActual) {

    switch (diaActual) {
        case "lunes":
            return alert("Bañar al perro")
            break;

        case "martes":
            return ("Comprar comida al gato")
            break;

        case "miercoles":
            return ("Ir al peluquero")
            break;

        case "jueves":
            return ("Ir al medico 12:30 hs")
            break;

        case "viernes":
            return ("Comprar harina, huevos, aceite, y leche")
            break;

        case "sabado":
            return ("Tiempo libre de boludeo")

            break;
        case "domingo":
            return ("Juntada con los pibes")

            break

        default:
            alert("Ingresa un dia valido")
            break;
    }

}