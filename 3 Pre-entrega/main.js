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


const baseDePreguntas = [
  {
    categoria: "Arte y literatura",
    pregunta: "¿Quién pintó la mona lisa?",
    respuesta: "Leonardo da Vinci",
    incorrecta1: "Picasso",
    incorrecta2: "Miguel Ángel",
    incorrecta3: "Monet",
    imagen: "https://i.ibb.co/9cjvmw1/mona-lisa.jpg",
    objectFit: "cover",
  },
  {
    categoria: "Arte y literatura",
    pregunta: 'Escritor de "El túnel"',
    respuesta: "Ernesto Sábato",
    incorrecta1: "Ernest Hemingway",
    incorrecta2: "Julio Verne",
    incorrecta3: "Gabriel García Márquez\r",
    imagen: "https://i.ibb.co/vdTD5sF/el-tunel.jpg",
  },
  {
    categoria: "Historia",
    pregunta:
      " ¿Qué Imperio se disolvió, después de 846 años, el 6 de agosto de 1806?",
    respuesta: "El Sacro Imperio Romano Germánico",
    incorrecta1: "El Imperio Bizantino ",
    incorrecta2: "El Imperio De Los Samuráis",
    incorrecta3: "El Imperio Dorado De Los Incas \r",
  },
  {
    categoria: "Historia",
    pregunta: " ¿Cuál era el nombre de pila de Lenin?",
    respuesta: "Vladímir",
    incorrecta1: "Aléksey",
    incorrecta2: "Iósif",
    incorrecta3: "Aleksandr\r",
  },
  {
    categoria: "Deportes",
    pregunta: "¿Quién inventó el arte marcial llamado Jeet Kune Do?",
    respuesta: "Bruce Lee",
    incorrecta1: "David Carradine",
    incorrecta2: "Kato Mimoko",
    incorrecta3: "Ninguna Es Correcta\r",
  },
  {
    categoria: "Deportes",
    pregunta: "¿A qué barrio porteño pertenece el club de fútbol San Lorenzo?",
    respuesta: "Boedo",
    incorrecta1: "La Boca",
    incorrecta2: "Liniers",
    incorrecta3: "Paternal\r",
  },
  {
    categoria: "Entretenimiento",
    pregunta:
      ' ¿Cómo se llamaba el personaje que interpretaba Al Pacino en "Scarface"?',
    respuesta: "Tony Montana",
    incorrecta1: "Michael Corleone",
    incorrecta2: "Sonny Montana",
    incorrecta3: "Frank Slade\r",
  },
  {
    categoria: "Entretenimiento",
    pregunta:
      " ¿Por cuál de estas películas ganó Clint Eastwood el premio Oscar al mejor director?",
    respuesta: "Los Puentes De Madison",
    incorrecta1: "Million Dollar Baby",
    incorrecta2: "Cartas Desde Iwo Jima",
    incorrecta3: "Mystic River\r",
  },
  {
    categoria: "Matemática",
    pregunta: "φ (Phi)",
    respuesta: "1,6180339887498948482…",
    incorrecta1: "1,4142135623730950488…",
    incorrecta2: "3.1415926535897932384...",
    incorrecta3: "2.2360679774997896964...\r",
  },
  {
    categoria: "Matemática",
    pregunta: "¿Cuál es la afirmacion verdadera?",
    respuesta: "Todo paralelogramo tiene cuatro vértices y cuatro lados ",
    incorrecta1: "os lados opuestos de un paralelogramo no son paralelos",
    incorrecta2:
      "La suma de los ángulos interiores de todo paralelogramo es siempre igual a 180°.",
    incorrecta3: "Todos los paralelogramos son concavos.\r",
  },
];

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


comenzarJuego();