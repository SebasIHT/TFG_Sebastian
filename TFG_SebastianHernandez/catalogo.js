document.addEventListener('DOMContentLoaded', () => {
    initSwiperSliders();

    setupEventListeners();
});

function initSwiperSliders() {
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
}

function setupEventListeners() {
    const carrito = document.getElementById('carrito');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    document.querySelectorAll('#lista-1, #lista-2, #lista-3').forEach(seccion => {
        seccion.addEventListener('click', (e) => {
            if (e.target.classList.contains('agregar-carrito')) {
                const elemento = e.target.parentElement;
                const juego = obtenerJuego(elemento);
                insertarCarrito(juego);
            }
        });
    });

    carrito.addEventListener('click', (e) => {
        if (e.target.classList.contains('borrar')) {
            eliminarDelCarrito(e.target);
        }
    });

    vaciarCarritoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        vaciarCarrito();
    });
}

function obtenerJuego(elemento) {
    return {
        imagen: elemento.querySelector('.categoria-img img')?.src || 
                elemento.querySelector('.juego-txt img')?.parentElement?.previousElementSibling?.querySelector('img')?.src ||
                'imagenes/default.jpg',
        titulo: elemento.querySelector('h3')?.textContent.trim(),
        precio: elemento.querySelector('.precio')?.textContent.trim() || 
                elemento.querySelector('.precio-2')?.textContent.trim(),
        id: elemento.querySelector('a.agregar-carrito')?.getAttribute('data-id')
    };
}

function insertarCarrito(juego) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><img src="${juego.imagen}" width="60"></td>
        <td>${juego.titulo}</td>
        <td>${juego.precio}</td>
        <td><a href="#" class="borrar" data-id="${juego.id}">X</a></td>
    `;
    document.querySelector('#lista-carrito tbody').appendChild(row);
}

function eliminarDelCarrito(boton) {
    boton.parentElement.parentElement.remove();
}

function vaciarCarrito() {
    const lista = document.querySelector('#lista-carrito tbody');
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
}