<?php
session_start();
require_once 'db.php';

// 1. VERIFICAR que el usuario esté logueado
if (!isset($_SESSION['id_usuario'])) {
    die("No autorizado");
}

// 2. VALIDAR que el id llegue y sea numérico
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    die("ID de venta inválido");
}

$id_venta = (int)$_GET['id'];

try {
    // 3. VERIFICAR que la venta existe
    $stmt = $pdo->prepare("SELECT id_venta FROM ventas WHERE id_venta = ?");
    $stmt->execute([$id_venta]);
    if (!$stmt->fetch()) {
        die("La venta no existe");
    }

    // 4. ELIMINAR la venta
    // ventas_detalle se elimina automáticamente por el CASCADE de la BD
    $stmt = $pdo->prepare("DELETE FROM ventas WHERE id_venta = ?");
    $stmt->execute([$id_venta]);

    echo json_encode([
        "mensaje"  => "Venta eliminada correctamente ✅",
        "id_venta" => $id_venta
    ]);

} catch (PDOException $e) {
    die("Error al eliminar la venta: " . $e->getMessage());
}
?>