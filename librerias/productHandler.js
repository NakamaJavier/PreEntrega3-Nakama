//////////////////DEFINICIONES DE CLASES//////////////////////////////////////////////////////////

//Clase para instanciar los objetos para Producto.stock
class TalleCantidad {
    constructor(talle, cantidad) {
        this.talle = talle
        this.cantidad = cantidad
    }
}
//Clase para instanciar los objetos para ProductHandler.listProducto
class Producto {
    constructor(id, nombre, marca, img, stock, precio) {
        this.id = id
        this.nombre = nombre
        this.img = img
        this.marca = marca
        this.stock = []
        for (let i = 0; i < stock.length; i++) {
            const talleCantidad = new TalleCantidad(stock[i].talle, stock[i].cantidad);
            this.stock.push(talleCantidad)
        }
        this.precio = precio;
    }
}
//Clase para instanciar los objetos para ProductHandler.carritoCompra
class Compra {
    constructor(id, nombre, img, talle, cantidad, precio) {
        this.id = id
        this.nombre = nombre
        this.img = img
        this.talle = talle
        this.cantidad = cantidad
        this.precio = precio
    }
}

/////Clase con lo que se manejara el stock y el carrito. Ademas de poseer los metodos que modifican los mismos
class ProductHandler {
    constructor() {
        this.listaProductos = []
        this.listaFiltrada = []
        this.carritoCompra = []
        this.precioTotal = 0
    }
    /**
     * carga el carrito de compra alojado en el localStorage
     */
    cargarCarritoDelLocal(){
        console.log("cargarCarritoDelLocal(");
        this.carritoCompra = JSON.parse(localStorage.getItem(`carrito`)) || []
        console.log(")")
    }
    /**
     * Ordena de menor a mayor los stocks de cada producto segun su talle
     */
    ordenarPorTalles() {
        console.log("ordenarPorTalles(");
        for (const producto of this.listaProductos) {
            producto.stock.sort((talleA, talleB) => talleA.talle - talleB.talle);
        }
        console.log(")")
    }
    /**
     * Elimina los stocks de los productos que no tienen talle y si el producto no tiene ningun talle en stock lo elimina
     */
    eliminarTalleSinStock() {
        console.log("eliminarTalleSinStock(");
        for (const producto of this.listaProductos) {
            producto.stock = producto.stock.filter(talle => talle.cantidad !== 0)
        }
        this.listaProductos = this.listaProductos.filter(producto => producto.stock.length !== 0)
        console.log(")")
    }
    /**
     * Ordena la lista de productos por ID, luego los talles de menor a mayor y ademas retira los talles con stock 0
     */
    ordenarStock() {
        console.log("ordenarStock(");
        this.listaProductos.sort((idA, idB) => idA.id - idB.id)
        this.ordenarPorTalles()
        this.eliminarTalleSinStock()
        console.log(")");
    }
    /**
     * Crea las tarjetas de los productos dentro de listaFiltrada (si no se filtra nada es igual a listaProductos) y los muestra en el DOM
     */
    mostrarProductos(){
        console.log("mostrarProductos(");
        for (let producto of this.listaFiltrada) {
            let opciones1
            //Creo las opciones del menu1 (talles)
            for(let stock of producto.stock){
                opciones1 +=`<option value="${stock.talle}">${stock.talle}</option>
                `
            }
            contenedorProductos.innerHTML += `
            <div class="card cardHover" style="width: 20rem;">
                <img src=${producto.img} class="card-img-top" alt="...">
                <div class="card-body">
                    <h4 class="card-title"><strong>${producto.nombre}</strong></h4>
                    <p class="card-text ml8px"><strong>Marca:</strong> ${producto.marca} <br> <strong>Precio:</strong> $${producto.precio}</p>
                    <div class="text-center">
                        <a href="#" id="producto-${producto.id}" class="btn btn-primary">Añadir <i class="fa-solid fa-cart-plus"></i> </a>
                        <div class="menues">
                            <select class="menu1" id="menu1-${producto.id}">
                                <option value="0">Talle</option>
                                ${opciones1}
                            </select>
                            <select class="menu2" id="menu2-${producto.id}" disabled>
                                <option value="0">Cantidad</option>
                            </select>
                            <label id="cantidadMax-${producto.id}" for="menu2-${producto.id}">
                            </label>
                        </div>
                    </div>
                </div>
            </div>`
        }
        console.log(")")
    }
    /**
    * Carga las tarjetas en el DOM correpondiente a los productos dentro de carritoCompra, como el icono del boton de carrito y su indicador de cantidad de productos
    */
    mostrarCarrito(){
        console.log("mostrarCarrito(");
        this.calcularPrecioTotal()
        contenedorCarrito.innerHTML=""
        //Creo una tarjeta por cada elemento almacenado en carritoCompra
        for (let producto of this.carritoCompra) {
            contenedorCarrito.innerHTML += `
            <div class="cardCarrito mb-3" style="max-width: 540px">
                <div class="row g-0">
                    <div class="col-md-7">
                        <img src=${producto.img} class="card-img-top" alt="...">
                    </div>
                    <div class="col-md-5">
                        <div class="card-body d-flex flex-column justify-content-start cardPad">
                            <div class="d-flex justify-content-between align-items-start">
                                <h4 class="card-title "><strong>${producto.nombre}</strong></h4>
                                <button type="button" class="btn btn-trash" data-id="${producto.id}">
                                    <i class="fa-solid fa-trash" data-id="${producto.id}"></i>
                                </button>
                            </div>
                            <p class="card-text ml8px"><strong>Talle:</strong> ${producto.talle}</p>
                            <div class="d-flex justify-content-center align-items-center">
                                <p><strong>Cantidad:</strong></p>
                                <div class="center">
                                    <div class="input-group">
                                        <span class="input-group-btn">
                                            <button type="button" class="btn btn-sub btn-danger btn-number" data-type="minus" " data-id="${producto.id}">
                                                <i class="fa-solid fa-minus fa-2xs" data-id="${producto.id}"></i>
                                            </button>
                                        </span>
                                        <input type="text" name="quant[2]" class="form-control input-number" value="${producto.cantidad}" min="1" max="100">
                                        <span class="input-group-btn">
                                            <button type="button" class="btn btn-plus btn-success btn-number" data-type="plus" data-id="${producto.id}">
                                                <i class="fa-solid fa-plus fa-2xs" data-id="${producto.id}"></i>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p> <strong>Precio:</strong> $${producto.precio}</p>
                        </div>
                    </div>
                </div>
            </div>`
        }
        contenedorCarrito.innerHTML += `<p class="precioTotal">Precio Total: <strong>$${this.precioTotal} </strong> </p>`
        this.actualizarDOMContadorCarrito()
        console.log(")")
    }
    /**
    * Muestro el icono de cantidad de elementos del carrito
    */
    actualizarDOMContadorCarrito(){
        console.log("actualizarDOMContadorCarrito(");
        if (this.carritoCompra.length > 0) {
            btnCarrito.innerHTML = `
                                <i class="fa-sharp fa-solid fa-cart-shopping fa-lg" style="color: #ffffff;"></i>
                                <span class="position-absolute  start-f translate-middle badge rounded-pill bg-danger top-f">
                                    ${this.carritoCompra.length}
                                </span>
                                `
        } 
        else
            btnCarrito.innerHTML = `<i class="fa-sharp fa-solid fa-cart-shopping fa-lg"></i>`
        console.log(")")
    }
    /**
     * Carga los valores del menu de cantidad, se llama si se modifica el menu de talles.
     * @param producto objeto de tipo Producto
     * @param menu1 numero del talle que se desea cargar la cantidad disponible
     */
    cargarCantidad(producto,menu1){
        console.log("cargarCantidad(");
        const menu2 = document.getElementById(`menu2-${producto.id}`)
        const cantidadMax = document.getElementById(`cantidadMax-${producto.id}`)
        menu2.innerHTML=`<option value="0">Cantidad</option>`
        if(menu1.value==0){
            menu2.disabled = true
            cantidadMax.innerHTML=""
        }
        else{
            menu2.disabled = false
            const cantidadStockXTalle = producto.stock[producto.stock.findIndex(obj => obj.talle == menu1.value)].cantidad
            for(let i=0;i<cantidadStockXTalle;i++){
            menu2.innerHTML +=`<option value="${i+1}">${i+1}</option>`
            }
            cantidadMax.innerHTML = `(${cantidadStockXTalle})`
        }
        console.log(")")
    }
    /**
     * Se encarga de agregar el/los productos a comprar al carrito. Si ya existe lo suma al existente de haber stock y si no pushea el nuevo producto
     * @param newCompra objeto de tipo Compra que se cargara en carritoCompra
     */
    addCompra(newCompra){
        console.log("addCompra(");
        //se toman de referencia los menu1 y 2 del producto del boton clickeado
        const menu1 = document.getElementById(`menu1-${newCompra.id}`)
        const menu2 = document.getElementById(`menu2-${newCompra.id}`)
        const cantidadMax = document.getElementById(`cantidadMax-${newCompra.id}`)
        if(parseInt(menu1.value)!=0&&parseInt(menu2.value)!=0)//si se coloco un talle y una cantidad
        {
            let compra = new Compra(newCompra.id,newCompra.nombre,newCompra.img,parseInt(menu1.value),parseInt(menu2.value),newCompra.precio)
            let indexTalle = this.carritoCompra.findIndex(obj => obj.talle == menu1.value)
            if(indexTalle!=-1){ //si ya se encontraba guardado en carritoCompra el mismo producto con el mismo talle
                //obtiene el stock del producto respecto al talle seleccionado
                const cantidadStockXTalle = newCompra.stock[newCompra.stock.findIndex(obj => obj.talle == menu1.value)].cantidad
                //verifica que la nueva cantidad ingresada mas la anterior almacenada no supera al stock
                if(this.carritoCompra[indexTalle].cantidad+parseInt(menu2.value)<=cantidadStockXTalle){
                    this.carritoCompra[indexTalle].cantidad += parseInt(menu2.value)
                }
                else
                    alert("No hay stock suficiente")
            }
            //caso en que el producto que se quiera comprar no se encuentre previamente en carritoCompra
            else{
                this.carritoCompra.push(compra)
            }
            //se actuliza el archivo de carrito en el localStorage, y menu1 y 2 se resetean
            localStorage.setItem(`carrito`, JSON.stringify(this.carritoCompra))
            menu1.value=0
            menu2.value=0
            menu2.disabled = true
            cantidadMax.innerHTML=""
            this.mostrarCarrito()
        }
        console.log(")")
    }
    /**
     * Vacia el el carrito tanto en el objeto que lo aloja como en el DOM y lo almacenado en el localStorage
     */
    vaciarCarrito (){
        console.log("vaciar_carrito(");
        this.carritoCompra=[]
        localStorage.removeItem(`carrito`)
        contenedorCarrito.innerHTML=`<p class="precioTotal">Precio Total: <strong>$0 </strong> </p>`
        btnCarrito.innerHTML = `<i class="fa-sharp fa-solid fa-cart-shopping fa-lg"></i>`
        console.log(")")
    }
    /**
     * Calcula el precio total de todos los objetos dentro de carritoCompra
     */
    calcularPrecioTotal(){
        console.log("calcularPrecioTotal(");
        this.precioTotal=0
        this.carritoCompra.forEach(compra => {
            this.precioTotal= this.precioTotal + (compra.precio * compra.cantidad)
        })
        console.log(")")
    }
    /**
     * Suma en 1 la cantidad del objeto dentro de carritoCompra cuya idea sea compra.id, de validarse las condiciones
     * @param compra objeto de tipo Compra
     */
    plusCantidad(compra){
        console.log("plusCantidad(");
        const indexId = this.carritoCompra.findIndex(obj => obj.id == compra.id)
        const producto = this.listaProductos.find(p => p.id === compra.id);
        const stock = producto.stock.find(s => s.talle === compra.talle);
        const stockCantidad = stock.cantidad
        if (indexId === -1) {
            console.log("El producto no existe en el carrito de compras");
        } 
        else if (this.carritoCompra[indexId].cantidad < stockCantidad) {
            this.carritoCompra[indexId].cantidad++;
        } else {
            console.log("No hay suficiente stock para agregar una unidad");
        }
        this.mostrarCarrito()
        localStorage.setItem(`carrito`, JSON.stringify(this.carritoCompra))
        console.log(")");
    }
    /**
     * Resta en 1 la cantidad del objeto dentro de carritoCompra cuya idea sea compra.id, de validarse las condiciones
     * @param compra objeto de tipo Compra
     */
    subCantidad(compra){
        console.log("subCantidad(");
        const indexID = this.carritoCompra.findIndex(obj => obj.id == compra.id)
        if (indexID === -1) {
            console.log("El producto no existe en el carrito de compras");
        } 
        else if(this.carritoCompra[indexID].cantidad>1){
        this.carritoCompra[indexID].cantidad--
        }
        else{
            console.log("Para eliminar el producto del carrito toque el boton del tacho de basura");
        }
        this.mostrarCarrito()
        localStorage.setItem(`carrito`, JSON.stringify(this.carritoCompra))
        console.log(")");
    }
    /**
     * Elimina el elemento compra de carritoCompra
     * @param compra objeto de tipo Compra
     */
    eliminarCompra(compra){
        console.log("eliminarCompra(");
        const indexID = this.carritoCompra.findIndex(obj=>obj.id==compra.id)
        this.carritoCompra.splice(indexID,1)
        this.mostrarCarrito()
        localStorage.setItem(`carrito`, JSON.stringify(this.carritoCompra))
        console.log(")");
    }
}   
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////FUNCIONES//////////////////////////////////////////////

