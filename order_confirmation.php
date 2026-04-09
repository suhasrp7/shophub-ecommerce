<?php
require_once 'includes/config.php';

$pageTitle = 'Order Confirmation';
requireLogin();

if (!isset($_GET['id'])) {
    header('Location: orders.php');
    exit;
}

$conn = connectDB();
$order = getOrderById($conn, (int)$_GET['id'], $_SESSION['user_id']);

if (!$order) {
    header('Location: orders.php');
    exit;
}

$orderItems = getOrderItems($conn, $order['id']);
?>
<?php include 'includes/header.php'; ?>

<div class="container my-4">
    <div class="row justify-content-center">
        <div class="col-lg-8">
            <div class="card shadow-lg">
                <div class="card-header bg-success text-white text-center py-4">
                    <i class="fas fa-check-circle fa-4x mb-3"></i>
                    <h3 class="mb-0">Order Confirmed!</h3>
                </div>
                <div class="card-body p-4">
                    <div class="text-center mb-4">
                        <h5>Thank you for your order!</h5>
                        <p class="text-muted">Order ID: #<?php echo $order['id']; ?></p>
                        <span class="badge bg-<?php 
                            $statusColors = ['pending' => 'warning', 'processing' => 'info', 'shipped' => 'primary', 'delivered' => 'success', 'cancelled' => 'danger'];
                            echo $statusColors[$order['status']];
                        ?> px-3 py-2"><?php echo ucfirst($order['status']); ?></span>
                    </div>

                    <div class="row mb-4">
                        <div class="col-md-6">
                            <h6>Order Details</h6>
                            <hr>
                            <p class="mb-1"><strong>Order Date:</strong> <?php echo date('F j, Y, g:i A', strtotime($order['created_at'])); ?></p>
                            <p class="mb-1"><strong>Payment Method:</strong> <?php echo strtoupper($order['payment_method']); ?></p>
                            <p class="mb-0"><strong>Shipping Address:</strong><br><?php echo nl2br($order['shipping_address']); ?></p>
                        </div>
                        <div class="col-md-6">
                            <h6>Order Summary</h6>
                            <hr>
                            <?php foreach ($orderItems as $item): ?>
                            <div class="d-flex justify-content-between mb-1">
                                <span><?php echo $item['name']; ?> x<?php echo $item['quantity']; ?></span>
                                <span><?php echo formatPrice($item['price'] * $item['quantity']); ?></span>
                            </div>
                            <?php endforeach; ?>
                            <hr>
                            <div class="d-flex justify-content-between">
                                <strong>Total</strong>
                                <strong class="text-primary"><?php echo formatPrice($order['total_price']); ?></strong>
                            </div>
                        </div>
                    </div>

                    <div class="text-center">
                        <a href="orders.php" class="btn btn-outline-primary me-2">View All Orders</a>
                        <a href="index.php" class="btn btn-primary">Continue Shopping</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include 'includes/footer.php'; ?>
