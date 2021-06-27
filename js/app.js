//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

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

const curso = {
    imagen: selectedClass.querySelector('img').src,
    titulo: selectedClass.querySelector('h4').textContent,
    precio: selectedClass.querySelector('.precio span').textContent,
    id: selectedClass.querySelector('a').getAttribute('data-id'),
    cantidad: 1
}

//Chequeamos si el curso ya se encontraba en el carrito:
const existe = articulosCarrito.some(articulo => articulo.id === curso.id);
if(existe){ 
    //Actualizamos cantidad
    const cursosActualizados = articulosCarrito.map( articulo => {
        if(articulo.id === curso.id){
            articulo.cantidad++;
            return articulo; //Retorna el objeto actualizado
        }else{
            return articulo; //Retorna los objetos que no sean duplicados
        }
    })
    articulosCarrito = [...cursosActualizados];
}else{
    //Agregamos el curso en el arreglo del carrito:
    articulosCarrito = [...articulosCarrito, curso]
}

carritoHTML();
}

//Tomamos el array y los mostramos en el HTML
function carritoHTML(){
    //Primero vaciamos el carrito
limpiarCarrito();
    //Luego lo llenamos con los elementos del array
articulosCarrito.forEach(producto => {
    const {imagen, titulo, precio, cantidad, id} = producto;
    const row = document.createElement('tr');
    row.innerHTML = `<td><img src="${imagen}" width="100"></td>
    <td>${titulo}</td>
    <td>${precio}</td>
    <td>${cantidad}</td>
    <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>`;
    contenedorCarrito.appendChild(row);
});
} 

function limpiarCarrito(){
    while(contenedorCarrito.firstChild){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
}
}
