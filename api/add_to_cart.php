<?php
header('Content-Type: application/json');
require_once '../includes/config.php';

if (!isLoggedIn()) {
    echo json_encode(['success' => false, 'message' => 'Please login first', 'redirect' => '../login.php']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $conn = connectDB();
    $productId = (int)$_POST['product_id'];
    $quantity = max(1, (int)$_POST['quantity']);
    
    if (addToCart($conn, $_SESSION['user_id'], $productId, $quantity)) {
        $cartCount = getCartCount($conn, $_SESSION['user_id']);
        echo json_encode(['success' => true, 'message' => 'Added to cart', 'cart_count' => $cartCount]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to add to cart']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
}
?>
