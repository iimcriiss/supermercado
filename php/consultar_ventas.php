<?php
session_start();
require_once 'db.php';

// 1. VERIFICAR que el usuario esté logueado
if (!isset($_SESSION['id_usuario'])) {
    die("No autorizado");
}

try {
    // 2. CONSULTA corregida con los campos reales de la BD
    $stmt = $pdo->prepare("
        SELECT 
            v.id_venta,
            v.fecha,
            v.total,
            u.nombre        AS nombre_usuario,
            u.apellido      AS apellido_usuario,
            p.nombre        AS nombre_producto,
            p.categoria,
            d.cantidad,
            d.precio_unitario,
            d.subtotal
        FROM ventas v
        JOIN usuarios u        ON v.id_usuario   = u.id_usuario
        JOIN ventas_detalle d  ON v.id_venta      = d.id_venta
        JOIN productos p       ON d.id_producto   = p.id_producto
        ORDER BY v.fecha DESC
    ");

    $stmt->execute();
    $ventas = $stmt->fetchAll();

    // 3. MOSTRAR los resultados
    if (!$ventas) {
        echo "No hay ventas registradas";
    } else {
        foreach ($ventas as $row) {
            echo "Venta #"    . $row['id_venta']        . " | ";
            echo "Cliente: "  . $row['nombre_usuario']  . " " . $row['apellido_usuario'] . " | ";
            echo "Producto: " . $row['nombre_producto'] . " | ";
            echo "Categoría: ". $row['categoria']       . " | ";
            echo "Cantidad: " . $row['cantidad']         . " | ";
            echo "Precio: $"  . $row['precio_unitario'] . " | ";
            echo "Subtotal: $". $row['subtotal']         . " | ";
            echo "Total: $"   . $row['total']            . " | ";
            echo "Fecha: "    . $row['fecha']            . "<br>";
        }
    }

} catch (PDOException $e) {
    die("Error al obtener las ventas: " . $e->getMessage());
}
?>

