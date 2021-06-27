//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

loadEvents();

function loadEvents(){
    listaCursos.addEventListener('click', addToChart);
}

//====== Functions ======
function addToChart(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const selectedClass = e.target.parentElement.parentElement;
        readData(selectedClass);
    }
}

//Reading data from HTML Document:
function readData(selectedClass){
// console.log(selectedClass);

const curso = {
    imagen: selectedClass.querySelector('img').src,
    titulo: selectedClass.querySelector('h4').textContent,
    precio: selectedClass.querySelector('.precio span').textContent,
    id: selectedClass.querySelector('a').getAttribute('data-id'),
    cantidad: 1
}
console.log(curso);
}