<?php
session_start();
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // 1. SANITIZACIÓN - limpiar los datos
    $nombre   = filter_var($_POST['nombre'],   FILTER_SANITIZE_SPECIAL_CHARS);
    $apellido = filter_var($_POST['apellido'], FILTER_SANITIZE_SPECIAL_CHARS);
    $email    = filter_var($_POST['email'],    FILTER_SANITIZE_EMAIL);
    $telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_NUMBER_INT);
    $password_plano = $_POST['password'] ?? '';

    // 2. VALIDACIÓN - verificar que no estén vacíos
    if (!$nombre || !$apellido || !$email || !$password_plano) {
        die("Datos inválidos, todos los campos son obligatorios");
    }

    // 3. VALIDAR formato de email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("El email no tiene un formato válido");
    }

    // 4. VERIFICAR si el email ya existe en la BD
    $stmt = $pdo->prepare("SELECT id_usuario FROM usuarios WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        die("El email ya está registrado");
    }

    // 5. HASHEAR la contraseña (nunca guardar texto plano)
    $password_hashed = password_hash($password_plano, PASSWORD_DEFAULT);

    // 6. INSERTAR en la BD con PDO
    $stmt = $pdo->prepare("INSERT INTO usuarios 
        (nombre, apellido, email, telefono, contraseña) 
        VALUES (?, ?, ?, ?, ?)");

    if ($stmt->execute([$nombre, $apellido, $email, $telefono, $password_hashed])) {
        echo "Usuario registrado correctamente ✅";
    } else {
        echo "Error al registrar ❌";
    }
}
?>