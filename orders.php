<?php
require_once 'includes/config.php';

$pageTitle = 'My Orders';
requireLogin();

$conn = connectDB();
$orders = getOrders($conn, $_SESSION['user_id']);
?>
<?php include 'includes/header.php'; ?>

<div class="container my-4">
    <h2 class="mb-4"><i class="fas fa-box me-2"></i>My Orders</h2>
    
    <?php if (empty($orders)): ?>
    <div class="card shadow-sm">
        <div class="card-body text-center py-5">
            <i class="fas fa-shopping-bag fa-4x text-muted mb-4"></i>
            <h4 class="text-muted">No orders yet</h4>
            <p class="text-muted">Start shopping to see your orders here.</p>
            <a href="products.php" class="btn btn-primary mt-3">
                <i class="fas fa-shopping-cart me-2"></i>Start Shopping
            </a>
        </div>
    </div>
    <?php else: ?>
    <div class="card shadow-sm">
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table table-hover mb-0">
                    <thead class="table-primary">
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($orders as $order): ?>
                        <tr>
                            <td><strong>#<?php echo $order['id']; ?></strong></td>
                            <td><?php echo date('M j, Y g:i A', strtotime($order['created_at'])); ?></td>
                            <td>
                                <span class="badge bg-<?php 
                                    $statusColors = ['pending' => 'warning', 'processing' => 'info', 'shipped' => 'primary', 'delivered' => 'success', 'cancelled' => 'danger'];
                                    echo $statusColors[$order['status']];
                                ?>"><?php echo ucfirst($order['status']); ?></span>
                            </td>
                            <td><strong><?php echo formatPrice($order['total_price']); ?></strong></td>
                            <td>
                                <button class="btn btn-sm btn-outline-primary" onclick="viewOrder(<?php echo $order['id']; ?>)">
                                    <i class="fas fa-eye"></i> View
                                </button>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <?php endif; ?>
</div>

<!-- Order Details Modal -->
<div class="modal fade" id="orderModal" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Order Details</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body" id="orderDetails">
                <div class="text-center">
                    <div class="spinner-border text-primary"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
function viewOrder(orderId) {
    const modal = new bootstrap.Modal(document.getElementById('orderModal'));
    document.getElementById('orderDetails').innerHTML = '<div class="text-center py-5"><div class="spinner-border text-primary"></div></div>';
    modal.show();
    
    fetch('get_order_details.php?id=' + orderId)
        .then(response => response.text())
        .then(html => {
            document.getElementById('orderDetails').innerHTML = html;
        });
}
</script>

<?php include 'includes/footer.php'; ?>
