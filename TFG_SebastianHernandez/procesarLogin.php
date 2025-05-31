<?php
session_start();
$host = "localhost";
$db_nombre = "aplicacion_web";
$usuario = "root";
$contrasena_db = "";

$conn = new mysqli($host, $usuario, $contrasena_db, $db_nombre);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

$correo = $conn->real_escape_string($_POST['correo']);
$contrasena = $_POST['contrasena'];

$sql = "SELECT * FROM usuarios WHERE correo = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $correo);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    $usuario = $resultado->fetch_assoc();

    if (password_verify($contrasena, $usuario['contrasena'])) {
        $_SESSION['nombre'] = $usuario['nombre'];
        $_SESSION['correo'] = $usuario['correo'];
        $_SESSION['preferencias'] = $usuario['preferencias'];

        header("Location: Home.html");
        exit();
    } else {
        echo "<p>Contraseña incorrecta.</p>";
        echo "<a href='inicioSesion.html'>Volver a intentar</a>";
    }
} else {
    echo "<p>No se encontró un usuario con ese correo.</p>";
    echo "<a href='inicioSesion.html'>Volver a intentar</a>";
}

$stmt->close();
$conn->close();
?>