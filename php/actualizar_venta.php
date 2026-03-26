<?php
require_once 'db.php';

$id_venta = (int)($_POST['id'] ?? 0);
$total = isset($_POST['total']) ? (float)$_POST['total'] : null;
$estado = $_POST['estado'] ?? null;

if ($id_venta <= 0) {
    die("ID de venta inválido");
}

try {
    $campos = [];
    $params = [];

    if ($total !== null) {
        $campos[] = "total = ?";
        $params[] = $total;
    }

    if ($estado !== null) {
        $allowed_estados = ['pendiente', 'completada', 'cancelada'];
        if (in_array($estado, $allowed_estados)) {
            $campos[] = "estado = ?";
            $params[] = $estado;
        }
    }

    if (empty($campos)) {
        die("No hay campos para actualizar");
    }

    $params[] = $id_venta;
    $sql = "UPDATE ventas SET " . implode(", ", $campos) . " WHERE id_venta = ?";
    $stmt = $pdo->prepare($sql);
    
    if ($stmt->execute($params)) {
        if ($stmt->rowCount() > 0) {
            echo "Venta actualizada correctamente.";
        } else {
            echo "No se encontró la venta o los valores son los mismos.";
        }
    } else {
        echo "Error al actualizar la venta.";
    }
} catch (PDOException $e) {
    error_log("Error en actualizar_venta.php: " . $e->getMessage());
    echo "Error interno al actualizar la venta.";
}
?>
