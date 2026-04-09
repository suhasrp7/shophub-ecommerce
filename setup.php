<?php
require_once 'includes/config.php';

$conn = connectDB();

$adminEmail = 'admin@ecommerce.com';
$adminPassword = 'admin123';
$hashedPassword = password_hash($adminPassword, PASSWORD_DEFAULT);

$stmt = $conn->prepare("UPDATE users SET password = ? WHERE email = ?");
$stmt->bind_param("ss", $hashedPassword, $adminEmail);

if ($stmt->execute()) {
    echo "Admin password reset successfully!\n";
    echo "Email: $adminEmail\n";
    echo "Password: $adminPassword\n";
} else {
    echo "Failed to reset password.\n";
}
?>
