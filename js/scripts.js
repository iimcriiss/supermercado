let carrito = [];

// AGREGAR PRODUCTO
function agregarAlCarrito(nombre, precio) {
    let producto = carrito.find(p => p.nombre === nombre);

    if (producto) {
        producto.cantidad++;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    mostrarCarrito();
}

// MOSTRAR CARRITO
function mostrarCarrito() {
    let lista = document.getElementById("lista-carrito");
    let total = 0;

    lista.innerHTML = "";

    carrito.forEach((producto, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            ${producto.nombre} x${producto.cantidad} - $${producto.precio * producto.cantidad}
            <button onclick="eliminarProducto(${index})">❌</button>
            <button onclick="sumarCantidad(${index})">➕</button>
            <button onclick="restarCantidad(${index})">➖</button>
        `;

        lista.appendChild(li);

        total += producto.precio * producto.cantidad;
    });

    document.getElementById("total").textContent = total;
}

// ELIMINAR PRODUCTO
function eliminarProducto(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
}

// SUMAR CANTIDAD
function sumarCantidad(index) {
    carrito[index].cantidad++;
    mostrarCarrito();
}

// RESTAR CANTIDAD
function restarCantidad(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
    } else {
        eliminarProducto(index);
    }
    mostrarCarrito();
}

// CONFIRMAR COMPRA
function confirmarCompra() {
    if (carrito.length === 0) {
        alert("Carrito vacío");
        return;
    }

    fetch("php/guardar_venta.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(carrito)
    })
    .then(res => res.text())
    .then(data => {
        alert(data);
        carrito = [];
        mostrarCarrito();
    });
}

// BUSCADOR EN TIEMPO REAL
function buscarProducto() {
    let input = document.getElementById("buscador").value.toLowerCase();
    let productos = document.querySelectorAll(".producto");

    productos.forEach(p => {
        let nombre = p.getAttribute("data-nombre").toLowerCase();

        if (nombre.includes(input)) {
            p.style.display = "block";
        } else {
            p.style.display = "none";
        }
    });
}

// FILTRO POR CATEGORIA
function filtrarCategoria(categoria) {
    let productos = document.querySelectorAll(".producto");

    productos.forEach(p => {
        if (categoria === "todos" || p.getAttribute("data-categoria") === categoria) {
            p.style.display = "block";
        } else {
            p.style.display = "none";
        }
    });
}

// FILTRO POR PRECIO
function filtrarPrecio(maxPrecio) {
    let productos = document.querySelectorAll(".producto");

    productos.forEach(p => {
        let precio = parseFloat(p.getAttribute("data-precio"));

        if (precio <= maxPrecio) {
            p.style.display = "block";
        } else {
            p.style.display = "none";
        }
    });
}

// VALIDACION FORMULARIO
function validarFormulario() {
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;

    if (nombre === "" || email === "" || pass === "") {
        alert("Todos los campos son obligatorios");
        return false;
    }

    if (!email.includes("@")) {
        alert("Email inválido");
        return false;
    }

    if (pass.length < 6) {
        alert("Contraseña mínimo 6 caracteres");
        return false;
    }

    alert("Registro exitoso");
    return true;
}
// =============================================
//  BUSCADOR
// =============================================

document.addEventListener('DOMContentLoaded', () => {
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
});

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

// Leer parámetro de búsqueda al cargar productos.html
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const termino = params.get('buscar');
    if (termino) {
        const input = document.querySelector('input[placeholder="Busca tu producto aquí..."]');
        if (input) input.value = termino;
        filtrarProductosEnPagina(termino);
    }
});


// =============================================
//  SUSCRIPCIÓN POR CORREO (footer)
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    const formSub = document.querySelector('footer form');
    if (!formSub) return;

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
});

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