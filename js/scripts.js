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
function validarFormulario(event) {
    if (event) event.preventDefault();
    
    let form = document.getElementById('form-registro');
    let nombre = document.getElementById('nombre').value;
    let email = document.getElementById('email').value;
    let pass = document.getElementById('password').value;

    if (!nombre || !email || !pass) {
        mostrarToast('⚠️ Todos los campos son obligatorios');
        return false;
    }
    if (!email.includes('@')) {
        mostrarToast('⚠️ Email inválido');
        return false;
    }
    if (pass.length < 6) {
        mostrarToast('⚠️ La contraseña debe tener mínimo 6 caracteres');
        return false;
    }

    // Enviar datos al PHP
    let formData = new FormData(form);
    fetch('php/registro.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.text())
    .then(data => {
        if (data.includes('correctamente')) {
            mostrarToast('✅ ' + data);
            form.reset();
            mostrarTab('login');
        } else {
            mostrarToast('❌ ' + data);
        }
    })
    .catch(err => {
        console.error(err);
        mostrarToast('❌ Error al conectar con el servidor');
    });

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

// ═══════════════════════════════════════
// NOTIFICACIONES Y SESIÓN
// ═══════════════════════════════════════

// Muestra mensaje en el modal: tipo 'error' o 'exito'
function mostrarMensaje(formulario, tipo, texto) {
    const div = document.getElementById('msg-' + formulario);
    if (!div) return;
    
    div.classList.remove('hidden', 'bg-red-100', 'text-red-600', 'bg-green-100', 'text-green-600');

    if (tipo === 'error') {
        div.classList.add('bg-red-100', 'text-red-600');
    } else {
        div.classList.add('bg-green-100', 'text-green-600');
    }

    div.textContent = texto;
    div.classList.remove('hidden');
}

// Llama esto cuando el login sea exitoso
function loginExitoso(nombre, rol = 'cliente') {
    // Guarda los datos en el navegador
    localStorage.setItem('usuario', nombre);
    localStorage.setItem('rol', rol);

    // Actualiza el header
    const textoUsuario = document.getElementById('texto-usuario');
    const btnLogin = document.getElementById('btn-login');
    
    if (textoUsuario) textoUsuario.textContent = '¡Hola, ' + nombre + '!';
    if (btnLogin) btnLogin.onclick = confirmarCerrarSesion; // Cambia a logout

    // Mostrar botón de ventas si es admin
    if (rol === 'admin') {
        const btnVentas = document.getElementById('btn-ventas');
        if (btnVentas) btnVentas.classList.remove('hidden');
    }

    // Cierra el modal tras un breve retraso
    setTimeout(() => cerrarLogin(), 1000);
}

/**
 * Pregunta al usuario si desea salir antes de borrar la sesión.
 */
function confirmarCerrarSesion() {
    if (confirm('¿Quieres cerrar sesión?')) {
        cerrarSesion();
    }
}

/**
 * Borra los datos del navegador y recarga la página para resetear la UI.
 */
function cerrarSesion() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');
    location.reload();
}

function iniciarSesion(event) {
    if (event) event.preventDefault();

    let form = document.getElementById('form-login');
    let email = document.getElementById('login-email').value;
    let pass  = document.getElementById('login-password').value;

    if (!email || !pass) {
        mostrarToast('⚠️ Completa todos los campos');
        return;
    }

    if (!email.includes('@')) {
        mostrarToast('⚠️ Email inválido');
        return;
    }

    // Enviar datos al PHP
    let formData = new FormData(form);
    fetch('php/login.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === 'success') {
            const nombre = data.message.replace('Bienvenido ', '');
            mostrarMensaje('login', 'exito', '✅ ' + data.message);
            loginExitoso(nombre, data.rol);
        } else {
            mostrarMensaje('login', 'error', '❌ ' + data.message);
        }
    })
    .catch(err => {
        console.error(err);
        mostrarMensaje('login', 'error', '❌ Error de conexión');
    });
}

