<?php
require_once 'db.php';

$id_venta = (int)($_POST['id'] ?? 0);
$total = (float)($_POST['total'] ?? 0);

if ($id_venta <= 0) {
    die("ID de venta inválido");
}

try {
    $stmt = $pdo->prepare("UPDATE ventas SET total = ? WHERE id_venta = ?");
    
    if ($stmt->execute([$total, $id_venta])) {
        if ($stmt->rowCount() > 0) {
            echo "Venta actualizada correctamente.";
        } else {
            echo "No se encontró la venta o el valor es el mismo.";
        }
    } else {
        echo "Error al actualizar la venta.";
    }
} catch (PDOException $e) {
    error_log("Error en actualizar_venta.php: " . $e->getMessage());
    echo "Error interno al actualizar la venta.";
}
?>
