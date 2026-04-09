<?php
require_once '../includes/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['order_id']) && isset($_POST['status'])) {
    requireAdmin();
    $conn = connectDB();
    
    if (updateOrderStatus($conn, (int)$_POST['order_id'], sanitize($_POST['status']))) {
        $_SESSION['success'] = 'Order status updated.';
    } else {
        $_SESSION['error'] = 'Failed to update order status.';
    }
}

header('Location: orders.php');
exit;
?>
