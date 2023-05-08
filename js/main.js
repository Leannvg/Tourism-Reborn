"use strict";

let doc = document;
let id = 'getElementById';
let create = 'createElement';
let set = 'setAttribute';
let get = 'getAttribute';
let app = 'appendChild';
let query = 'querySelector';
let queryAll = 'querySelectorAll';
let tagName = 'getElementsByTagName';
let className = 'getElementsByClassName';

fetch('api/excursiones.json')
.then(res => res.json())
.then(excursiones => {

  let contenedor = doc[id]('excursiones');

  excursiones.forEach(excursion => {

    let col = doc[create]('div');
    setear(col, 'class', 'col-md-6 col-xl-4 my-3 ');
    let card = doc[create]('div');
    setear(card, 'class', 'card');
    let divImg = doc[create]('div');
    let img = doc[create]('img');
    setear(img, 'class', 'card-img-top');
    setear(img, 'src', excursion.imagen);
    divImg[app](img);


    let cardBody = doc[create]('div');
    setear(cardBody, 'class', 'card-body');

    let tituloDiv = doc[create]('div');
    setear(tituloDiv, 'class', 'pt-3');

    /* titulo */
    let titulo = doc[create]('h3');
    setear(titulo, 'class','titulo');
    titulo.innerHTML = excursion.titulo;
    tituloDiv[app](titulo);
    /* titulo */

    /* ubicacion */
    let ubicacion = doc[create]('p');
    setear(ubicacion, 'class','ubicacion');
    let ubicacionIcon = doc[create]('i');
    setear(ubicacionIcon, 'class','fa-solid fa-location-dot');
    ubicacion[app](ubicacionIcon);
    ubicacion.innerHTML += excursion.ubicacion;

    tituloDiv[app](ubicacion);
    /* ubicacion */

    /* puntaje y precio */
    let divPrecio = doc[create]('div');
    setear(divPrecio, 'class', 'puntaje-precio');
    let puntaje = doc[create]('ul');
    

    /* creo cantidad de estrellas segun puntaje */
    for (let index = 0; index < excursion.puntuacion; index++) {
      let puntajeLi = doc[create]('li');
      let puntos = doc[create]('i');
      setear(puntos, 'class', 'fa-solid fa-star')
      puntajeLi[app](puntos);
      puntaje[app](puntajeLi);
    }

    let precio = doc[create]('p');
    precio.innerHTML = 'U$D ' + excursion.precio;
    
    divPrecio[app](puntaje);
    divPrecio[app](precio);

    tituloDiv[app](divPrecio);
    /* puntaje y precio */

    /* descripcion */
    let descripcion = doc[create]('p');
    setear(descripcion, 'class', 'descripcion mt-3 limitado');

    /* descripcion corta */
    descripcion.innerHTML = (excursion.descripcion).substring(0, 140) + '...';

    tituloDiv[app](descripcion);
    /* descripcion */

    /* ver detalles */
    let verDiv = doc[create]('div');
    setear(verDiv, 'class', 'w-100 pb-4 d-flex justify-content-center');
    let verDivBoton = doc[create]('a');
    setear(verDivBoton, 'class', 'btn btnModal');
    setear(verDivBoton, 'data-id', excursion.id);
    verDivBoton.innerHTML = 'Ver más';

    /* agregar detalles a modal */
    verDivBoton.addEventListener('click', function(){
      let dataModal = doc[id]('dataModal');
      let clonacion = col.cloneNode(true)

      dataModal[app](clonacion);
      
      /* descripcion completa */
      let descripcion = doc[query]('#dataModal .descripcion');
      descripcion.innerHTML = excursion.descripcion;

    })
    /* agregar detalles a modal */

    verDiv[app](verDivBoton);
    /* ver detalles */

    cardBody[app](tituloDiv);

    /* card */
    card[app](divImg);
    card[app](cardBody);
    card[app](verDiv);

    /* col */
    col[app](card);
    contenedor[app](col);

    /* modal */
    let modal = doc[id]("myModal");
    let body = doc[tagName]("body")[0];
    let btnModal = doc[queryAll]('.btnModal');
    btnModal.forEach(btn => {
      btn.onclick = function() {
        modal.style.display = "flex";
        body.style.position = "static";
        body.style.height = "100%";
        body.style.overflow = "hidden";
      }
    });

  })  
})
.catch(error => console.error(error));


/* agregar atributos a elemento */
function setear(elemento, atributo, personalizado){
  elemento[set](atributo, personalizado)
  return elemento;
}


/* navbar scroll*/
let logo = doc[query](".navbar-brand");
let navbar = doc[id]("nav");
let btnToggle = doc[query](".navbar-toggler");

window.addEventListener("load", function () {
  setear(btnToggle, "aria-expanded", "false")
});

window.onscroll = navbarStatus;
btnToggle.addEventListener("click", function () {
  buttonChange();
  navbarStatus();
});

function buttonChange() {
  if (btnToggle.className == "navbar-toggler") {
    setear(btnToggle, "aria-expanded", "true")
  } else if (btnToggle.className == "navbar-toggler collapsed") {
    setear(btnToggle, "aria-expanded", "false")
  }
}

function navbarStatus() {
  let scroll = document.documentElement.scrollTop || document.body.scrollTop;

  if (scroll !== 0 || btnToggle.ariaExpanded === "true") {
    setear(navbar, "class", "navbar navbar-expand-lg fixed-top");
    navbar.style.cssText = "background-color: #3D3D3D !important; transition: 1s ease all !important;";
  } else {
    navbar.style.backgroundColor = "transparent";
    setear(navbar, "class", "navbar navbar-expand-lg")
  }
}

const links = doc[queryAll](".nav-item");
const navbarCollapse = doc[query](".navbar-collapse");
const closeNav = new bootstrap.Collapse(navbarCollapse, {
  toggle: false,
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    if (navbarCollapse.classList.contains("show")) {
      closeNav.toggle();
    }
  });
});
/* navbar */


/* modal */
let dataModal = doc[id]('dataModal');
let modal = doc[id]("myModal");
let body = doc[tagName]("body")[0];
let span = doc[className]("close")[0];

span.onclick = function() {
  closeModal()
}
window.onclick = function(event) {
  if (event.target == modal) {
    closeModal()
  }
}

/* ocultar y eliminar datos modal*/
function closeModal(){

  modal.style.display = "none";
  body.style.position = "inherit";
  body.style.height = "auto";
  body.style.overflow = "visible";

  while (dataModal.firstChild) {
    dataModal.removeChild(dataModal.firstChild);
  }
}