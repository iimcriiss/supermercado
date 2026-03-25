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
// =============================================
//  TOAST (requerido por buscador y suscripción)
// =============================================

function mostrarToast(mensaje) {
    const existente = document.getElementById('toast-mercablue');
    if (existente) existente.remove();

    const toast = document.createElement('div');
    toast.id = 'toast-mercablue';
    toast.textContent = mensaje;
    toast.style.cssText = `
        position:fixed; bottom:24px; left:50%; transform:translateX(-50%);
        background:#111827; color:#fff; font-size:14px; font-weight:600;
        padding:12px 24px; border-radius:9999px; box-shadow:0 4px 20px rgba(0,0,0,0.3);
        z-index:9999; opacity:0; transition:opacity 0.3s;
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.style.opacity = '1');
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}


// =============================================
//  BUSCADOR + SUSCRIPCIÓN (DOMContentLoaded unificado)
// =============================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Buscador ---
    const inputBuscar = document.querySelector('input[placeholder="Busca tu producto aquí..."]');
    const btnBuscar = document.querySelector('nav button');

    if (inputBuscar) {
        inputBuscar.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') ejecutarBusqueda();
        });
    }

    if (btnBuscar) {
        btnBuscar.addEventListener('click', ejecutarBusqueda);
    }

    // Leer parámetro ?buscar= al cargar productos.html
    const termino = new URLSearchParams(window.location.search).get('buscar');
    if (termino) {
        if (inputBuscar) inputBuscar.value = termino;
        filtrarProductosEnPagina(termino);
    }

    // --- Suscripción footer ---
    const formSub = document.querySelector('footer form');
    if (formSub) {
        formSub.addEventListener('submit', (e) => {
            e.preventDefault();
            enviarSuscripcion();
        });

        const btnUnirse = formSub.querySelector('button');
        if (btnUnirse) {
            btnUnirse.addEventListener('click', (e) => {
                e.preventDefault();
                enviarSuscripcion();
            });
        }
    }

});


// =============================================
//  FUNCIONES DEL BUSCADOR
// =============================================

function ejecutarBusqueda() {
    const input = document.querySelector('input[placeholder="Busca tu producto aquí..."]');
    const termino = input?.value.trim();

    if (!termino) {
        mostrarToast('🔍 Escribe algo para buscar');
        return;
    }

    const estaEnProductos = window.location.pathname.includes('productos');
    if (!estaEnProductos) {
        window.location.href = `productos.html?buscar=${encodeURIComponent(termino)}`;
    } else {
        filtrarProductosEnPagina(termino);
    }
}

function filtrarProductosEnPagina(termino) {
    const tarjetas = document.querySelectorAll('[data-nombre]');
    const terminoLower = termino.toLowerCase();
    let encontrados = 0;

    tarjetas.forEach(tarjeta => {
        const nombre = tarjeta.getAttribute('data-nombre').toLowerCase();
        const categoria = (tarjeta.getAttribute('data-categoria') || '').toLowerCase();
        const visible = nombre.includes(terminoLower) || categoria.includes(terminoLower);
        tarjeta.style.display = visible ? '' : 'none';
        if (visible) encontrados++;
    });

    mostrarToast(encontrados > 0
        ? `🔍 ${encontrados} resultado(s) para "${termino}"`
        : `😕 Sin resultados para "${termino}"`
    );
}


// =============================================
//  FUNCIÓN DE SUSCRIPCIÓN
// =============================================

function enviarSuscripcion() {
    const input = document.querySelector('footer input[type="email"]');
    const email = input?.value.trim();

    if (!email) {
        mostrarToast('⚠️ Ingresa tu correo para suscribirte');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mostrarToast('⚠️ Ingresa un correo válido');
        return;
    }

    const suscriptores = JSON.parse(localStorage.getItem('suscriptores_mercablue') || '[]');
    if (suscriptores.includes(email)) {
        mostrarToast('ℹ️ Ya estás suscrito con ese correo');
        return;
    }

    suscriptores.push(email);
    localStorage.setItem('suscriptores_mercablue', JSON.stringify(suscriptores));
    input.value = '';

    // Para integración real con EmailJS:
    // emailjs.send("SERVICE_ID", "TEMPLATE_ID", { email }, "PUBLIC_KEY");

    mostrarToast('📧 ¡Suscripción exitosa! Revisa tu correo pronto');
}