<?php
require_once '../includes/config.php';
requireAdmin();
include 'header.php';

$conn = connectDB();
$orders = getOrders($conn);
?>

<div class="container-fluid">
    <h2 class="mb-4"><i class="fas fa-shopping-bag me-2"></i>Orders</h2>
    
    <div class="card border-0 shadow-sm">
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table table-hover mb-0">
                    <thead class="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Email</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($orders as $order): ?>
                        <tr>
                            <td>#<?php echo $order['id']; ?></td>
                            <td><?php echo $order['user_name']; ?></td>
                            <td><?php echo $order['user_email']; ?></td>
                            <td>
                                <?php echo formatPrice($order['total_price']); ?><br>
                                <small class="text-success">₹<?php echo number_format($order['total_price'] * 83.12, 2); ?></small>
                            </td>
                            <td><span class="badge bg-secondary"><?php echo strtoupper($order['payment_method']); ?></span></td>
                            <td>
                                <form method="POST" action="update_order_status.php" class="d-inline">
                                    <input type="hidden" name="order_id" value="<?php echo $order['id']; ?>">
                                    <select name="status" class="form-select form-select-sm" onchange="this.form.submit()">
                                        <?php foreach (['pending', 'processing', 'shipped', 'delivered', 'cancelled'] as $status): ?>
                                        <option value="<?php echo $status; ?>" <?php echo $order['status'] === $status ? 'selected' : ''; ?>><?php echo ucfirst($status); ?></option>
                                        <?php endforeach; ?>
                                    </select>
                                </form>
                            </td>
                            <td><?php echo date('M j, Y', strtotime($order['created_at'])); ?></td>
                            <td>
                                <a href="order_details.php?id=<?php echo $order['id']; ?>" class="btn btn-sm btn-outline-primary">
                                    <i class="fas fa-eye"></i>
                                </a>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<?php include 'footer.php'; ?>
