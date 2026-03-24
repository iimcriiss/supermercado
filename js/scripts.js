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

    let slideActual = 0;
    const totalSlides = 3;

    function actualizarSlider() {
        const slider = document.getElementById('slider');
        slider.style.transform = `translateX(-${slideActual * 100}%)`;

        // Actualizar puntos
        for (let i = 0; i < totalSlides; i++) {
            const punto = document.getElementById(`punto-${i}`);
            punto.classList.toggle('opacity-50', i !== slideActual);
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

    // Avanza automáticamente cada 4 segundos
    setInterval(() => cambiarSlide(1), 4000);
