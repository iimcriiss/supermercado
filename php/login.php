<?php
session_start();
require_once 'db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'] ?? '';

    if (!$email || !$password) {
        echo json_encode(["status" => "error", "message" => "Email y contraseña son obligatorios"]);
        exit;
    }

    try {
        // Consultar usuario con su rol
        $stmt = $pdo->prepare("
            SELECT u.id_usuario, u.nombre, u.contraseña, r.nombre_rol 
            FROM usuarios u 
            JOIN roles r ON u.id_rol = r.id_rol 
            WHERE u.email = ? AND u.activo = 1
        ");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['contraseña'])) {
            // Guardar en sesión
            $_SESSION['id_usuario'] = $user['id_usuario'];
            $_SESSION['nombre']     = $user['nombre'];
            $_SESSION['rol']        = $user['nombre_rol'];

            echo json_encode([
                "status" => "success",
                "message" => "Bienvenido " . $user['nombre'],
                "rol" => $user['nombre_rol']
            ]);
        } else {
            echo json_encode(["status" => "error", "message" => "Credenciales incorrectas"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Error en el servidor: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
}
?>
