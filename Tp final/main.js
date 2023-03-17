// 3 Pre- entrega de Celina Andino

//  Para este trabajo necesito implementar Json/DOM/eventos/LocalStorage con la libreria sweetalert  se podra hacer las alertas.

/* 
1) Realizare un juego de preguntas y respuestas la idea es que se guarden las respuestas aunque reinicie la pag 
y cuando se terminen las preguntas recien avise que se termino el juego y vuelva a empezar.
2) Para el css solo colocare un color de contraste y el tamaño del contein para que no cree problemas.
3) Unire todo con  el html y dare fin al juego con puntos. 
*/
let puntaje = localStorage.getItem("puntaje")
let preguntasCorrectas = localStorage.getItem("preguntasCorrectas");
let preguntasHechas = parseInt(localStorage.getItem("preguntasHechas"));
let suspender_botones = false;
let posiblesRespuestas = [];
let pregunta;
let nroPregunta = parseInt(localStorage.getItem("nroPregunta"));
let mostrar_pantalla_juego_términado = false;
let reiniciarBotones_puntos_al_reiniciarBotones_el_juego = true;


/* //RUTAS RELATIVAS: 
//Nos permite trabajar con un archivo JSON de forma local.

const listado = document.getElementById("listado");
const listadoProductos = "json/productos.json";

fetch(listadoProductos)
    .then(respuesta => respuesta.json())
    .then(datos => {
        datos.forEach( producto => {
            listado.innerHTML += `
            <h2>Nombre: ${producto.nombre} </h2>
            <p> Precio: ${producto.precio} </p>
            <p> ID: ${producto.id} </p>`
        })
    })
    .catch(error => console.log(error))
    .finally( () => console.log("Proceso finalizado")) */

let baseDePreguntas;
let peticion = fetch("./preguntas.json").then(response => response.json()).then(data => baseDePreguntas = data);





// fetch("/preguntas.json").then(reponse => reponse.json()).then(resp => {baseDePreguntas = resp})

// const baseDePreguntas = "preguntas.json";s
// console.log (baseDePreguntas);
let btnCorrespondiente = [
  select_id("btn1"),
  select_id("btn2"),
  select_id("btn3"),
  select_id("btn4"),
];


function listaDePosiblesRespuestas(pregunta) {
  posiblesRespuestas = [
    pregunta.respuesta,
    pregunta.incorrecta1,
    pregunta.incorrecta2,
    pregunta.incorrecta3,
  ];
  posiblesRespuestas.sort(() => Math.random() - 0.5);
  select_id("btn1").innerHTML = posiblesRespuestas[0];
  select_id("btn2").innerHTML = posiblesRespuestas[1];
  select_id("btn3").innerHTML = posiblesRespuestas[2];
  select_id("btn4").innerHTML = posiblesRespuestas[3];
}

function seleccionarOpcion(opcion) {
  if (suspender_botones) {
        return;
    }
  suspender_botones = true;
  preguntasHechas += 1;
  if (posiblesRespuestas[opcion] == pregunta.respuesta) {
    preguntasCorrectas++;
    btnCorrespondiente[opcion].style.background = "lightgreen";
  } else {
    btnCorrespondiente[opcion].style.background = "pink";
  }
  for (let respuesta = 0; respuesta < 4; respuesta++) {
    if (posiblesRespuestas[respuesta] == pregunta.respuesta) {
      btnCorrespondiente[respuesta].style.background = "lightgreen";
      break;
    }
  }

  setTimeout(() => {
    suspender_botones = false;
    reiniciarBotones();
    nroPregunta += 1;
    comenzarJuego();
  }, 1000);

}
function select_id(id) {
  return document.getElementById(id);
}

function style(id) {
  return select_id(id).style;
}



function escogerPregunta(n) {
  pregunta = baseDePreguntas[n];
  select_id("categoria").innerHTML = pregunta.categoria;
  select_id("pregunta").innerHTML = pregunta.pregunta;
  select_id("numero").innerHTML = n+1;
  let pc = preguntasCorrectas;
  if (preguntasHechas > 0) {
    select_id("puntaje").innerHTML = "Preguntas Correctas: " + pc + " / " + "Preguntas Realizadas: " + (preguntasHechas);
  } else {
    select_id("puntaje").innerHTML = "";
  }

  style("imagen").objectFit = pregunta.objectFit;
  listaDePosiblesRespuestas(pregunta);
  if (pregunta.imagen) {
    select_id("imagen").setAttribute("src", pregunta.imagen);
    style("imagen").height = "200px";
    style("imagen").width = "100%";
  } else {
    style("imagen").height = "0px";
    style("imagen").width = "0px";
    setTimeout(() => {
      select_id("imagen").setAttribute("src", "");
    }, 500);
  }

  guardarPartida();
  
}

let npreguntas = [];

function reiniciarBotones() {
  for (const btn of btnCorrespondiente) {
    btn.style.background = "white";
  }
}


function comenzarJuego() {
  if(nroPregunta < baseDePreguntas.length){   //nroPregunta < baseDePreguntas.length
    escogerPregunta(nroPregunta)
    npreguntas.push(preguntasHechas);
  }
  else{
      swal.fire({
        title: "Juego finalizado",
        text:
          "Puntuación: " + preguntasCorrectas + "/" + (preguntasHechas),
        icon: "success",
        confirmButtonText: "Reiniciar",
        willClose: () => {reiniciarJuego()}
      });
      npreguntas = [];
  }
}


function reiniciarJuego(){

  localStorage.setItem("puntaje", 0) 
  localStorage.setItem("preguntasCorrectas", 0)
  localStorage.setItem("preguntasHechas", 0)
  localStorage.setItem("nroPregunta", 0)
  location.reload();

}


function guardarPartida(){
  localStorage.setItem("nroPregunta", nroPregunta);
  localStorage.setItem("preguntasHechas", nroPregunta);
  localStorage.setItem("preguntasCorrectas", preguntasCorrectas);
  localStorage.setItem("puntaje", puntaje);
}


setTimeout (() => {comenzarJuego()}, 50);