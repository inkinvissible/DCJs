class Producto {
    constructor(id, descripcion,precio) {
        this.id = id;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}
let productos = [];
let carritos = [];

productos.push(new Producto("751100", "Manija", 5000));
productos.push(new Producto("851100", "Manija", 5000));
productos.push(new Producto("751200", "Manija", 5000));
productos.push(new Producto("753100", "Manija", 5000));

let section = document.querySelector('.tiendaOnline.row.separar.container-fluid');

for (const producto of productos) {
    let article = document.createElement("article");
    article.className = "col col-12 col-md-6 col-lg-4 carta";
    article.innerHTML = `   <img src="../imagenes/ft-nosotros.jpg" class="img-fluid" alt="Imagen de Producto">
                            <div>
                            
                            <h3 class="codigo">${producto.id}</h3>
                            <p class="descripcion">${producto.descripcion}</p>
                            <p class="precio">$${producto.precio}</p>
                            
    
                                <div>
                                    <div class="btnCompra">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-cart" viewBox="0 0 16 16">
                                <path
                                    d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            </svg>
                                    <a href="" data-id="${producto.id}" class="btn-add">Agregar al Carrito</a>
                                    </div>
                                    <!--<a href="" id="detalles${producto.id}" class="btnDetalles">Ver detalles</a>-->
                                </div>
                            </div>`;
    // Agregar a sección y no al documento
    section.appendChild(article);
}
//Filtros de Productos
let filtros = document.getElementById('filtro');

filtros.onclick = () => {
    let aside = document.getElementById('asideFiltros');
    aside.classList.toggle('show');
}
//Abrir Carrito
let svgCart = document.getElementById('svgCart');
svgCart.onclick = () => {
    let section = document.getElementById('carrito');
    
    if (section.classList.contains('noShow')) {
        svgCart.classList.add('noShow');
        section.classList.remove('noShow');
        section.classList.add('show');
    } else {
        section.classList.remove('show');
        section.classList.add('noShow');
        svgCart.classList.remove('noShow')
    }
}

// Escuchar clics en listado de productos
section.addEventListener('click', e => {
    // Solo si el clic fue en botón para agregar producto
    if (e.target.classList.contains('btn-add')) {
        // Cancelar evento del enlace
        e.preventDefault();
        let sectionCarrito = document.getElementById('carrito');
        // Tomar ID desde atributo de datos
        let productId = e.target.dataset.id;
        // Obtener descripción y precio, buscando primero el padre y luego el elemento por clase
        let descrip = e.target.closest('article').querySelector('.descripcion').textContent;
        let price = e.target.closest('article').querySelector('.precio').textContent;
        // Insertar en arreglo, deberías guardarlo en algún lado, localStorage o cookie
        carritos.push({ productId, descrip, price});
        let carritoEnJson = JSON.stringify(carritos);
        localStorage.setItem('CarritoProductos', carritoEnJson);
        // Agregar HTML al carrito
        let article = document.createElement('article');
        article.className = 'col col-sm-12 col-md-12 col-lg-12 col-xl-12'
        article.innerHTML = ` <div class="divCarrito row container-fluid">
                                <img src="../imagenes/ft-nosotros.jpg" alt="" class="imgCarrito col col-md-6 col-lg-6 col-6">
        
                                    <div class="col col-md-6 col-lg-6 col-6">
                                        <h5>${productId} - ${descrip} - ${price}</h5>
                                    </div>
                            </div>`
        sectionCarrito.appendChild(article);
    }
});
let arrayLocal = JSON.parse(localStorage.getItem('CarritoProductos'));

//Eliminar los productos del carrito onclick
let deleteBtn = document.getElementById('svgEliminar');
deleteBtn.onclick = () =>{
    localStorage.removeItem('CarritoProductos');
    location.reload();
}

if (arrayLocal !== "") {
    let sectionCarrito = document.getElementById('carrito');
    
    for (const producto of arrayLocal) {
        let article = document.createElement('article');
        article.className = 'col col-sm-12 col-md-12 col-lg-12 col-xl-12'
        article.innerHTML = ` <div class="divCarrito row container-fluid">
                                <img src="../imagenes/ft-nosotros.jpg" alt="" class="imgCarrito col col-md-6 col-lg-6 col-6">
        
                                    <div class="col col-md-6 col-lg-6 col-6">
                                        <h5>${producto.productId} - ${producto.descrip}</h5>
                                    </div>
                            </div>`
        sectionCarrito.appendChild(article);
    }
}

//Buscar Productos
// Declarar una variable para acceder al campo
let busqueda = document.querySelector('#inputBusqueda');
// Asignar evento
busqueda.addEventListener('input', e => {
    // Obtener valor del campo, ignorando espacios en los extremos
    let buscar = busqueda.value.trim();
    // Obtener todos los productos (HTML, no el arreglo) por clase
    let prodHtml = document.querySelectorAll('.carta');
    // Recorrer todos los elementos
    prodHtml.forEach(article => {
        // Buscar ID de producto
        let id = article.querySelector('.codigo').textContent;
        // Mostrar si la búsqueda es cadena vacía o si ID de producto incluye la cadena
        if(buscar == '' || id.includes(buscar)) {
            article.style.display = 'block';
        } else {
            // No coincide la búsqueda, ocultar
            article.style.display = 'none';
        }
    });
});
