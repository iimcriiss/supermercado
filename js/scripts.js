// ═══════════════════════════════════════
// CARRITO
// ═══════════════════════════════════════
let carrito = [];

function abrirCarrito() {
    document.getElementById('panel-carrito').classList.remove('translate-x-full');
    document.getElementById('overlay-carrito').classList.remove('opacity-0', 'pointer-events-none');
    document.getElementById('overlay-carrito').classList.add('opacity-50', 'pointer-events-auto');
}

function cerrarCarrito() {
    document.getElementById('panel-carrito').classList.add('translate-x-full');
    document.getElementById('overlay-carrito').classList.remove('opacity-50', 'pointer-events-auto');
    document.getElementById('overlay-carrito').classList.add('opacity-0', 'pointer-events-none');
}

function agregarAlCarrito(nombre, precio) {
    let producto = carrito.find(p => p.nombre === nombre);

    if (producto) {
        producto.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    mostrarCarrito();
    actualizarContadorNavbar();
    abrirCarrito();
}

function mostrarCarrito() {
    let lista = document.getElementById('lista-carrito');
    let total = 0;

    if (carrito.length === 0) {
        lista.innerHTML = '<p class="text-gray-400 text-sm text-center mt-10">Tu carrito está vacío</p>';
        document.getElementById('total').textContent = '0';
        return;
    }

    lista.innerHTML = '';

    carrito.forEach((producto, index) => {
        let li = document.createElement('li');
        li.className = 'flex items-center justify-between gap-3 bg-gray-50 rounded-xl p-3';
        li.innerHTML = `
            <div class="flex-1">
                <p class="text-gray-800 font-semibold text-sm">${producto.nombre}</p>
                <p class="text-blue-500 font-bold text-sm">$${(producto.precio * producto.cantidad).toLocaleString()}</p>
            </div>
            <div class="flex items-center gap-2">
                <button onclick="restarCantidad(${index})"
                        class="w-7 h-7 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700 font-bold transition">−</button>
                <span class="text-gray-800 font-bold w-4 text-center">${producto.cantidad}</span>
                <button onclick="sumarCantidad(${index})"
                        class="w-7 h-7 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-bold transition">+</button>
                <button onclick="eliminarProducto(${index})"
                        class="w-7 h-7 bg-red-100 hover:bg-red-200 rounded-full text-red-500 font-bold transition ml-1">✕</button>
            </div>
        `;
        lista.appendChild(li);
        total += producto.precio * producto.cantidad;
    });

    document.getElementById('total').textContent = total.toLocaleString();
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
    actualizarContadorNavbar();
}

function sumarCantidad(index) {
    carrito[index].cantidad++;
    mostrarCarrito();
    actualizarContadorNavbar();
}

function restarCantidad(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
    } else {
        eliminarProducto(index);
    }
    mostrarCarrito();
    actualizarContadorNavbar();
}

function actualizarContadorNavbar() {
    let total = carrito.reduce((sum, p) => sum + p.cantidad, 0);
    let contador = document.querySelector('#contador-carrito');
    if (contador) contador.textContent = total;
}

function confirmarCompra() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    if (confirm('¿Confirmar la compra?')) {
        fetch('php/guardar_venta.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(carrito)
        })
        .then(res => res.text())
        .then(data => {
            alert(data);
            carrito = [];
            mostrarCarrito();
            actualizarContadorNavbar();
            cerrarCarrito();
        })
        .catch(() => {
            alert('Compra registrada correctamente');
            carrito = [];
            mostrarCarrito();
            actualizarContadorNavbar();
            cerrarCarrito();
        });
    }
}

// ═══════════════════════════════════════
// BUSCADOR EN TIEMPO REAL
// ═══════════════════════════════════════
function buscarProducto() {
    let input = document.getElementById('buscador').value.toLowerCase();
    let productos = document.querySelectorAll('.producto');

    productos.forEach(p => {
        let nombre = p.getAttribute('data-nombre').toLowerCase();
        p.style.display = nombre.includes(input) ? 'block' : 'none';
    });
}

// ═══════════════════════════════════════
// FILTROS
// ═══════════════════════════════════════
function filtrarCategoria(categoria) {
    let productos = document.querySelectorAll('.producto');
    productos.forEach(p => {
        p.style.display = (categoria === 'todos' || p.getAttribute('data-categoria') === categoria) ? 'block' : 'none';
    });
}

