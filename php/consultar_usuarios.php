<?php
require_once 'db.php';

try {
    $stmt = $pdo->prepare("SELECT id_usuario, nombre, apellido, email, telefono FROM usuarios");
    $stmt->execute();
    $usuarios = $stmt->fetchAll();

    if ($usuarios) {
        foreach ($usuarios as $row) {
            echo "ID: " . (int)$row['id_usuario'] . " - ";
            echo "Nombre: " . htmlspecialchars($row['nombre'] . " " . $row['apellido']) . " - ";
            echo "Email: " . htmlspecialchars($row['email']) . " - ";
            echo "Teléfono: " . htmlspecialchars($row['telefono'] ?? 'N/A') . "<br>";
        }
    } else {
        echo "No se encontraron usuarios.";
    }
} catch (PDOException $e) {
    error_log("Error en consultar_usuarios.php: " . $e->getMessage());
    echo "Error al consultar los usuarios.";
}
?>