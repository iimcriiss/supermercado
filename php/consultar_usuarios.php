<?php
$conn = new mysqli("localhost", "root", "", "tienda");

$result = $conn->query("SELECT * FROM usuarios");

while ($row = $result->fetch_assoc()) {
    echo "Nombre: " . $row['nombre'] . " - Email: " . $row['email'] . "<br>";
}
?>