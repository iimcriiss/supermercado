<<<<<<< HEAD
<?php
session_start();
require_once 'db.php';

// 1. VERIFICAR sesión (Importante: Cristopher, asegúrate que al loguear guardas el id_usuario)
if (!isset($_SESSION['id_usuario'])) {
    http_response_code(401);
    echo json_encode(["error" => "No autorizado. Por favor inicia sesión."]);
    exit;
}

// 2. RECIBIR los datos JSON
$json = file_get_contents("php://input");
$data = json_decode($json, true);

// Validamos que la estructura contenga la lista de productos
if (!$data || !isset($data['productos']) || !is_array($data['productos'])) {
    echo json_encode(["error" => "No hay productos en el carrito"]);
    exit;
}

try {
    // Iniciamos una transacción para que si algo falla, no se guarde media venta
    $pdo->beginTransaction();

    // 3. INSERTAR la cabecera de la venta
    // Usamos el total que viene del JS o lo recalculamos por seguridad
    $total_venta = (float)$data['total']; 
    $id_usuario = $_SESSION['id_usuario'];

    $stmt = $pdo->prepare("INSERT INTO ventas (id_usuario, total, fecha) VALUES (?, ?, NOW())");
    $stmt->execute([$id_usuario, $total_venta]);

    $id_venta = $pdo->lastInsertId();

    // 4. PREPARAR inserción de detalles
    $stmt_detalle = $pdo->prepare("INSERT INTO ventas_detalle 
        (id_venta, id_producto, cantidad, precio_unitario, subtotal) 
        VALUES (?, ?, ?, ?, ?)");

    foreach ($data['productos'] as $prod) {
        // Nota: Asegúrate que tu JS envíe 'id', 'cantidad' y 'precio'
        $id_prod  = (int)$prod['id'];
        $cant     = (int)$prod['cantidad'];
        $precio   = (float)$prod['precio_unitario'];
        $subtotal = $cant * $precio;

        // Validación rápida de existencia
        $check = $pdo->prepare("SELECT id_producto FROM productos WHERE id_producto = ?");
        $check->execute([$id_prod]);
        if (!$check->fetch()) {
            throw new Exception("El producto con ID $id_prod no existe en la base de datos.");
        }

        $stmt_detalle->execute([
            $id_venta,
            $id_prod,
            $cant,
            $precio,
            $subtotal
        ]);
    }

    // Si todo llegó hasta aquí, guardamos los cambios definitivamente
    $pdo->commit();

    echo json_encode([
        "status" => "success",
        "mensaje" => "¡Venta de MercaBlue guardada con éxito! ✅",
        "id_venta" => $id_venta
    ]);

} catch (Exception $e) {
    // Si algo falla, deshacemos todo lo anterior
    if ($pdo->inTransaction()) $pdo->rollBack();
    
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "error" => $e->getMessage()
    ]);
}
?>
=======
<?php
session_start();
require_once 'db.php';

header('Content-Type: application/json');

// 1. VERIFICAR que el usuario esté logueado
if (!isset($_SESSION['id_usuario'])) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "No autorizado. Inicie sesión para comprar."]);
    exit;
}

// 2. RECIBIR los datos JSON
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !is_array($data)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "No hay datos de venta"]);
    exit;
}

try {
    // Iniciar transacción para asegurar que todo se guarde bien
    $pdo->beginTransaction();

    // 3. CALCULAR total y validar cada producto
    $total = 0;
    $id_usuario = $_SESSION['id_usuario'];

    // 4. INSERTAR el encabezado de la venta
    $stmt_venta = $pdo->prepare("INSERT INTO ventas (id_usuario, total, estado) VALUES (?, ?, 'completada')");
    $stmt_venta->execute([$id_usuario, 0]); // Total temporal
    $id_venta = $pdo->lastInsertId();

    // Preparar consultas para el detalle y actualización de stock
    $stmt_detalle = $pdo->prepare("INSERT INTO ventas_detalle 
        (id_venta, id_producto, cantidad, precio_unitario, subtotal) 
        VALUES (?, ?, ?, ?, ?)");
    
    $stmt_update_stock = $pdo->prepare("UPDATE productos SET stock = stock - ? WHERE id_producto = ?");

    foreach ($data as $item) {
        $nombre   = $item['nombre'];
        $cantidad = (int)$item['cantidad'];
        $precio   = (float)$item['precio'];

        if ($cantidad <= 0 || $precio <= 0) {
            throw new Exception("Datos de producto inválidos para: $nombre");
        }

        // Buscar producto por nombre (ya que el frontend envía nombres)
        $stmt_prod = $pdo->prepare("SELECT id_producto, stock FROM productos WHERE nombre = ? AND activo = 1");
        $stmt_prod->execute([$nombre]);
        $producto_db = $stmt_prod->fetch();

        if (!$producto_db) {
            throw new Exception("El producto '$nombre' no existe en nuestro catálogo.");
        }

        if ($producto_db['stock'] < $cantidad) {
            throw new Exception("Stock insuficiente para: $nombre (Disponible: " . $producto_db['stock'] . ")");
        }

        $id_producto = $producto_db['id_producto'];
        $subtotal = $cantidad * $precio;
        $total += $subtotal;

        // Insertar detalle
        $stmt_detalle->execute([
            $id_venta,
            $id_producto,
            $cantidad,
            $precio,
            $subtotal
        ]);

        // Actualizar stock
        $stmt_update_stock->execute([$cantidad, $id_producto]);
    }

    // 5. Actualizar el total final de la venta
    $stmt_update_total = $pdo->prepare("UPDATE ventas SET total = ? WHERE id_venta = ?");
    $stmt_update_total->execute([$total, $id_venta]);

    // Confirmar todo
    $pdo->commit();

    echo json_encode([
        "status" => "success",
        "message" => "¡Compra realizada con éxito! ✅ Su pedido se ha registrado correctamente.",
        "id_venta" => $id_venta,
        "total"    => $total
    ]);

} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Error al procesar la compra: " . $e->getMessage()]);
}
?>
>>>>>>> 8d0daa9cebce7fc97acb8ea66ec4e3b198631dde
