/////////Simulacion de obtencion de informacion a partir de un JSON:////////////////////////////////////////

//Simulo la recepcion de un JSON con el contenido de la base de datos del stock de la página
let productos = new ProductHandler()
const listaProductos = JSON.parse(localStorage.getItem(`listaProductos`)) || []
if (listaProductos.length >0){
    console.log("Cargo por el json de localStorage");
    productos.listaProductos=listaProductos
    funcionamientoPagina()
}else{
    fetch('./json/productos_bd.json')
    .then(response => response.json())
        .then(productosParseados=> {
            console.log("Cargo por el json productos_bd");
        //Creo el objeto principal del programa que aloja todos los objetos del catalogo y carrito, ademas de los metodos que utilizan dichos atributos.
            productos.listaProductos = productosParseados
            funcionamientoPagina()
        })
}



function funcionamientoPagina(){
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
            console.log("se toco el menu talles");
            const id = event.target.getAttribute('data-id')
            const producto = productos.listaFiltrada.find((c)=> c.id ==id)
            productos.cargarCantidad(producto,event.target.value)
        }
        //Evento si toco un boton de añadir al carrito
        if (event.target.matches(`.btnAdd`)){
            console.log("se toco el boton del carrito"); 
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
            console.log("se toco el boton +"); 
            const id = event.target.getAttribute('data-id');
            const talle = event.target.getAttribute("data-talle")
            const compra = productos.carritoCompra.find((c) => c.id == id && c.talle == talle)
            productos.plusCantidad(compra)
        }
        //Evento si toco el -
        if (event.target.matches(".btn-sub, .fa-minus")) {
            console.log("se toco el boton -");
            const id = event.target.getAttribute("data-id")
            const talle = event.target.getAttribute("data-talle")
            const compra = productos.carritoCompra.find((c) => c.id == id && c.talle == talle)
            productos.subCantidad(compra)
        }
        //Evento si toco el boton del tacho de basura
        if (event.target.matches(".btn-trash .fa-trash")){
            console.log("se toco el boton del tacho de basura");
            const id = event.target.getAttribute("data-id")
            const talle = event.target.getAttribute("data-talle")
            const compra = productos.carritoCompra.find((c) => c.id == id && c.talle == talle)
            productos.eliminarCompra(compra)
        }
    })

    filterbar.addEventListener("click", (event) => {
        //Evento para los inputs de marcas
        if (event.target.matches(".marca-box")){
            console.log("Se toco un boton de filtro de marca");
            const id = event.target.getAttribute("data-id")
            const marca = productos.marcasDiferentes.find((c)=> c.nombre == id)
            productos.generarTablaFiltrado(marca)
            productos.filtrarSegunTabla()
        }
        //Evento para los inputs de talles
        if (event.target.matches(".talle-box")){
            console.log("se toco boton de filtro de talle");
            const id = event.target.getAttribute("data-id")
            const talle = productos.tallesDiferentes.find((c)=> c.nombre == id)
            productos.generarTablaFiltrado(talle)
            productos.filtrarSegunTabla()
        }
    })

    //Evento si toco el boton de "Vaciar Carrito"
    vaciarCarrito.addEventListener(`click`,function(){
        console.log("se toco boton de vaciar carrito");
        Swal.fire({
            title: 'Seguro que desea vaciar el Carrito?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, vaciar carrito'
        }).then((result) => {
            if (result.isConfirmed) {
                productos.vaciarCarrito()
                Swal.fire(
                'Vaciado!',
                'El carrito se ha vaciado',
                'success'
                )
            }
        })
    })
    //Evento si toco el boton de "Reiniciar Servidor"
    reiniciarServidor.addEventListener(`click`,function(){
        console.log("se toco boton de reiniciar servidor");
        productos.reiniciarServidor()})
    //Evento si toco el boton de "Finalizar Compra"
    finalizarCompra.addEventListener(`click`,function(){
            console.log("se toco boton de finalizar compra");
            Swal.fire({
                title: 'Desea finalizar su compra?',
                text: "Si confirma será redireccionado a página de pago (NO INCLUIDO EN EL TP)",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar compra'
            }).then((result) => {
                if (result.isConfirmed) {
                    productos.finalizarCompra()
                    Swal.fire(
                    'Aqui sería redireccionado',
                    '(Se eliminaron del stock los items comprados)',
                    'success'
                    )
                }
            })
        })

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
        console.log("Se actualizo el slider de filtro precio");
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
        console.log("Se cambio input min de filtro precio");
        priceSlider.noUiSlider.set([this.value, null])
        productos.filtrarSegunTabla();
    });
    priceMaxInput.addEventListener('change', function () {
        console.log("Se cambio input max de filtro precio");
        priceSlider.noUiSlider.set([null, this.value])
        productos.filtrarSegunTabla();
    })
}