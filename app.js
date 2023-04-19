class TalleCantidad {
    constructor(talle, cantidad) {
        this.talle = talle
        this.cantidad = cantidad
    }
}
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
class ProductHandler {
    constructor() {
        this.listaProductos = []
        this.carritoCompra = []
        this.precioTotal
    }
    ordenarPorTalles() {
        for (const producto of this.listaProductos) {
            producto.stock.sort((talleA, talleB) => talleA.talle - talleB.talle);
        }
    }
    eliminarTalleSinStock() {
        for (const producto of this.listaProductos) {
            producto.stock = producto.stock.filter(talle => talle.cantidad !== 0)
        }
    }
    //Ordena la lista de productos por ID, luego los talles de mayor a menor y ademas retira los talles con stock 0
    ordenarStock() {
        this.listaProductos.sort((idA, idB) => idA.id - idB.id)
        this.ordenarPorTalles()
        this.eliminarTalleSinStock()
    }
}
//Base de datos del stock (Se colocaron en desorden los ID  y talles para mostrar como funciona el metodo que ordena el stock)

let prod1 = new Producto(15, "AirMax Excee", "Nike", "./img/AirMaxExcee.png", [{
    talle: 39,
    cantidad: 10
}, {
    talle: 40,
    cantidad: 5
}, {
    talle: 41,
    cantidad: 6
}, {
    talle: 42,
    cantidad: 7
}], 49000)
let prod2 = new Producto(2, "Legend Essential", "Nike", "./img/LegendEssencial.png", [{
    talle: 38,
    cantidad: 1
}, {
    talle: 39,
    cantidad: 5
}, {
    talle: 41,
    cantidad: 8
}, {
    talle: 42,
    cantidad: 10
}, {
    talle: 43,
    cantidad: 4
}], 31200)
let prod3 = new Producto(3, "Downshifter", "Nike", "./img/DownShifter.png", [{
    talle: 39,
    cantidad: 3
}, {
    talle: 40,
    cantidad: 4
}, {
    talle: 41,
    cantidad: 1
}], 30800)
let prod4 = new Producto(4, "Revolution 6 Next Nature", "Nike", "./img/revolution6NextNature.png", [{
    talle: 40,
    cantidad: 9
}, {
    talle: 42,
    cantidad: 10
}], 27000)
let prod5 = new Producto(18, "Waffle Debut", "Nike", "./img/waffleDebut.png", [{
    talle: 38,
    cantidad: 1
}, {
    talle: 40,
    cantidad: 5
}, {
    talle: 42,
    cantidad: 6
}, {
    talle: 44,
    cantidad: 3
}], 28000)
let prod6 = new Producto(6, "Royal Glide", "Reebok", "./img/royalGlide.png", [{
    talle: 39,
    cantidad: 5
}, {
    talle: 42,
    cantidad: 3
}, {
    talle: 43,
    cantidad: 2
}], 22700)
let prod7 = new Producto(7, "Flexagon Energy Train", "Reebok", "./img/flexagonEnergyTrain.png", [{
    talle: 40,
    cantidad: 10
}, {
    talle: 42,
    cantidad: 8
}, {
    talle: 41,
    cantidad: 6
}, {
    talle: 43,
    cantidad: 5
}], 18000)
let prod8 = new Producto(10, "Energylux 3.0", "Reebok", "./img/energylux3.png", [{
    talle: 39,
    cantidad: 3
}, {
    talle: 40,
    cantidad: 0
}], 21000)
let prod9 = new Producto(9, "Royal Techque", "Reebok", "./img/royalTechque.png", [{
    talle: 35,
    cantidad: 8
}, {
    talle: 36,
    cantidad: 5
}, {
    talle: 37,
    cantidad: 6
}], 23700)
let prod10 = new Producto(8, "Court Royale 2", "Nike", "./img/courtRoyal2.png", [{
    talle: 38,
    cantidad: 1
}, {
    talle: 39,
    cantidad: 6
}, {
    talle: 41,
    cantidad: 5
}, {
    talle: 40,
    cantidad: 3
}, {
    talle: 42,
    cantidad: 8
}], 27600)
let prod11 = new Producto(11, "Terrex Ax4 Gtx", "Adidas", "./img/terrexAx4Gtx.png", [{
    talle: 38,
    cantidad: 10
}, {
    talle: 42,
    cantidad: 10
}, {
    talle: 40,
    cantidad: 10
}], 55000)
let prod12 = new Producto(12, "Grand Court", "Adidas", "./img/grandcourt.png", [{
    talle: 38,
    cantidad: 3
}, {
    talle: 39,
    cantidad: 2
}, {
    talle: 40,
    cantidad: 0
}], 26000)
let prod13 = new Producto(13, "Runfalcon 2.0", "Adidas", "./img/falcon2.png", [{
    talle: 40,
    cantidad: 2
}, {
    talle: 41,
    cantidad: 1
}, {
    talle: 42,
    cantidad: 5
}], 18000)
let prod14 = new Producto(14, "Ultraboost 22", "Adidas", "./img/ultraboost22.png", [{
    talle: 38,
    cantidad: 4
}, {
    talle: 39,
    cantidad: 2
}, {
    talle: 40,
    cantidad: 1
}, {
    talle: 41,
    cantidad: 3
}, {
    talle: 42,
    cantidad: 4
}, {
    talle: 43,
    cantidad: 5
}], 58000)
let prod15 = new Producto(1, "Eq21", "Adidas", "./img/eq21.png", [{
    talle: 40,
    cantidad: 10
}, {
    talle: 42,
    cantidad: 8
}, {
    talle: 43,
    cantidad: 5
}], 28000)
let prod16 = new Producto(16, "Formula", "Diadora", "./img/Formula.png", [{
    talle: 34,
    cantidad: 1
}, {
    talle: 35,
    cantidad: 3
}, {
    talle: 38,
    cantidad: 4
}, {
    talle: 36,
    cantidad: 12
}], 17800)
let prod17 = new Producto(17, "Corigliano", "Diadora", "./img/corigliano.png", [{
    talle: 39,
    cantidad: 8
}, {
    talle: 42,
    cantidad: 5
}, {
    talle: 43,
    cantidad: 3
}], 17300)
let prod18 = new Producto(5, "Graviton Pro", "Puma", "./img/GravitonPro.png", [{
    talle: 40,
    cantidad: 5
}, {
    talle: 42,
    cantidad: 5
}], 28600)
let prod19 = new Producto(19, "Solarsmash Rct", "Puma", "./img/solarsmashRct.png", [{
    talle: 35,
    cantidad: 8
}, {
    talle: 36,
    cantidad: 8
}, {
    talle: 38,
    cantidad: 3
}, {
    talle: 37,
    cantidad: 5
}], 28600)
let prod20 = new Producto(20, "Gel-Rebound", "Asics", "./img/gelRebound.png", [{
    talle: 40,
    cantidad: 3
}, {
    talle: 41,
    cantidad: 3
}, {
    talle: 42,
    cantidad: 3
}], 25800)

