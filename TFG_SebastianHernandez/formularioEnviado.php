<?php
$nombre = $_POST['nombre'];
$email = $_POST['email'];
$problema = $_POST['problema'];
$motivo = $_POST['motivo'];

$response = [
    'success' => true,
    'message' => 'Formulario enviado'
];

echo json_encode($response);
?>