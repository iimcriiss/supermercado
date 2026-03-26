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