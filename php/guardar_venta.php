<?php
require_once 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    die("No hay datos de venta");
}

$total = 0;
foreach ($data as $producto) {
    $total += $producto['precio'] * $producto['cantidad'];
}


$stmt = $conn->prepare("INSERT INTO ventas (total) VALUES (?)");
$stmt->bind_param("d", $total);
$stmt->execute();

$id_venta = $conn->insert_id;

$stmt_detalle = $conn->prepare("INSERT INTO ventas_detalle (id_venta, producto, cantidad, precio) VALUES (?, ?, ?, ?)");

foreach ($data as $producto) {
    $p_nombre = filter_var($producto['nombre'], FILTER_SANITIZE_SPECIAL_CHARS);
    $p_cantidad = (int)$producto['cantidad'];
    $p_precio = (float)$producto['precio'];
    $stmt_detalle->bind_param("isid", $id_venta, $p_nombre, $p_cantidad, $p_precio);
    $stmt_detalle->execute();
}

echo "Venta guardada correctamente";

$stmt->close();
$stmt_detalle->close();
$conn->close();
?>