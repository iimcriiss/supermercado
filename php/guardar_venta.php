<?php
$conn = new mysqli("localhost", "root", "", "tienda");

$data = json_decode(file_get_contents("php://input"), true);

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
    $stmt_detalle->bind_param("isid", $id_venta, $producto['nombre'], $producto['cantidad'], $producto['precio']);
    $stmt_detalle->execute();
}

echo "Venta guardada correctamente";
?>