function mostrarBotonVentas() {
    let rol = localStorage.getItem("rol");

    if (rol === "admin") {
        document.getElementById("btn-ventas").classList.remove("hidden");
    }
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
//  BUSCADOR + SUSCRIPCIÓN + LOGIN (DOMContentLoaded unificado)
// =============================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Sesión Persistente ---
    const nombreGuardado = localStorage.getItem('usuario');
    const rolGuardado = localStorage.getItem('rol');
    
    if (nombreGuardado) {
        const textoUsuario = document.getElementById('texto-usuario');
        const btnLogin = document.getElementById('btn-login');
        if (textoUsuario) textoUsuario.textContent = '¡Hola, ' + nombreGuardado + '!';
        if (btnLogin) btnLogin.onclick = confirmarCerrarSesion;
        
        if (rolGuardado === 'admin') {
            const btnVentas = document.getElementById('btn-ventas');
            if (btnVentas) btnVentas.classList.remove('hidden');
        }
    }

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

    // --- Formulario de Login ---
    const formLogin = document.getElementById('form-login');
    if (formLogin) {
        formLogin.addEventListener('submit', iniciarSesion);
    }

    // --- Formulario de Registro ---
    const formRegistro = document.getElementById('form-registro');
    if (formRegistro) {
        formRegistro.addEventListener('submit', validarFormulario);
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
     // ═══════════════════════════════════════
        // SIDEBAR: toggle categorías
        // ═══════════════════════════════════════
        function toggleCategoria(id) {
            const sub = document.getElementById('sub-' + id);
            const dot = document.getElementById('dot-' + id);
            const estaAbierto = !sub.classList.contains('hidden');

            // Cerrar todos
            document.querySelectorAll('[id^="sub-"]').forEach(el => el.classList.add('hidden'));
            document.querySelectorAll('[id^="dot-"]').forEach(el => {
                el.classList.remove('bg-blue-500');
                el.classList.add('border-gray-300');
                el.classList.remove('border-blue-500');
            });

            if (!estaAbierto) {
                sub.classList.remove('hidden');
                dot.classList.add('bg-blue-500', 'border-blue-500');
                dot.classList.remove('border-gray-300');
            }
        }

        // ═══════════════════════════════════════
        // SIDEBAR: filtrar por subcategoría
        // ═══════════════════════════════════════
        function filtrarSubcategoria(categoria) {
            const productos = document.querySelectorAll('.producto');
            let encontrados = 0;

            productos.forEach(p => {
                const cat = p.getAttribute('data-categoria');
                const visible = cat === categoria;
                p.style.display = visible ? '' : 'none';
                if (visible) encontrados++;
            });

            document.getElementById('sin-resultados').classList.toggle('hidden', encontrados > 0);

            // Actualizar título y breadcrumb
            const nombres = {
                'alimentos': 'Alimentos',
                'alimentos-basicos': 'Alimentos Básicos',
                'cafe-te': 'Café, Té e Infusiones',
                'cereales': 'Cereales',
                'charcuteria': 'Charcutería',
                'enlatados': 'Enlatados',
                'helados': 'Helados',
                'postres': 'Postres',
                'sopas': 'Sopas, Salsas y Aderezos',
                'yogurt': 'Yogurt',
                'bebidas': 'Bebidas',
                'bebidas-liquidas': 'Bebidas Líquidas',
                'bebidas-polvo': 'Bebidas en Polvo',
                'frutas': 'Frutas',
                'verduras': 'Verduras',
                'hierbas': 'Hierbas y Especias',
                'res': 'Res',
                'pollo': 'Pollo',
                'pescado': 'Pescado y Mariscos',
                'cerdo': 'Cerdo',
                'leche': 'Leche',
                'queso': 'Quesos',
                'huevos': 'Huevos',
                'mantequilla': 'Mantequilla y Crema',
                'detergentes': 'Detergentes',
                'desinfectantes': 'Desinfectantes',
                'papel': 'Papel y Servilletas',
                'higiene': 'Higiene',
                'cabello': 'Cabello',
                'skincare': 'Cuidado de la Piel',
            };

            const nombre = nombres[categoria] || categoria;
            document.getElementById('titulo-seccion').textContent = nombre;
            document.getElementById('breadcrumb').innerHTML = `
                <a href="/index.html" class="hover:text-blue-500 transition">Inicio</a>
                <span class="mx-1">/</span>
                <span class="hover:text-blue-500 transition cursor-pointer" onclick="mostrarTodos()">Productos</span>
                <span class="mx-1">/</span>
                <span class="text-blue-500 font-medium">${nombre}</span>
            `;
        }

        function mostrarTodos() {
            document.querySelectorAll('.producto').forEach(p => p.style.display = '');
            document.getElementById('sin-resultados').classList.add('hidden');
            document.getElementById('titulo-seccion').textContent = 'Todos los Productos';
            document.getElementById('breadcrumb').innerHTML = `
                <a href="/index.html" class="hover:text-blue-500 transition">Inicio</a>
                <span class="mx-1">/</span>
                <span class="text-blue-500 font-medium">Todos los Productos</span>
            `;
        }