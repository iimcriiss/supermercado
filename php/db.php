<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "supermercado";

try {
    $pdo = new PDO ("mysql:host=$servername;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    echo "Conexion exitosa ✅";
} catch(PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}
?>