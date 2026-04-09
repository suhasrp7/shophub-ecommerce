<?php
require_once '../includes/config.php';
requireAdmin();
include 'header.php';

$conn = connectDB();
$products = getAllProducts($conn);
$categories = getCategories($conn);
?>

<div class="container-fluid">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2><i class="fas fa-box me-2"></i>Products</h2>
        <a href="add_product.php" class="btn btn-primary"><i class="fas fa-plus me-2"></i>Add Product</a>
    </div>

    <div class="card border-0 shadow-sm">
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table table-hover mb-0">
                    <thead class="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($products as $product): ?>
                        <tr>
                            <td><?php echo $product['id']; ?></td>
                            <td>
                                <img src="../assets/images/<?php echo $product['image']; ?>" onerror="this.src='../assets/images/default.png'" style="width: 50px; height: 50px; object-fit: cover;" class="rounded" onerror="this.src='../assets/images/default.png'">
                            </td>
                            <td><?php echo $product['name']; ?></td>
                            <td><span class="badge bg-secondary"><?php echo ucfirst($product['category']); ?></span></td>
                            <td><?php echo formatPrice($product['price']); ?></td>
                            <td>
                                <?php if ($product['stock'] > 10): ?>
                                <span class="badge bg-success"><?php echo $product['stock']; ?></span>
                                <?php elseif ($product['stock'] > 0): ?>
                                <span class="badge bg-warning text-dark"><?php echo $product['stock']; ?></span>
                                <?php else: ?>
                                <span class="badge bg-danger"><?php echo $product['stock']; ?></span>
                                <?php endif; ?>
                            </td>
                            <td>
                                <a href="edit_product.php?id=<?php echo $product['id']; ?>" class="btn btn-sm btn-outline-primary">
                                    <i class="fas fa-edit"></i>
                                </a>
                                <a href="delete_product.php?id=<?php echo $product['id']; ?>" class="btn btn-sm btn-outline-danger" onclick="return confirm('Are you sure?')">
                                    <i class="fas fa-trash"></i>
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
