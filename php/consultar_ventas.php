<?php
$conn = new mysqli("localhost", "root", "", "tienda");

$sql = "SELECT v.id, v.total, v.fecha, d.producto, d.cantidad, d.precio
        FROM ventas v
        JOIN ventas_detalle d ON v.id = d.id_venta";

$result = $conn->query($sql);

while ($row = $result->fetch_assoc()) {
    echo "Venta #" . $row['id'] . " - " . $row['producto'] . 
         " x" . $row['cantidad'] . " - $" . $row['precio'] . "<br>";
}
?>