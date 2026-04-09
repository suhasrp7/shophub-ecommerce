<?php
require_once '../includes/config.php';

$conn = connectDB();

$totalProducts = getTotalProducts($conn);
$totalUsers = getTotalUsers($conn);
$totalOrders = getTotalOrders($conn);
$totalRevenue = getTotalRevenue($conn);
$pendingOrders = getPendingOrders($conn);
$recentOrders = getRecentOrders($conn, 5);

requireAdmin();
include 'header.php';
?>

<div class="container-fluid">
    <h2 class="mb-4"><i class="fas fa-tachometer-alt me-2"></i>Dashboard</h2>
    
    <!-- Stats Cards -->
    <div class="row g-4 mb-4">
        <div class="col-xl-3 col-md-6">
            <div class="card border-0 shadow-sm h-100">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="text-muted mb-2">Total Revenue</h6>
                            <h3 class="mb-0"><?php echo formatPrice($totalRevenue); ?></h3>
                            <p class="small text-muted mb-0">
                                <span class="text-success">₹<?php echo number_format($totalRevenue * 83.12, 2); ?> INR</span> | 
                                <span class="text-primary">€<?php echo number_format($totalRevenue * 0.92, 2); ?> EUR</span>
                            </p>
                        </div>
                        <div class="icon-circle bg-success text-white">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6">
            <div class="card border-0 shadow-sm h-100">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="text-muted mb-2">Total Orders</h6>
                            <h3 class="mb-0"><?php echo $totalOrders; ?></h3>
                        </div>
                        <div class="icon-circle bg-primary text-white">
                            <i class="fas fa-shopping-bag"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6">
            <div class="card border-0 shadow-sm h-100">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="text-muted mb-2">Total Products</h6>
                            <h3 class="mb-0"><?php echo $totalProducts; ?></h3>
                        </div>
                        <div class="icon-circle bg-info text-white">
                            <i class="fas fa-box"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6">
            <div class="card border-0 shadow-sm h-100">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="text-muted mb-2">Total Users</h6>
                            <h3 class="mb-0"><?php echo $totalUsers; ?></h3>
                        </div>
                        <div class="icon-circle bg-warning text-white">
                            <i class="fas fa-users"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row g-4">
        <!-- Recent Orders -->
        <div class="col-xl-8">
            <div class="card border-0 shadow-sm">
                <div class="card-header bg-white d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Recent Orders</h5>
                    <?php if ($pendingOrders > 0): ?>
                    <span class="badge bg-warning"><?php echo $pendingOrders; ?> pending</span>
                    <?php endif; ?>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover mb-0">
                            <thead class="table-light">
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($recentOrders as $order): ?>
                                <tr>
                                    <td>#<?php echo $order['id']; ?></td>
                                    <td><?php echo $order['user_name']; ?></td>
                                    <td><?php echo formatPrice($order['total_price']); ?></td>
                                    <td>
                                        <span class="badge bg-<?php 
                                            $colors = ['pending' => 'warning', 'processing' => 'info', 'shipped' => 'primary', 'delivered' => 'success', 'cancelled' => 'danger'];
                                            echo $colors[$order['status']];
                                        ?>"><?php echo ucfirst($order['status']); ?></span>
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
                <div class="card-footer text-center">
                    <a href="orders.php" class="btn btn-outline-primary btn-sm">View All Orders</a>
                </div>
            </div>
        </div>

        <!-- Quick Stats -->
        <div class="col-xl-4">
            <div class="card border-0 shadow-sm mb-4">
                <div class="card-header bg-white">
                    <h5 class="mb-0">Order Status</h5>
                </div>
                <div class="card-body">
                    <?php
                    $statusCounts = $conn->query("SELECT status, COUNT(*) as count FROM orders GROUP BY status")->fetch_all(MYSQLI_ASSOC);
                    $statusData = array_column($statusCounts, 'count', 'status');
                    $total = array_sum($statusData) ?: 1;
                    ?>
                    <?php foreach (['pending' => 'warning', 'processing' => 'info', 'shipped' => 'primary', 'delivered' => 'success', 'cancelled' => 'danger'] as $status => $color): ?>
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="text-capitalize"><?php echo $status; ?></span>
                        <div class="d-flex align-items-center">
                            <div class="progress me-2" style="width: 100px; height: 8px;">
                                <div class="progress-bar bg-<?php echo $color; ?>" style="width: <?php echo (($statusData[$status] ?? 0) / $total) * 100; ?>%"></div>
                            </div>
                            <span class="badge bg-<?php echo $color; ?>"><?php echo $statusData[$status] ?? 0; ?></span>
                        </div>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <div class="card border-0 shadow-sm">
                <div class="card-header bg-white">
                    <h5 class="mb-0">Quick Actions</h5>
                </div>
                <div class="card-body">
                    <div class="d-grid gap-2">
                        <a href="add_product.php" class="btn btn-primary"><i class="fas fa-plus me-2"></i>Add Product</a>
                        <a href="products.php" class="btn btn-outline-primary"><i class="fas fa-box me-2"></i>Manage Products</a>
                        <a href="orders.php" class="btn btn-outline-primary"><i class="fas fa-shopping-bag me-2"></i>Manage Orders</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include 'footer.php'; ?>
