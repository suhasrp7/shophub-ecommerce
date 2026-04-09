<?php
require_once 'includes/config.php';

$conn = connectDB();
$featuredProducts = getFeaturedProducts($conn, 8);
$pageTitle = 'Home';
?>
<?php include 'includes/header.php'; ?>

<!-- Hero Section -->
<section class="hero-section bg-primary text-white py-5 mb-4">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-6">
                <h1 class="display-4 fw-bold mb-3">Welcome to <?php echo SITE_NAME; ?></h1>
                <p class="lead mb-4">Discover amazing products at unbeatable prices. Shop the latest electronics, accessories, and more.</p>
                <a href="products.php" class="btn btn-light btn-lg me-2">Shop Now</a>
                <a href="products.php?category=electronics" class="btn btn-outline-light btn-lg">Explore Electronics</a>
            </div>
            <div class="col-lg-6 text-center">
                <i class="fas fa-shopping-bag display-1 opacity-50"></i>
            </div>
        </div>
    </div>
</section>

<!-- Categories Section -->
<section class="mb-5">
    <div class="container">
        <h2 class="mb-4">Shop by Category</h2>
        <div class="row g-4">
            <?php 
            $categories = getCategories($conn);
            $icons = ['Electronics' => 'fa-laptop', 'Accessories' => 'fa-headphones', 'Furniture' => 'fa-couch'];
            foreach ($categories as $cat): 
            ?>
            <div class="col-md-4">
                <a href="products.php?category=<?php echo urlencode($cat['category']); ?>" class="text-decoration-none">
                    <div class="card category-card h-100 border-0 shadow-sm">
                        <div class="card-body text-center py-4">
                            <i class="fas <?php echo $icons[$cat['category']] ?? 'fa-box'; ?> fa-3x text-primary mb-3"></i>
                            <h5 class="card-title"><?php echo ucfirst($cat['category']); ?></h5>
                            <p class="text-muted"><?php 
                                $stmt = $conn->prepare("SELECT COUNT(*) as count FROM products WHERE category = ?");
                                $stmt->bind_param("s", $cat['category']);
                                $stmt->execute();
                                echo $stmt->get_result()->fetch_assoc()['count'];
                            ?> Products</p>
                        </div>
                    </div>
                </a>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Featured Products Section -->
<section class="mb-5">
    <div class="container">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>Featured Products</h2>
            <a href="products.php" class="btn btn-outline-primary">View All</a>
        </div>
        <div class="row g-4">
            <?php foreach ($featuredProducts as $product): ?>
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="card product-card h-100 shadow-sm">
                    <div class="position-relative">
                        <img src="assets/images/<?php echo $product['image']; ?>" class="card-img-top product-image" alt="<?php echo $product['name']; ?>" onerror="this.src='assets/images/default.png'">
                        <?php if ($product['stock'] <= 5 && $product['stock'] > 0): ?>
                        <span class="position-absolute top-0 start-0 badge bg-warning text-dark m-2">Low Stock</span>
                        <?php elseif ($product['stock'] == 0): ?>
                        <span class="position-absolute top-0 start-0 badge bg-danger m-2">Out of Stock</span>
                        <?php endif; ?>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <span class="badge bg-secondary mb-2 w-25"><?php echo ucfirst($product['category']); ?></span>
                        <h5 class="card-title"><?php echo $product['name']; ?></h5>
                        <p class="card-text text-muted small"><?php echo substr($product['description'], 0, 80) . '...'; ?></p>
                        <div class="mt-auto">
                            <h4 class="text-primary mb-3"><?php echo formatPrice($product['price']); ?></h4>
                            <p class="small text-muted mb-0"><?php echo formatPriceAll($product['price']); ?></p>
                            <?php if ($product['stock'] > 0): ?>
                            <div class="d-grid gap-2">
                                <button class="btn btn-primary add-to-cart" data-product-id="<?php echo $product['id']; ?>">
                                    <i class="fas fa-cart-plus me-2"></i>Add to Cart
                                </button>
                                <a href="product.php?id=<?php echo $product['id']; ?>" class="btn btn-outline-primary">
                                    <i class="fas fa-eye me-2"></i>View Details
                                </a>
                            </div>
                            <?php else: ?>
                            <button class="btn btn-secondary w-100" disabled>Out of Stock</button>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Features Section -->
<section class="bg-light py-5 mb-5">
    <div class="container">
        <div class="row g-4 text-center">
            <div class="col-md-4">
                <i class="fas fa-truck fa-3x text-primary mb-3"></i>
                <h5>Free Shipping</h5>
                <p class="text-muted">On orders over $50</p>
            </div>
            <div class="col-md-4">
                <i class="fas fa-shield-alt fa-3x text-primary mb-3"></i>
                <h5>Secure Payment</h5>
                <p class="text-muted">100% secure checkout</p>
            </div>
            <div class="col-md-4">
                <i class="fas fa-undo fa-3x text-primary mb-3"></i>
                <h5>Easy Returns</h5>
                <p class="text-muted">30-day return policy</p>
            </div>
        </div>
    </div>
</section>

<?php include 'includes/footer.php'; ?>
