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
