<?php
require_once '../includes/config.php';

if (!isset($_GET['id'])) {
    header('Location: orders.php');
    exit;
}

$conn = connectDB();
$order = getOrderById($conn, (int)$_GET['id']);

if (!$order) {
    header('Location: orders.php');
    exit;
}

$orderItems = getOrderItems($conn, $order['id']);
$user = $conn->query("SELECT name, email FROM users WHERE id = " . $order['user_id'])->fetch_assoc();
?>

<div class="row">
    <div class="col-md-6">
        <h6>Customer Information</h6>
        <hr>
        <p class="mb-1"><strong>Name:</strong> <?php echo $user['name']; ?></p>
        <p class="mb-1"><strong>Email:</strong> <?php echo $user['email']; ?></p>
    </div>
    <div class="col-md-6">
        <h6>Order Information</h6>
        <hr>
        <p class="mb-1"><strong>Order ID:</strong> #<?php echo $order['id']; ?></p>
        <p class="mb-1"><strong>Date:</strong> <?php echo date('F j, Y, g:i A', strtotime($order['created_at'])); ?></p>
        <p class="mb-0"><strong>Payment:</strong> <?php echo strtoupper($order['payment_method']); ?></p>
    </div>
</div>

<div class="row mt-3">
    <div class="col-md-12">
        <h6>Shipping Address</h6>
        <hr>
        <p class="mb-0"><?php echo nl2br($order['shipping_address']); ?></p>
    </div>
</div>

<h6 class="mt-4">Order Items</h6>
<hr>
<div class="table-responsive">
    <table class="table table-sm">
        <thead>
            <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($orderItems as $item): ?>
            <tr>
                <td>
                    <div class="d-flex align-items-center">
                        <img src="../assets/images/<?php echo $item['image']; ?>" style="width: 40px; height: 40px; object-fit: cover;" class="me-2 rounded" onerror="this.src='../assets/images/default.png'">
                        <?php echo $item['name']; ?>
                    </div>
                </td>
                <td>
                    <?php echo formatPrice($item['price']); ?><br>
                    <small class="text-muted">₹<?php echo number_format($item['price'] * 83.12, 2); ?></small>
                </td>
                <td><?php echo $item['quantity']; ?></td>
                <td>
                    <strong><?php echo formatPrice($item['price'] * $item['quantity']); ?></strong><br>
                    <small class="text-success">₹<?php echo number_format($item['price'] * $item['quantity'] * 83.12, 2); ?></small>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3" class="text-end"><strong>Total:</strong></td>
                <td>
                    <strong class="text-primary h5"><?php echo formatPrice($order['total_price']); ?></strong><br>
                    <span class="text-success fw-bold">₹<?php echo number_format($order['total_price'] * 83.12, 2); ?> INR</span>
                </td>
            </tr>
        </tfoot>
    </table>
</div>
