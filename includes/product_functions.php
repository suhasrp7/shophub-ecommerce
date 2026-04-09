<?php

function getAllProducts($conn, $limit = null, $offset = 0) {
    $sql = "SELECT * FROM products ORDER BY created_at DESC";
    if ($limit) {
        $sql .= " LIMIT $limit OFFSET $offset";
    }
    $result = $conn->query($sql);
    return $result->fetch_all(MYSQLI_ASSOC);
}

function getProductsByCategory($conn, $category) {
    $stmt = $conn->prepare("SELECT * FROM products WHERE category = ? ORDER BY created_at DESC");
    $stmt->bind_param("s", $category);
    $stmt->execute();
    return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
}

function getProductById($conn, $id) {
    $stmt = $conn->prepare("SELECT * FROM products WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    return $stmt->get_result()->fetch_assoc();
}

function searchProducts($conn, $query) {
    $search = "%$query%";
    $stmt = $conn->prepare("SELECT * FROM products WHERE name LIKE ? OR description LIKE ? ORDER BY created_at DESC");
    $stmt->bind_param("ss", $search, $search);
    $stmt->execute();
    return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
}

function getFeaturedProducts($conn, $limit = 8) {
    $result = $conn->query("SELECT * FROM products ORDER BY RAND() LIMIT $limit");
    return $result->fetch_all(MYSQLI_ASSOC);
}

function getCategories($conn) {
    $result = $conn->query("SELECT DISTINCT category FROM products ORDER BY category");
    return $result->fetch_all(MYSQLI_ASSOC);
}

function addProduct($conn, $name, $description, $price, $image, $category, $stock) {
    $stmt = $conn->prepare("INSERT INTO products (name, description, price, image, category, stock) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssdssi", $name, $description, $price, $image, $category, $stock);
    return $stmt->execute();
}

function updateProduct($conn, $id, $name, $description, $price, $image, $category, $stock) {
    $stmt = $conn->prepare("UPDATE products SET name = ?, description = ?, price = ?, image = ?, category = ?, stock = ? WHERE id = ?");
    $stmt->bind_param("ssdssii", $name, $description, $price, $image, $category, $stock, $id);
    return $stmt->execute();
}

function deleteProduct($conn, $id) {
    $stmt = $conn->prepare("DELETE FROM products WHERE id = ?");
    $stmt->bind_param("i", $id);
    return $stmt->execute();
}

function updateStock($conn, $productId, $quantity) {
    $stmt = $conn->prepare("UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?");
    $stmt->bind_param("iii", $quantity, $productId, $quantity);
    return $stmt->execute();
}

function getTotalProducts($conn) {
    $result = $conn->query("SELECT COUNT(*) as total FROM products");
    return $result->fetch_assoc()['total'];
}
?>