//SIMULACION DE OBTENCION DE INFORMACION A PARTIR DE UN JSON:

//ALOJO LOS OBJETOS ANTES CREADOS DENTRO DE UN ARRAY DE OBJETOS SITUADOS DENTRO DE LA CLASE PRODUCTHANDLER
let productosAJSON = new ProductHandler
productosAJSON.listaProductos = [prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod9, prod10, prod11, prod12, prod13, prod14, prod15, prod16, prod17, prod18, prod19, prod20]

//CREO UN JSON A PARTIR DE ESA INFO
const productosJson = JSON.stringify(productosAJSON.listaProductos)


//SUPONGO QUE ME LLEGA EL JSON CON EL CONTENIDO DE LA BASE DE DATOS DEL CATALOGO Y STOCK DE LA PAGINA

const productosParseados = JSON.parse(productosJson)

let productos = new ProductHandler

productos.listaProductos = productosParseados
productos.ordenarStock()
console.log(productos.listaProductos);
//DOM
const contenedorProductos = document.getElementById("contenedorProductos")
const contenedorCarrito = document.getElementById("contenedorCarrito")
const btnCarrito = document.getElementById("btnCarrito")

for (let producto of productos.listaProductos) {
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
                <a href="#" id="producto-${producto.id}" class="btn btn-primary">Añadir al carrito <i class="fa-solid fa-cart-plus"></i> </a>
                <div>
                    <select id="menu1-${producto.id}">
                        <option value="">Elija un talle</option>
                        ${opciones1}
                    </select>
                    <select id="menu2-${producto.id}" disabled>
                        <option value="">Cantidad</option>
                    </select>
                </div>
            </div>
        </div>
    </div>`
}

productos.carritoCompra = JSON.parse(localStorage.getItem(`carrito`)) || []
for (let producto of productos.carritoCompra) {
    contenedorCarrito.innerHTML += `
    <div class="card mb-3" style="max-width: 540px">
        <dic class="row g-0">
            <div class="col-md-7">
                <img src=${producto.img} class="card-img-top" alt="...">
            </div>
            <div class="col-md-5">
                <div class="card-body d-flex flex-column align-items-center justify-content-evenly cardPad">
                    <h4 class="card-title"><strong>${producto.nombre}</strong></h4>
                    <p class="card-text ml8px"><strong>Marca:</strong> ${producto.marca} <br> <strong>Precio:</strong> $${producto.precio}</p>
                </div>
            </div>
        </div>
    </div>`
}
if (productos.carritoCompra.length > 0) {
    btnCarrito.innerHTML = `
                        <i class="fa-sharp fa-solid fa-cart-shopping fa-lg" style="color: #ffffff;"></i>
                        <span class="position-absolute  start-f translate-middle badge rounded-pill bg-danger top-f">
                            ${productos.carritoCompra.length}
                        </span>
                        `
} else
    btnCarrito.innerHTML = `<i class="fa-sharp fa-solid fa-cart-shopping fa-lg"></i>`

////////////////////Eventos

productos.listaProductos.forEach(producto => {
    const menu1 = document.getElementById(`menu1-${producto.id}`)
    menu1.addEventListener('change',() => {
        const menu2 = document.getElementById(`menu2-${producto.id}`)
        menu2.disabled = false
        menu2.innerHTML = `<option value="">Cantidad</option>`
        const cantidadStockXTalle = producto.stock[producto.stock.findIndex(obj => obj.talle == menu1.value)].cantidad
        for(let i=0;i<cantidadStockXTalle;i++){
        menu2.innerHTML +=`<option value="">${cantidadStockXTalle-i}</option>`
        }
        const opcionSeleccionada = menu1.value;
    })
})

productos.listaProductos.forEach(producto => {
    const btnAP = document.getElementById(`producto-${producto.id}`)
    btnAP.addEventListener("click", () => {
        productos.carritoCompra.push(producto)
        localStorage.setItem(`carrito`, JSON.stringify(productos.carritoCompra))
        contenedorCarrito.innerHTML = ""
        console.log(productos.carritoCompra)
        for (let producto of productos.carritoCompra) {
            contenedorCarrito.innerHTML += `
            <div class="card mb-3" style="max-width: 540px">
                <dic class="row g-0">
                    <div class="col-md-7">
                        <img src=${producto.img} class="card-img-top" alt="...">
                    </div>
                    <div class="col-md-5">
                        <div class="card-body d-flex flex-column align-items-center justify-content-evenly cardPad">
                            <h4 class="card-title"><strong>${producto.nombre}</strong></h4>
                            <p class="card-text ml8px"><strong>Marca:</strong> ${producto.marca} <br> <strong>Precio:</strong> $${producto.precio}</p>
                        </div>
                    </div>
                </div>
            </div>`
        }
        if (productos.carritoCompra.length > 0) {
            btnCarrito.innerHTML = `
                        <i class="fa-sharp fa-solid fa-cart-shopping fa-lg" style="color: #ffffff;"></i>
                        <span class="position-absolute  start-f translate-middle badge rounded-pill bg-danger top-f">
                            ${productos.carritoCompra.length}
                        </span>
                        `
        } else
            btnCarrito.innerHTML = `<i class="fa-sharp fa-solid fa-cart-shopping fa-lg"></i>`

    })
})
