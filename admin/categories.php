<?php
require_once '../includes/config.php';
requireAdmin();
include 'header.php';

$conn = connectDB();
$categories = getCategories($conn);
?>

<div class="container-fluid">
    <h2 class="mb-4"><i class="fas fa-tags me-2"></i>Categories</h2>
    
    <div class="card border-0 shadow-sm">
        <div class="card-body">
            <div class="row">
                <?php foreach ($categories as $cat): 
                    $count = $conn->query("SELECT COUNT(*) as count FROM products WHERE category = '" . $cat['category'] . "'")->fetch_assoc()['count'];
                ?>
                <div class="col-md-4 mb-3">
                    <div class="card h-100">
                        <div class="card-body d-flex justify-content-between align-items-center">
                            <div>
                                <h5 class="mb-1"><?php echo ucfirst($cat['category']); ?></h5>
                                <small class="text-muted"><?php echo $count; ?> products</small>
                            </div>
                            <a href="products.php?category=<?php echo urlencode($cat['category']); ?>" class="btn btn-sm btn-outline-primary">
                                <i class="fas fa-eye"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</div>

<?php include 'footer.php'; ?>
