<?php

function createOrder($conn, $userId, $totalPrice, $shippingAddress, $paymentMethod = 'cod') {
    $stmt = $conn->prepare("INSERT INTO orders (user_id, total_price, shipping_address, payment_method) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("idss", $userId, $totalPrice, $shippingAddress, $paymentMethod);
    
    if ($stmt->execute()) {
        return $conn->insert_id;
    }
    return false;
}

function addOrderItem($conn, $orderId, $productId, $quantity, $price) {
    $stmt = $conn->prepare("INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("iiid", $orderId, $productId, $quantity, $price);
    return $stmt->execute();
}

function getOrders($conn, $userId = null) {
    if ($userId) {
        $stmt = $conn->prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC");
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    } else {
        $result = $conn->query("SELECT o.*, u.name as user_name, u.email as user_email 
                                FROM orders o 
                                JOIN users u ON o.user_id = u.id 
                                ORDER BY o.created_at DESC");
        return $result->fetch_all(MYSQLI_ASSOC);
    }
}

function getOrderById($conn, $orderId, $userId = null) {
    if ($userId) {
        $stmt = $conn->prepare("SELECT * FROM orders WHERE id = ? AND user_id = ?");
        $stmt->bind_param("ii", $orderId, $userId);
    } else {
        $stmt = $conn->prepare("SELECT * FROM orders WHERE id = ?");
        $stmt->bind_param("i", $orderId);
    }
    $stmt->execute();
    return $stmt->get_result()->fetch_assoc();
}

function getOrderItems($conn, $orderId) {
    $stmt = $conn->prepare("
        SELECT oi.*, p.name, p.image 
        FROM order_items oi 
        JOIN products p ON oi.product_id = p.id 
        WHERE oi.order_id = ?
    ");
    $stmt->bind_param("i", $orderId);
    $stmt->execute();
    return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
}

function updateOrderStatus($conn, $orderId, $status) {
    $stmt = $conn->prepare("UPDATE orders SET status = ? WHERE id = ?");
    $stmt->bind_param("si", $status, $orderId);
    return $stmt->execute();
}

function getTotalOrders($conn) {
    $result = $conn->query("SELECT COUNT(*) as total FROM orders");
    return $result->fetch_assoc()['total'];
}

function getTotalRevenue($conn) {
    $result = $conn->query("SELECT SUM(total_price) as revenue FROM orders WHERE status != 'cancelled'");
    return $result->fetch_assoc()['revenue'] ?? 0;
}

function getPendingOrders($conn) {
    $result = $conn->query("SELECT COUNT(*) as pending FROM orders WHERE status = 'pending'");
    return $result->fetch_assoc()['pending'];
}

function getRecentOrders($conn, $limit = 10) {
    $result = $conn->query("SELECT o.*, u.name as user_name 
                            FROM orders o 
                            JOIN users u ON o.user_id = u.id 
                            ORDER BY o.created_at DESC 
                            LIMIT $limit");
    return $result->fetch_all(MYSQLI_ASSOC);
}
?>
