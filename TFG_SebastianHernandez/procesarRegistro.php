<?php
$host = "localhost";
$db_nombre = "aplicacion_web";
$usuario = "root";
$contrasena_db = ""; 

$conn = new mysqli($host, $usuario, $contrasena_db, $db_nombre);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

$nombre = $conn->real_escape_string($_POST['nombre']);
$correo = $conn->real_escape_string($_POST['correo']);
$contrasena = $_POST['contrasena'];
$preferencias = isset($_POST['preferencias']) ? implode(",", $_POST['preferencias']) : "";

if (empty($nombre) || empty($correo) || empty($contrasena)) {
    die("Todos los campos son obligatorios.");
}

if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    die("Correo electrónico no válido.");
}

$contrasena_cifrada = password_hash($contrasena, PASSWORD_DEFAULT);

$sql = "INSERT INTO usuarios (nombre, correo, contrasena, preferencias) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $nombre, $correo, $contrasena_cifrada, $preferencias);

if ($stmt->execute()) {
    echo "Registro exitoso. <a href='iniciosesion.html'>Iniciar sesión</a>";
} else {
    echo "Error al registrar: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>