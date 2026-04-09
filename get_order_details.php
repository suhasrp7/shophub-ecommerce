<?php
require_once 'includes/config.php';

if (!isLoggedIn() || !isset($_GET['id'])) {
    echo '<div class="alert alert-danger">Invalid order</div>';
    exit;
}

$conn = connectDB();
$order = getOrderById($conn, (int)$_GET['id'], $_SESSION['user_id']);

if (!$order) {
    echo '<div class="alert alert-danger">Order not found</div>';
    exit;
}

$orderItems = getOrderItems($conn, $order['id']);
?>
<div class="row mb-3">
    <div class="col-md-6">
        <h6>Order Information</h6>
        <hr>
        <p class="mb-1"><strong>Order ID:</strong> #<?php echo $order['id']; ?></p>
        <p class="mb-1"><strong>Date:</strong> <?php echo date('F j, Y, g:i A', strtotime($order['created_at'])); ?></p>
        <p class="mb-1"><strong>Status:</strong> 
            <span class="badge bg-<?php 
                $statusColors = ['pending' => 'warning', 'processing' => 'info', 'shipped' => 'primary', 'delivered' => 'success', 'cancelled' => 'danger'];
                echo $statusColors[$order['status']];
            ?>"><?php echo ucfirst($order['status']); ?></span>
        </p>
        <p class="mb-0"><strong>Payment:</strong> <?php echo strtoupper($order['payment_method']); ?></p>
    </div>
    <div class="col-md-6">
        <h6>Shipping Address</h6>
        <hr>
        <p class="mb-0"><?php echo nl2br($order['shipping_address']); ?></p>
    </div>
</div>

<h6>Items</h6>
<hr>
<div class="table-responsive">
    <table class="table table-sm">
        <thead>
            <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($orderItems as $item): ?>
            <tr>
                <td>
                    <div class="d-flex align-items-center">
                        <img src="assets/images/<?php echo $item['image']; ?>" style="width: 40px; height: 40px; object-fit: cover;" class="me-2 rounded" onerror="this.src='assets/images/default.png'">
                        <?php echo $item['name']; ?>
                    </div>
                </td>
                <td><?php echo formatPrice($item['price']); ?></td>
                <td><?php echo $item['quantity']; ?></td>
                <td><strong><?php echo formatPrice($item['price'] * $item['quantity']); ?></strong></td>
            </tr>
            <?php endforeach; ?>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3" class="text-end"><strong>Total:</strong></td>
                <td><strong class="text-primary"><?php echo formatPrice($order['total_price']); ?></strong></td>
            </tr>
        </tfoot>
    </table>
</div>
