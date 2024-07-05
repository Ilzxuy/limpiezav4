//Función que me aplica el estilo a la opción seleccionada y quita la previamente seleccionada
function seleccionar(link) {
    var opciones = document.querySelectorAll('#links a');
    opciones.forEach(opcion => opcion.className = ""); // Limpia las clases de todas las opciones
    link.className = "seleccionado";

    // Hacemos desaparecer el menu una vez que se ha seleccionado una opción
    // en modo responsive
    var x = document.getElementById("nav");
    x.className = "";
}

// Función que muestra el menu responsive
function responsiveMenu() {
    var x = document.getElementById("nav");
    if (x.className === "") {
        x.className = "responsive";
    } else {
        x.className = "";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('header');
    const inicioSection = document.getElementById('inicio');
    const serviciosSection = document.getElementById('servicios');
    const fotosSection = document.getElementById('fotos');
    const sobreSection = document.getElementById('sobre');

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }

    function toggleBackground() {
        if (isElementInViewport(inicioSection)) {
            navbar.classList.remove('scrolled');
        } else {
            navbar.classList.add('scrolled');
        }
    }

    function setActiveLink() {
        const currentPath = window.location.pathname;
        const links = document.querySelectorAll('#links a');

        links.forEach(link => {
            link.classList.remove('seleccionado'); // Limpiar todas las clases seleccionadas
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('seleccionado'); // Agregar clase seleccionada al enlace actual
            }
        });
    }

    function navigateToSection(event) {
        event.preventDefault();
        const target = event.target;
        const href = target.getAttribute('href');

        if (href && href.startsWith('#')) {
            const section = document.querySelector(href);
            if (section) {
                window.scrollTo({
                    top: section.offsetTop - navbar.offsetHeight,
                    behavior: 'smooth'
                });
            }
        } else {
            window.location.href = href; // Navegar a la página enlace
        }
    }

    function checkPage() {
        const currentPath = window.location.pathname;
        
        // Verificar la página actual y actualizar la navegación
        if (currentPath.includes('servicios.php') || currentPath.includes() || currentPath.includes('sobre.php')) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', toggleBackground);
    setActiveLink(); // Establecer el enlace activo al cargar la página
    checkPage(); // Verificar la página al cargar

    const links = document.querySelectorAll('#links a');
    links.forEach(link => {
        link.addEventListener('click', navigateToSection);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const inicioSection = document.getElementById('inicio');
    const imagenesFondoDesktop = [
        "url('assets/img/inicio7.webp')",
        "url('assets/img/inicio3.webp')",
        "url('assets/img/inicio8.webp')",
        "url('assets/img/inicio5.webp')",
        "url('assets/img/inicio6.webp')",
        "url('assets/img/inicio4.webp')"
    ];
    const imagenesFondoMobile = [
        "url('assets/img/inicio-mobil3.webp')",
        "url('assets/img/inicio-mobil2.webp')",
        "url('assets/img/inicio-mobil3.webp')",
        "url('assets/img/inicio-mobil2.webp')"
    ];
    let indexImagenActual = 0;
    const intervaloCambios = 5000; // Tiempo en milisegundos (5 segundos)
    let intervaloId;
    let esMovil = window.innerWidth <= 768;

    function cambiarImagenFondo() {
        let imagenesFondo = esMovil ? imagenesFondoMobile : imagenesFondoDesktop;
        inicioSection.style.transition = 'background-image 1s ease-in-out'; // Añade transición suave
        inicioSection.style.backgroundImage = imagenesFondo[indexImagenActual];
        indexImagenActual = (indexImagenActual + 1) % imagenesFondo.length;
    }

    function iniciarIntervalo() {
        if (intervaloId) {
            clearInterval(intervaloId);
        }
        cambiarImagenFondo();
        intervaloId = setInterval(cambiarImagenFondo, intervaloCambios);
    }

    function verificarCambioTamano() {
        let esAhoraMovil = window.innerWidth <= 768;
        if (esAhoraMovil !== esMovil) {
            esMovil = esAhoraMovil;
            iniciarIntervalo();
        }
    }

    window.onload = iniciarIntervalo;
    window.onresize = verificarCambioTamano; // Verifica el cambio de tamaño de la pantalla
});



/// Obtener todos los elementos de la galería
const galleryItems = document.querySelectorAll('.gallery-item');

// Definir las imágenes originales y alternativas para cada elemento
const originalImages = [];
const alternateImages = [
    'assets/img/ejemplo.webp',
    'assets/img/ejemplo.webp',
    'assets/img/ejemplo.webp',
    'assets/img/inicio4.webp',
    'assets/img/inicio4.webp' // Asegúrate de que cada imagen sea única
];

// Almacenar las imágenes originales al cargar la página
galleryItems.forEach((item) => {
    const img = item.querySelector('img');
    originalImages.push(img.src); // Guardar la ruta de la imagen original
});

// Iterar sobre cada elemento para añadir los eventos
galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');

    // Evento cuando el mouse entra en el elemento
    item.addEventListener('mouseenter', function() {
        img.src = alternateImages[index]; // Cambiar la imagen al pasar el mouse
    });

    // Evento cuando el mouse sale del elemento
    item.addEventListener('mouseleave', function() {
        img.src = originalImages[index]; // Restaurar la imagen original
    });

    // Evento cuando se hace clic en el elemento
    item.addEventListener('click', function() {
        // Restaurar las imágenes originales de todos los elementos
        originalImages.forEach((src, idx) => {
            galleryItems[idx].querySelector('img').src = src;
        });

        // Cambiar la imagen del elemento actual al hacer clic
        img.src = alternateImages[index];
    });
});







document.addEventListener('DOMContentLoaded', function() {
    const servicios = document.querySelectorAll('#servicios2 .fila .servicio');
    let index = 0;
    let intervalo;

    function activarSiguienteServicio() {
        servicios.forEach(servicio => servicio.classList.remove('activo'));
        servicios[index].classList.add('activo');
        index = (index + 1) % servicios.length;
    }

    function iniciarIntervalo() {
        intervalo = setInterval(activarSiguienteServicio, 3000); // Cambia cada 5 segundos
    }

    function detenerIntervalo() {
        clearInterval(intervalo);
    }

    function comprobarAnchoPantalla() {
        if (window.innerWidth <= 768) {
            iniciarIntervalo(); // Iniciar la animación automáticamente si el ancho es menor o igual a 768px
        } else {
            detenerIntervalo(); // Detener la animación si el ancho es mayor a 768px
        }
    }

    comprobarAnchoPantalla(); // Verificar el tamaño de la pantalla al cargar la página

    window.addEventListener('resize', comprobarAnchoPantalla); // Verificar el tamaño al cambiar el tamaño de la ventana
});
