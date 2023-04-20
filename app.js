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
        this.precioTotal
    }
    //Ordena de menor a mayor los stocks de cada producto segun su talle
    ordenarPorTalles() {
        for (const producto of this.listaProductos) {
            producto.stock.sort((talleA, talleB) => talleA.talle - talleB.talle);
        }
    }
    //Elimina los stocks de los productos que no tienen talle y si el producto no tiene ningun talle en stock lo elimina
    eliminarTalleSinStock() {
        for (const producto of this.listaProductos) {
            producto.stock = producto.stock.filter(talle => talle.cantidad !== 0)
        }
        this.listaProductos = this.listaProductos.filter(producto => producto.stock.length !== 0)
    }
    //Ordena la lista de productos por ID, luego los talles de menor a mayor y ademas retira los talles con stock 0
    ordenarStock() {
        this.listaProductos.sort((idA, idB) => idA.id - idB.id)
        this.ordenarPorTalles()
        this.eliminarTalleSinStock()
    }
    //vacia el el carrito tanto en el objeto que lo aloja como en el DOM
    vaciar_carrito (){
        this.carritoCompra=[]
        console.log(this.carritoCompra);
        localStorage.removeItem(`carrito`)
        contenedorCarrito.innerHTML=""
        btnCarrito.innerHTML = `<i class="fa-sharp fa-solid fa-cart-shopping fa-lg"></i>`
        
    }
    //Crea las tarjetas de los productos dentro de listaFiltrada (si no se filtra nada es igual a listaProductos) y los muestra en el DOM
    mostrarProductos(){
        for (let producto of this.listaFiltrada) {
            let opciones1 
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
    }
    //Carga las tarjetas en el DOM correpondiente a los productos dentro de carritoCompra, como el icono del boton de carrito y su indicador de cantidad de productos
    mostrarCarrito(){
        for (let producto of this.carritoCompra) {
            contenedorCarrito.innerHTML += `
            <div class="card mb-3" style="max-width: 540px">
                <dic class="row g-0">
                    <div class="col-md-7">
                        <img src=${producto.img} class="card-img-top" alt="...">
                    </div>
                    <div class="col-md-5">
                        <div class="card-body d-flex flex-column align-items-center justify-content-evenly cardPad">
                            <h4 class="card-title"><strong>${producto.nombre}</strong></h4>
                            <p class="card-text ml8px"><strong>Talle:</strong> ${producto.talle}<br><strong>Cantidad:</strong> ${producto.cantidad} <br> <strong>Precio:</strong> $${producto.precio}</p>
                        </div>
                    </div>
                </div>
            </div>`
        }
        //Muestro el icono de cantidad de elementos del carrito
        if (this.carritoCompra.length > 0) {
            btnCarrito.innerHTML = `
                                <i class="fa-sharp fa-solid fa-cart-shopping fa-lg" style="color: #ffffff;"></i>
                                <span class="position-absolute  start-f translate-middle badge rounded-pill bg-danger top-f">
                                    ${this.carritoCompra.length}
                                </span>
                                `
        } else
            btnCarrito.innerHTML = `<i class="fa-sharp fa-solid fa-cart-shopping fa-lg"></i>`
    }
    cargarCantidad(producto,menu1){
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
    }
    addCompra(producto){
        console.log(this.carritoCompra); 
        const menu1 = document.getElementById(`menu1-${producto.id}`)
        const menu2 = document.getElementById(`menu2-${producto.id}`)
        const cantidadMax = document.getElementById(`cantidadMax-${producto.id}`)
        let compra = new Compra(producto.id,producto.nombre,producto.img,parseInt(menu1.value),parseInt(menu2.value),producto.precio)
        if(compra.talle!=0&&compra.cantidad!=0)
        {
            let indexTalle = this.carritoCompra.findIndex(obj => obj.talle == menu1.value)
            if(indexTalle!=-1){
                console.log("entre a 161");
                const cantidadStockXTalle = producto.stock[producto.stock.findIndex(obj => obj.talle == menu1.value)].cantidad
                if(this.carritoCompra[indexTalle].cantidad+parseInt(menu2.value)<=cantidadStockXTalle){
                    console.log(this.carritoCompra[indexTalle].cantidad);
                    this.carritoCompra[indexTalle].cantidad += parseInt(menu2.value)
                }
                else
                    alert("No hay stock suficiente")
            }
            else{
                console.log("Se pusheo la compra");
                this.carritoCompra.push(compra)
            }
            localStorage.setItem(`carrito`, JSON.stringify(this.carritoCompra))
            contenedorCarrito.innerHTML = ""
            menu1.value=0
            menu2.value=0
            menu2.disabled = true
            cantidadMax.innerHTML=""
            for (let producto of this.carritoCompra) {
                contenedorCarrito.innerHTML += `
                <div class="card mb-3" style="max-width: 540px">
                    <dic class="row g-0">
                        <div class="col-md-7">
                            <img src=${producto.img} class="card-img-top" alt="...">
                        </div>
                        <div class="col-md-5">
                            <div class="card-body d-flex flex-column align-items-center justify-content-evenly cardPad">
                                <h4 class="card-title"><strong>${producto.nombre}</strong></h4>
                                <p class="card-text ml8px"><strong>Talle:</strong> ${producto.talle}<br><strong>Cantidad:</strong> ${producto.cantidad} <br> <strong>Precio:</strong> $${producto.precio}</p>
                            </div>
                        </div>
                    </div>
                </div>`
            }
        }
        //ACTUALIZO EL ICONO DE CANTIDAD DE PRODUCTOS DEL CARRITO
        if (this.carritoCompra.length > 0) {
            console.log("la puta madre");
            btnCarrito.innerHTML = `
                        <i class="fa-sharp fa-solid fa-cart-shopping fa-lg" style="color: #ffffff;"></i>
                        <span class="position-absolute  start-f translate-middle badge rounded-pill bg-danger top-f">
                            ${this.carritoCompra.length}
                        </span>
                        `
        }
        else
            btnCarrito.innerHTML = `<i class="fa-sharp fa-solid fa-cart-shopping fa-lg"></i>`
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
///////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////          DOM          /////////////////////////////////////////////////////////

//Constantes a elementos del HTML
const contenedorProductos = document.getElementById("contenedorProductos")
const contenedorCarrito = document.getElementById("contenedorCarrito")
const btnCarrito = document.getElementById("btnCarrito")
const vaciarCarrito = document.getElementById(`btnVaciarCarrito`)
//Muestro los productos para comprar
productos.mostrarProductos()
//Cargo el archivo JSON guardado en el localstorage y cargo en el DOM el carrito (se visualiza lo cargado si se oprime el boton de carrito)
productos.carritoCompra = JSON.parse(localStorage.getItem(`carrito`)) || []
productos.mostrarCarrito()


////////////////////EVENTOS/////////////////////////////////////////////////////////////////////////////////

//Evento si toco el menu de talles
productos.listaProductos.forEach(producto => {
    
    const menu1 = document.getElementById(`menu1-${producto.id}`)
    menu1.addEventListener('change',()=>productos.cargarCantidad(producto,menu1))
})
// menu1.addEventListener('change',()=>
//     {
//         const menu2 = document.getElementById(`menu2-${producto.id}`)
//         const cantidadMax = document.getElementById(`cantidadMax-${producto.id}`)
//         menu2.innerHTML=`<option value="0">Cantidad</option>`
//         if(menu1.value==0){
//             menu2.disabled = true
//             cantidadMax.innerHTML=""
//         }
//         else{
//             menu2.disabled = false
//             const cantidadStockXTalle = producto.stock[producto.stock.findIndex(obj => obj.talle == menu1.value)].cantidad
//             for(let i=0;i<cantidadStockXTalle;i++){
//             menu2.innerHTML +=`<option value="${i+1}">${i+1}</option>`
//             }
//             cantidadMax.innerHTML = `(${cantidadStockXTalle})`
//         }
//     })
// })

//Evento si toco un boton de añadir al carrito 
productos.listaProductos.forEach(producto => {
    const btnAP = document.getElementById(`producto-${producto.id}`)
    btnAP.addEventListener("click", () => {
        productos.addCompra(producto)
    })
})


    vaciarCarrito.addEventListener(`click`,productos.vaciar_carrito)