//////Base de datos del stock (Se colocaron en desorden los ID  y talles para mostrar como funciona el metodo que ordena el stock)/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let prod1  = new Producto(15, "AirMax Excee",               "Nike",      "./img/AirMaxExcee.png",             [{talle: 39,cantidad: 10},{talle: 40,cantidad: 5 }, {talle: 41,cantidad: 6 }, {talle: 42,cantidad: 7}                                                   ], 49000)
let prod2  = new Producto(2,  "Legend Essential",           "Nike",      "./img/LegendEssencial.png",         [{talle: 38,cantidad: 1 },{talle: 39,cantidad: 5 }, {talle: 41,cantidad: 8 }, {talle: 42,cantidad: 10}, {talle: 43,cantidad: 4}                         ], 31200)
let prod3  = new Producto(3,  "Downshifter",                "Nike",      "./img/DownShifter.png",             [{talle: 39,cantidad: 3 },{talle: 40,cantidad: 4 }, {talle: 41,cantidad: 1 }                                                                            ], 30800)
let prod4  = new Producto(4,  "Revolution 6 Next Nature",   "Nike",      "./img/revolution6NextNature.png",   [{talle: 40,cantidad: 9 },{talle: 42,cantidad: 10}                                                                                                      ], 27000)
let prod5  = new Producto(18, "Waffle Debut",               "Nike",      "./img/waffleDebut.png",             [{talle: 38,cantidad: 1 },{talle: 40,cantidad: 5 }, {talle: 42,cantidad: 6 }, {talle: 44,cantidad: 3}                                                   ], 28000)
let prod6  = new Producto(6,  "Royal Glide",                "Reebok",    "./img/royalGlide.png",              [{talle: 39,cantidad: 5 },{talle: 42,cantidad: 3 }, {talle: 43,cantidad: 2 }                                                                            ], 22700)
let prod7  = new Producto(7,  "Flexagon Energy Train",      "Reebok",    "./img/flexagonEnergyTrain.png",     [{talle: 40,cantidad: 10},{talle: 42,cantidad: 8 }, {talle: 41,cantidad: 6 }, {talle: 43,cantidad: 5}                                                   ], 18000)
let prod8  = new Producto(10, "Energylux 3.0",              "Reebok",    "./img/energylux3.png",              [{talle: 39,cantidad: 3 },{talle: 40,cantidad: 0 }                                                                                                      ], 21000)
let prod9  = new Producto(9,  "Royal Techque",              "Reebok",    "./img/royalTechque.png",            [{talle: 35,cantidad: 8 },{talle: 36,cantidad: 5 }, {talle: 37,cantidad: 6 }                                                                            ], 23700)
let prod10 = new Producto(8,  "Court Royale 2",             "Nike",      "./img/courtRoyal2.png",             [{talle: 38,cantidad: 1 },{talle: 39,cantidad: 6 }, {talle: 41,cantidad: 5 }, {talle: 40,cantidad: 3}, {talle: 42,cantidad: 8}                          ], 27600)
let prod11 = new Producto(11, "Terrex Ax4 Gtx",             "Adidas",    "./img/terrexAx4Gtx.png",            [{talle: 38,cantidad: 10},{talle: 42,cantidad: 10}, {talle: 40,cantidad: 10}                                                                            ], 55000)
let prod12 = new Producto(12, "Grand Court",                "Adidas",    "./img/grandcourt.png",              [{talle: 38,cantidad: 3 },{talle: 39,cantidad: 2 }, {talle: 40,cantidad: 0 }                                                                            ], 26000)
let prod13 = new Producto(13, "Runfalcon 2.0",              "Adidas",    "./img/falcon2.png",                 [{talle: 40,cantidad: 2 },{talle: 41,cantidad: 1 }, {talle: 42,cantidad: 5 }                                                                            ], 18000)
let prod14 = new Producto(14, "Ultraboost 22",              "Adidas",    "./img/ultraboost22.png",            [{talle: 38,cantidad: 4 },{talle: 39,cantidad: 2 }, {talle: 40,cantidad: 1 }, {talle: 41,cantidad: 3}, {talle: 42,cantidad: 4}, {talle: 43,cantidad: 5} ], 58000)
let prod15 = new Producto(1,  "Eq21",                       "Adidas",    "./img/eq21.png",                    [{talle: 40,cantidad: 10},{talle: 42,cantidad: 8 }, {talle: 43,cantidad: 5 }                                                                            ], 28000)
let prod16 = new Producto(16, "Formula",                    "Diadora",   "./img/Formula.png",                 [{talle: 34,cantidad: 1 },{talle: 35,cantidad: 3 }, {talle: 38,cantidad: 4 }, {talle: 36,cantidad: 12}                                                  ], 17800)
let prod17 = new Producto(17, "Corigliano",                 "Diadora",   "./img/corigliano.png",              [{talle: 39,cantidad: 8 },{talle: 42,cantidad: 5 }, {talle: 43,cantidad: 3 }                                                                            ], 17300)
let prod18 = new Producto(5,  "Graviton Pro",               "Puma",      "./img/GravitonPro.png",             [{talle: 40,cantidad: 5 },{talle: 42,cantidad: 5 }                                                                                                      ], 28600)
let prod19 = new Producto(19, "Solarsmash Rct",             "Puma",      "./img/solarsmashRct.png",           [{talle: 35,cantidad: 8 },{talle: 36,cantidad: 8 }, {talle: 38,cantidad: 3 }, {talle: 37,cantidad: 5}                                                   ], 28600)
let prod20 = new Producto(20, "Gel-Rebound",                "Asics",     "./img/gelRebound.png",              [{talle: 40,cantidad: 3 },{talle: 41,cantidad: 3 }, {talle: 42,cantidad: 3 }                                                                            ], 25800)       
