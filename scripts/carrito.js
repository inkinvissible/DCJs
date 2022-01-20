//const carrito = () =>{
if (arrayLocal != "") {
    let arrayLocal = JSON.parse(localStorage.getItem('CarritoProductos'));
    console.log(arrayLocal);
    let cardSection = document.querySelector(".cardSection");
    let selectorCantidad = document.getElementById('.selectorCantidad').value;
    let precioFinal = document.getElementById('precioFinal');
    precioFinal.textContent = 'Precio final: $'+sumaProductos;

    let sumaProductos;

    for (const producto of arrayLocal) {
        sumaProductos = sumaProductos + producto.price;
        let article = document.createElement('article');
        article.className = "cardTienda";
        article.innerHTML = `<div class="inputYSvg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor"
                            class="bi bi-x-circle" id="svgEliminar" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path
                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                        <input type="number" data-id="${producto.id}" class="${producto.id}" id="selectorCantidad" placeholder="Cantidad">
                        </div>
                        <img src="../imagenes/ft-nosotros.jpg" alt="Foto Producto ${producto.id}">
                        <div>
                            <h2>${producto.id}</h2>
                            <p>${producto.descrip}</p>
                            <p>${producto.price}</p>
                            <p class="${producto.id}">${producto.cantidad}</p>
                        </div>`;
        cardSection.appendChild(article);
        if (selectorCantidad != "") {
            selectorCantidad.addEventListener('change', e => {
                if (e.target.classList.contains('selectorCantidad')); {
                    //Fijarse si donde se hizo click, contiene clase selectorCantidad
                    e.preventDefault;
                    //Previene Defalut
                    let productoCantidad = document.getElementsByClassName(producto.id).textContent;
                    let selectorCantidad = productoCantidad;


                }

            });
        }
    }

}
//}