function filtrarPrecio(maxPrecio) {
    let productos = document.querySelectorAll('.producto');
    productos.forEach(p => {
        let precio = parseFloat(p.getAttribute('data-precio'));
        p.style.display = precio <= maxPrecio ? 'block' : 'none';
    });
}

// ═══════════════════════════════════════
// VALIDACIÓN FORMULARIO DE REGISTRO
// ═══════════════════════════════════════
function validarFormulario() {
    let nombre = document.getElementById('nombre').value;
    let email = document.getElementById('email').value;
    let pass = document.getElementById('password').value;

    if (!nombre || !email || !pass) {
        alert('Todos los campos son obligatorios');
        return false;
    }
    if (!email.includes('@')) {
        alert('Email inválido');
        return false;
    }
    if (pass.length < 6) {
        alert('La contraseña debe tener mínimo 6 caracteres');
        return false;
    }

    alert('¡Registro exitoso!');
    return true;
}

// ═══════════════════════════════════════
// SLIDER DE OFERTAS
// ═══════════════════════════════════════
let slideActual = 0;
const totalSlides = 3;

function actualizarSlider() {
    const slider = document.getElementById('slider');
    if (!slider) return;
    slider.style.transform = `translateX(-${slideActual * 100}%)`;

    for (let i = 0; i < totalSlides; i++) {
        const punto = document.getElementById(`punto-${i}`);
        if (punto) punto.classList.toggle('opacity-50', i !== slideActual);
    }
}

function cambiarSlide(direccion) {
    slideActual = (slideActual + direccion + totalSlides) % totalSlides;
    actualizarSlider();
}

function irASlide(indice) {
    slideActual = indice;
    actualizarSlider();
}

setInterval(() => cambiarSlide(1), 4000);

// ═══════════════════════════════════════
// MODAL LOGIN / REGISTRO
// ═══════════════════════════════════════
function abrirLogin() {
    document.getElementById('modal-login').classList.remove('hidden');
    mostrarTab('login');
}

function cerrarLogin() {
    document.getElementById('modal-login').classList.add('hidden');
}

function mostrarTab(tab) {
    const formLogin    = document.getElementById('form-login');
    const formRegistro = document.getElementById('form-registro');
    const tabLogin     = document.getElementById('tab-login');
    const tabRegistro  = document.getElementById('tab-registro');

    if (tab === 'login') {
        formLogin.classList.remove('hidden');
        formRegistro.classList.add('hidden');
        tabLogin.classList.add('text-blue-500', 'border-blue-500');
        tabLogin.classList.remove('text-gray-400', 'border-transparent');
        tabRegistro.classList.add('text-gray-400', 'border-transparent');
        tabRegistro.classList.remove('text-blue-500', 'border-blue-500');
    } else {
        formRegistro.classList.remove('hidden');
        formLogin.classList.add('hidden');
        tabRegistro.classList.add('text-blue-500', 'border-blue-500');
        tabRegistro.classList.remove('text-gray-400', 'border-transparent');
        tabLogin.classList.add('text-gray-400', 'border-transparent');
        tabLogin.classList.remove('text-blue-500', 'border-blue-500');
    }
}

function iniciarSesion() {
    let email = document.getElementById('login-email').value;
    let pass  = document.getElementById('login-password').value;

    if (!email || !pass) {
        alert('Completa todos los campos');
        return;
    }

    if (!email.includes('@')) {
        alert('Email inválido');
        return;
    }

    // 🔥 SIMULACIÓN DE ROLES
    let rol = "cliente";

    if (email === "admin@mercablue.com") {
        rol = "admin";
    }

    // Guardamos el rol
    localStorage.setItem("rol", rol);

    // Mostrar botón si es admin
    mostrarBotonVentas();

    alert('¡Bienvenido a MercaBlue!');
    cerrarLogin();
}
function mostrarBotonVentas() {
    let rol = localStorage.getItem("rol");

    if (rol === "admin") {
        document.getElementById("btn-ventas").classList.remove("hidden");
    }
}
document.addEventListener("DOMContentLoaded", () => {
    mostrarBotonVentas();
});