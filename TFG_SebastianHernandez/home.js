document.addEventListener('DOMContentLoaded', function () {
    const swiper1 = new Swiper(".mySwiper-1", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    });

    const swiper2 = new Swiper(".mySwiper-2", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        breakpoints: {
            0: {
                slidesPerView: 1
            },
            520: {
                slidesPerView: 2
            },
            950: {
                slidesPerView: 3
            }
        }
    });

    const carrito = document.getElementById('carrito');
    const element1 = document.getElementById('lista-1');
    const element2 = document.getElementById('lista-2');
    const element3 = document.getElementById('lista-3');
    const lista = document.querySelector('#lista-carrito tbody');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

    cargarEventListeners();

    function cargarEventListeners() {
        element1.addEventListener('click', comprarElement);
        element2.addEventListener('click', comprarElement);
        element3.addEventListener('click', comprarElement);
        carrito.addEventListener('click', eliminarElement);
        vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    }

    function comprarElement(e) {
        if (e.target.classList.contains('agregar-carrito')) {
            const elemento = e.target.parentElement;
            leerDatosElement(elemento);
        }
    }

    function leerDatosElement(element) {
        const infoElement = {
            imagen: element.querySelector('img').src,
            titulo: element.querySelector('h3').textContent,
            precio: element.querySelector('.precio')?.textContent || element.querySelector('.precio-2')?.textContent,
            id: element.querySelector('a').dataset.id
        };
        insertarCarrito(infoElement);
    }

    function insertarCarrito(element) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${element.imagen}" width="60"></td>
            <td>${element.titulo}</td>
            <td>${element.precio}</td>
            <td><a href="#" class="borrar" data-id="${element.id}">X</a></td>
        `;
        lista.appendChild(row);
    }

    function eliminarElement(e) {
        if (e.target.classList.contains('borrar')) {
            e.target.parentElement.parentElement.remove();
        }
    }

    function vaciarCarrito(e) {
        e.preventDefault();
        while (lista.firstChild) {
            lista.removeChild(lista.firstChild);
        }
    }
});