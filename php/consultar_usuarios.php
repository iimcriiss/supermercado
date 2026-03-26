<?php
require_once 'db.php';

try {
    $stmt = $pdo->prepare("
        SELECT 
            u.id_usuario, 
            u.nombre, 
            u.apellido, 
            u.email, 
            u.telefono, 
            u.activo,
            r.nombre_rol 
        FROM usuarios u
        JOIN roles r ON u.id_rol = r.id_rol
    ");
    $stmt->execute();
    $usuarios = $stmt->fetchAll();

    if ($usuarios) {
        foreach ($usuarios as $row) {
            $estado = $row['activo'] ? 'Activo' : 'Inactivo';
            echo "ID: " . (int)$row['id_usuario'] . " - ";
            echo "Nombre: " . htmlspecialchars($row['nombre'] . " " . $row['apellido']) . " - ";
            echo "Email: " . htmlspecialchars($row['email']) . " - ";
            echo "Rol: " . htmlspecialchars($row['nombre_rol']) . " - ";
            echo "Estado: " . $estado . " - ";
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