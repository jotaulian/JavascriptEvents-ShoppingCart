//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

loadEvents();

function loadEvents(){
    //Agregar curso seleccionado al carrito
    listaCursos.addEventListener('click', addToChart);

    //Eliminar curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Muestra los cursos desde el localStorage:
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse( localStorage.getItem('carrito') ) || [];
        carritoHTML();
    })

    //Vaciar el carrito
    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [] //Vaciamos el arreglo
        limpiarCarrito();     //Limpiamos el Doc HTML
    })
}

//====== Functions ======
function addToChart(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        readData(cursoSeleccionado);
    }
}

//Eliminar curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoID = e.target.getAttribute('data-id');

        //Eliminar el curso del arreglo 'articulosCarrito' mediante el data-id:
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoID);
        carritoHTML();
    }
}


//Reading data from HTML Document:
function readData(cursoSeleccionado){

const curso = {
    imagen: cursoSeleccionado.querySelector('img').src,
    titulo: cursoSeleccionado.querySelector('h4').textContent,
    precio: cursoSeleccionado.querySelector('.precio span').textContent,
    id: cursoSeleccionado.querySelector('a').getAttribute('data-id'),
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

    //Agregar el carrito de compras al storage:
    sincronizarStorage();
} 

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

function limpiarCarrito(){
    while(contenedorCarrito.firstChild){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
}
}
