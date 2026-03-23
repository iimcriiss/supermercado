<?php
$conn = new mysqli("localhost", "root", "", "tienda");

if ($conn->connect_error) {
    die("Error de conexión");
}

$nombre = htmlspecialchars($_POST['nombre']);
$email = htmlspecialchars($_POST['email']);
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $nombre, $email, $password);

if ($stmt->execute()) {
    echo "Usuario registrado correctamente";
} else {
    echo "Error al registrar";
}

$stmt->close();
$conn->close();
?>