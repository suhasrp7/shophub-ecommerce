<?php
require_once '../includes/config.php';
requireAdmin();
include 'header.php';

$conn = connectDB();
$users = getAllUsers($conn);
?>

<div class="container-fluid">
    <h2 class="mb-4"><i class="fas fa-users me-2"></i>Users</h2>
    
    <div class="card border-0 shadow-sm">
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table table-hover mb-0">
                    <thead class="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Orders</th>
                            <th>Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($users as $user): ?>
                        <?php 
                        $ordersCount = $conn->query("SELECT COUNT(*) as count FROM orders WHERE user_id = " . $user['id'])->fetch_assoc()['count'];
                        ?>
                        <tr>
                            <td><?php echo $user['id']; ?></td>
                            <td><?php echo $user['name']; ?></td>
                            <td><?php echo $user['email']; ?></td>
                            <td><?php echo $user['phone'] ?? '-'; ?></td>
                            <td><span class="badge bg-primary"><?php echo $ordersCount; ?></span></td>
                            <td><?php echo date('M j, Y', strtotime($user['created_at'])); ?></td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<?php include 'footer.php'; ?>
