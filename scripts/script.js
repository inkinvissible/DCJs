class Producto {
    constructor(id, descripcion, precio, cantidad) {
        this.id = id;
        this.descripcion = descripcion;
        this.precio = precio;
        this.cantidad = cantidad;
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
                            <!--<input type="number" id="inputCantidad" placeholder="Cantidad">-->
    
                            
    
                                <div>
                                    <div class="btnCompra">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-cart" viewBox="0 0 16 16">
                                <path
                                    d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            </svg>
                                    <a href="" data-id="${producto.id}" class="btn-add">Agregar al Carrito</a>
                                    </div>
                                   
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

let sumaProductos = 0;
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
        // let cantidad = e.target.closest('article').querySelector('.cantidad').textContent;
        // Insertar en arreglo, localStorage o cookie
        //Sumar Carrito
        sumaProductos += price;
        $('#selectOption').append(`<p>${sumaProductos}</p>`);
        //Hacer Push al Local Storage
        carritos.push({ productId, descrip, price});

        alertify.success('Producto agregado con éxito');
        let carritoEnJson = JSON.stringify(carritos);
        localStorage.setItem('CarritoProductos', carritoEnJson);

        //HAY QUE MOSTRAR QUE SE AGREGO EL PRODUCTO AL CARRITO
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


//Eliminar los productos del carrito onclick
let deleteBtn = document.getElementById('svgEliminar');
deleteBtn.onclick = () => {
    localStorage.removeItem('CarritoProductos');
    location.reload();
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
        if (buscar == '' || id.includes(buscar)) {
            article.style.display = 'block';
        } else {
            // No coincide la búsqueda, ocultar
            article.style.display = 'none';
        }
    });
});

let filtroPrecio = document.querySelector('#filtroPrecio');
// Asignar evento
filtroPrecio.addEventListener('input', e => {
    // Obtener valor del campo, ignorando espacios en los extremos
    let buscar = filtroPrecio.value.trim();
    // Obtener todos los productos (HTML, no el arreglo) por clase
    let prodHtml = document.querySelectorAll('.carta');
    // Recorrer todos los elementos
    prodHtml.forEach(article => {
        // Buscar ID de producto
        let price = article.querySelector('.precio').textContent;
        // Mostrar si la búsqueda es cadena vacía o si ID de producto incluye la cadena
        if (buscar == '' || price.includes(buscar)) {
            article.style.display = 'block';
        } else {
            // No coincide la búsqueda, ocultar
            article.style.display = 'none';
        }
    });
});



