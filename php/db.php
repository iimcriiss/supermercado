<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "supermercado";


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
echo "conexion exitosa";
$conn->set_charset("utf8mb4");
?>
?>