<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'ecommerce_db');

define('SITE_NAME', 'ShopHub');
define('SITE_URL', 'http://localhost/php-internship-project/ecommerce');

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

function connectDB() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME, 3307);
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    return $conn;
}

function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

function isAdmin() {
    return isset($_SESSION['user_role']) && $_SESSION['user_role'] === 'admin';
}

function requireLogin() {
    if (!isLoggedIn()) {
        header('Location: ' . SITE_URL . '/login.php');
        exit;
    }
}

function requireAdmin() {
    if (!isAdmin()) {
        header('Location: ' . SITE_URL);
        exit;
    }
}

function sanitize($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

function formatPrice($price, $currency = 'INR') {
    $symbols = ['USD' => '$', 'EUR' => '€', 'GBP' => '£', 'INR' => '₹', 'JPY' => '¥'];
    $rates = ['USD' => 1, 'EUR' => 0.92, 'GBP' => 0.79, 'INR' => 83.12, 'JPY' => 149.50];
    $symbol = $symbols[$currency] ?? '₹';
    $rate = $rates[$currency] ?? 83.12;
    return $symbol . number_format($price * $rate, 2);
}

function formatPriceINR($price) {
    return '₹' . number_format($price * 83.12, 2);
}

function formatPriceAll($price) {
    return '<span class="price-usd">$' . number_format($price, 2) . ' USD</span> | ' .
           '<span class="price-eur">€' . number_format($price * 0.92, 2) . ' EUR</span> | ' .
           '<span class="price-inr">₹' . number_format($price * 83.12, 2) . ' INR</span>';
}

require_once __DIR__ . '/product_functions.php';
require_once __DIR__ . '/user_functions.php';
require_once __DIR__ . '/cart_functions.php';
require_once __DIR__ . '/order_functions.php';
?>
