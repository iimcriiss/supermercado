<?php
$conn = new mysqli("localhost", "root", "", "tienda");

$id = $_GET['id'];

$conn->query("DELETE FROM ventas_detalle WHERE id_venta = $id");
$conn->query("DELETE FROM ventas WHERE id = $id");

echo "Venta eliminada";
?>