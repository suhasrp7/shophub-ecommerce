<?php
require_once '../includes/config.php';
requireAdmin();

if (!isset($_GET['id']) || empty($_GET['id'])) {
    header('Location: products.php');
    exit;
}

$conn = connectDB();

if (deleteProduct($conn, (int)$_GET['id'])) {
    $_SESSION['success'] = 'Product deleted successfully.';
} else {
    $_SESSION['error'] = 'Failed to delete product.';
}

header('Location: products.php');
exit;
?>
