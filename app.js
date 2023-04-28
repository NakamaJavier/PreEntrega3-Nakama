//Constantes a elementos del HTML


/////////Simulacion de obtencion de informacion a partir de un JSON:////////////////////////////////////////

//Creo una instancia de ProductHandler y guardo los objetos antes creados en él
let productosAJSON = new ProductHandler
productosAJSON.listaProductos = [prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod9, prod10, prod11, prod12, prod13, prod14, prod15, prod16, prod17, prod18, prod19, prod20]
//Creo un JSON a partir de esa informacion
const productosJson = JSON.stringify(productosAJSON.listaProductos)
//Simulo la recepcion de un JSON con el contenido de la base de datos del stock de la página
const productosParseados = JSON.parse(productosJson)

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

//Evento si toco el menu de talles
productos.listaProductos.forEach(producto => {
    const menu1 = document.getElementById(`menu1-${producto.id}`)
    menu1.addEventListener('change',function(){
        productos.cargarCantidad(producto,menu1)})
})

//Evento si toco un boton de añadir al carrito 
productos.listaProductos.forEach(producto => {
    const btnAP = document.getElementById(`producto-${producto.id}`)
    btnAP.addEventListener("click", function(){
        productos.addCompra(producto)
    })
})


//Evento si toco los botones para agregar cantidad desde el carrito + y -

//NOTA: se hizo asi porque al reehacer el DOM del modal del carrito, los elementos
//de los botones se volvian a crear y los eventos relacionados a estos quedaban obsoletos
//de esta manera el evento esta vinvulado al contenedor padre del modal, el cual prevalece
//a lo largo del uso de la pagina. Y se ajustaron las clases para que tome el evento en el
//boton y el icono que estaba como elemento dentro de él
contenedorCarrito.addEventListener("click", (event) => {
    if (event.target.matches(".btn-plus, .fa-plus")) {
        const id = event.target.getAttribute('data-id');
        const compra = productos.carritoCompra.find((c) => c.id == id)
        productos.plusCantidad(compra)
    }

    if (event.target.matches(".btn-sub, .fa-minus")) {
        const id = event.target.getAttribute('data-id')
        const compra = productos.carritoCompra.find((c) => c.id == id)
        productos.subCantidad(compra)
    }

    if (event.target.matches(".btn-trash .fa-trash")){
        const id = event.target.getAttribute('data-id')
        const compra = productos.carritoCompra.find((c) => c.id == id)
        productos.eliminarCompra(compra)
    }
})

// //Evento para los inputs de marcas
productos.marcasDiferentes.forEach(marca => {
    const fltMarca = document.getElementById(`marca-${marca.nombre}`)
    fltMarca.addEventListener("click", function(){
        productos.filtrarSegunTabla(marca)
    })
})

//Evento para los inputs de talles
productos.tallesDiferentes.forEach(talle => {
    const fltTalle = document.getElementById(`talle-${talle.nombre}`)
    fltTalle.addEventListener("click", function(){
        productos.filtrarSegunTabla(talle)
    })
})

//Evento para el PriceSlider
contedorPriceSlider.addEventListener("click", (event) =>{
    if (event.target.matches("")) {
        
    }

})

//Evento si toco el boton de vacia carrito
vaciarCarrito.addEventListener(`click`,function(){productos.vaciarCarrito()})

//////////Slider hecho con noUiSlider. Configuracion del mismo
// Inicializar el slider con los valores y opciones necesarias
const priceSlider = document.getElementById('price-slider');
noUiSlider.create(priceSlider, {
    start: [0, 100000],
    connect: true,
    range: {
        'min': 0,
        'max': 100000
    }
});

// Obtener los elementos de entrada de precio mínimo y máximo
const priceMinInput = document.getElementById('price-min');
const priceMaxInput = document.getElementById('price-max');

// Escuchar cambios en el slider y actualizar los campos de entrada
priceSlider.noUiSlider.on('update', function (values, handle) {
    if (handle === 0) {
        priceMinInput.value = parseInt(values[handle]);
    }
    if (handle === 1) {
        priceMaxInput.value = parseInt(values[handle]);
    }
});

// Escuchar cambios en los campos de entrada y actualizar el slider
priceMinInput.addEventListener('change', function () {
    priceSlider.noUiSlider.set([this.value, null]);
});
priceMaxInput.addEventListener('change', function () {
    priceSlider.noUiSlider.set([null, this.value]);
});