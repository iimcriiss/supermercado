<?php
$conn = new mysqli("localhost", "root", "", "tienda");

$id = $_POST['id'];
$total = $_POST['total'];

$stmt = $conn->prepare("UPDATE ventas SET total=? WHERE id=?");
$stmt->bind_param("di", $total, $id);

if ($stmt->execute()) {
    echo "Venta actualizada";
} else {
    echo "Error";
}
?>
