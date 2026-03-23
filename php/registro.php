<?php
require_once 'db.php';

$nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_SPECIAL_CHARS);
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$password_plano = $_POST['password'] ?? '';

if (!$nombre || !$email || !$password_plain) {
    die("Datos inválidos");
}

$password_hashed = password_hash($password_plano, PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $nombre, $email, $password_hashed);

if ($stmt->execute()) {
    echo "Usuario registrado correctamente";
} else {
    echo "Error al registrar";
}

$stmt->close();
$conn->close();
?>