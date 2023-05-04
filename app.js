/////////Simulacion de obtencion de informacion a partir de un JSON:////////////////////////////////////////

//Creo una instancia de ProductHandler y guardo los objetos antes creados en él
let productosAJSON = new ProductHandler
productosAJSON.listaProductos = [prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod9, prod10, prod11, prod12, prod13, prod14, prod15, prod16, prod17, prod18, prod19, prod20]
//Creo un JSON a partir de esa informacion
const productosJson = JSON.stringify(productosAJSON.listaProductos)
//Simulo la recepcion de un JSON con el contenido de la base de datos del stock de la página

fetch('./productos_bd.json')
.then(response => log(response))
    
const productosParseados = JSON.parse(productosJson)
console.log(productosJson);
//Creo el objeto principal del programa que aloja todos los objetos del catalogo y carrito, ademas de los metodos que utilizan dichos atributos.
let productos = new ProductHandler
productos.listaProductos = productosParseados
productos.listaFiltrada = productos.listaProductos
productos.ordenarStock()
productos.crearOpcionesFiltro()
//////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////          DOM          /////////////////////////////////////////////////////////
productos.mostrarProductos()
productos.cargarCarritoDelLocal();
productos.mostrarCarrito()

////////////////////EVENTOS/////////////////////////////////////////////////////////////////////////////////

//Eventos para los botones dentro de cada card de producto en el inicio
contenedorProductos.addEventListener("click", (event) => {
    //Evento si toco el menu de talles
    if (event.target.matches(".menu1")){
        const id = event.target.getAttribute('data-id')
        const producto = productos.listaFiltrada.find((c)=> c.id ==id)
        productos.cargarCantidad(producto,event.target.value)
    }
    //Evento si toco un boton de añadir al carrito
    if (event.target.matches(`.btnAdd`)){
        const id = event.target.getAttribute('data-id')
        const producto = productos.listaFiltrada.find((c)=> c.id ==id)
        productos.addCompra(producto)
    }
})

//Evento si toco los botones dentro las card de productos del carrito

//NOTA: se hizo asi porque al reehacer el DOM del modal del carrito, los elementos
//de los botones se volvian a crear y los eventos relacionados a estos quedaban obsoletos
//de esta manera el evento esta vinvulado al contenedor padre del modal, el cual prevalece
//a lo largo del uso de la pagina. Y se ajustaron las clases para que tome el evento en el
//boton y el icono que estaba como elemento dentro de él
contenedorCarrito.addEventListener("click", (event) => {
    //Evento si toco el +
    if (event.target.matches(".btn-plus, .fa-plus")) {
        const id = event.target.getAttribute('data-id');
        const talle = event.target.getAttribute("data-talle")
        const compra = productos.carritoCompra.find((c) => c.id == id && c.talle == talle)
        productos.plusCantidad(compra)
    }
    //Evento si toco el -
    if (event.target.matches(".btn-sub, .fa-minus")) {
        const id = event.target.getAttribute("data-id")
        const talle = event.target.getAttribute("data-talle")
        const compra = productos.carritoCompra.find((c) => c.id == id && c.talle == talle)
        productos.subCantidad(compra)
    }
    //Evento si toco el boton del tacho de basura
    if (event.target.matches(".btn-trash .fa-trash")){
        const id = event.target.getAttribute("data-id")
        const talle = event.target.getAttribute("data-talle")
        const compra = productos.carritoCompra.find((c) => c.id == id && c.talle == talle)
        productos.eliminarCompra(compra)
    }
})

filterbar.addEventListener("click", (event) => {
    //Evento para los inputs de marcas
    if (event.target.matches(".marca-box")){
        const id = event.target.getAttribute("data-id")
        const marca = productos.marcasDiferentes.find((c)=> c.nombre == id)
        productos.generarTablaFiltrado(marca)
        productos.filtrarSegunTabla()
    }
    //Evento para los inputs de talles
    if (event.target.matches(".talle-box")){
        const id = event.target.getAttribute("data-id")
        const talle = productos.tallesDiferentes.find((c)=> c.nombre == id)
        productos.generarTablaFiltrado(talle)
        productos.filtrarSegunTabla()
    }
})

//Evento si toco el boton de vaciar carrito
vaciarCarrito.addEventListener(`click`,function(){productos.vaciarCarrito()})

//////////Slider hecho con noUiSlider. Configuracion del mismo
// Inicializar el slider con los valores y opciones necesarias
const priceSlider = document.getElementById('price-slider');
noUiSlider.create(priceSlider, {
    start: [0, 60000],
    connect: true,
    range: {
        'min': 0,
        'max': 60000
    }
});

// Escuchar cambios en el slider y actualizar los campos de entrada
priceSlider.noUiSlider.on('update', function (values, handle) {
    if (handle === 0) {
        priceMinInput.value = parseInt(values[handle]);
    }
    if (handle === 1) {
        priceMaxInput.value = parseInt(values[handle]);
    }
    productos.filtrarSegunTabla()
});

// Escuchar cambios en los campos de entrada y actualizar el slider
priceMinInput.addEventListener('change', function () {
    priceSlider.noUiSlider.set([this.value, null])
    productos.filtrarSegunTabla();
});
priceMaxInput.addEventListener('change', function () {
    priceSlider.noUiSlider.set([null, this.value])
    productos.filtrarSegunTabla();
});