<?php
session_start();
require_once 'db.php';

// 1. VERIFICAR que el usuario esté logueado
if (!isset($_SESSION['id_usuario'])) {
    die("No autorizado");
}

// 2. RECIBIR los datos JSON
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !is_array($data)) {
    die("No hay datos de venta");
}

try {
    // 3. CALCULAR total y validar cada producto
    $total = 0;
    foreach ($data as $producto) {
        $cantidad = (int)$producto['cantidad'];
        $precio   = (float)$producto['precio'];

        if ($cantidad <= 0 || $precio <= 0) {
            die("Datos de producto inválidos");
        }

        $total += $precio * $cantidad;
    }

    // 4. INSERTAR la venta con id_usuario de la sesión
    $id_usuario = $_SESSION['id_usuario'];
    $stmt = $pdo->prepare("INSERT INTO ventas (id_usuario, total) VALUES (?, ?)");
    $stmt->execute([$id_usuario, $total]);

    // 5. OBTENER el id de la venta recién insertada
    $id_venta = $pdo->lastInsertId();

    // 6. INSERTAR el detalle de cada producto
    $stmt_detalle = $pdo->prepare("INSERT INTO ventas_detalle 
        (id_venta, id_producto, cantidad, precio_unitario, subtotal) 
        VALUES (?, ?, ?, ?, ?)");

    foreach ($data as $producto) {
        $id_producto    = (int)$producto['id_producto'];
        $cantidad       = (int)$producto['cantidad'];
        $precio_unitario = (float)$producto['precio'];
        $subtotal       = $cantidad * $precio_unitario;

        // Verificar que el producto existe en la BD
        $check = $pdo->prepare("SELECT id_producto FROM productos WHERE id_producto = ?");
        $check->execute([$id_producto]);
        if (!$check->fetch()) {
            die("El producto con id $id_producto no existe");
        }

        $stmt_detalle->execute([
            $id_venta,
            $id_producto,
            $cantidad,
            $precio_unitario,
            $subtotal
        ]);
    }

    echo json_encode([
        "mensaje" => "Venta guardada correctamente ✅",
        "id_venta" => $id_venta,
        "total"    => $total
    ]);

} catch (PDOException $e) {
    die("Error al guardar la venta: " . $e->getMessage());
}
?>