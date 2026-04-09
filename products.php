<?php
require_once 'includes/config.php';

$conn = connectDB();
$pageTitle = 'Products';

$search = isset($_GET['search']) ? sanitize($_GET['search']) : '';
$category = isset($_GET['category']) ? sanitize($_GET['category']) : '';
$sort = isset($_GET['sort']) ? sanitize($_GET['sort']) : 'newest';

if ($search) {
    $products = searchProducts($conn, $search);
} elseif ($category) {
    $products = getProductsByCategory($conn, $category);
    $pageTitle = ucfirst($category) . ' Products';
} else {
    $products = getAllProducts($conn);
}

if ($sort === 'price_low') {
    usort($products, fn($a, $b) => $a['price'] <=> $b['price']);
} elseif ($sort === 'price_high') {
    usort($products, fn($a, $b) => $b['price'] <=> $a['price']);
} elseif ($sort === 'name') {
    usort($products, fn($a, $b) => strcmp($a['name'], $b['name']));
}

$categories = getCategories($conn);
?>
<?php include 'includes/header.php'; ?>

<div class="container my-4">
    <div class="row">
        <!-- Sidebar Filters -->
        <div class="col-lg-3 mb-4">
            <div class="card shadow-sm">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0"><i class="fas fa-filter me-2"></i>Filters</h5>
                </div>
                <div class="card-body">
                    <form action="products.php" method="GET" id="filterForm">
                        <?php if ($search): ?>
                        <input type="hidden" name="search" value="<?php echo $search; ?>">
                        <?php endif; ?>
                        
                        <div class="mb-4">
                            <h6>Categories</h6>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="category" id="all" value="" <?php echo !$category ? 'checked' : ''; ?>>
                                <label class="form-check-label" for="all">All Categories</label>
                            </div>
                            <?php foreach ($categories as $cat): ?>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="category" id="<?php echo $cat['category']; ?>" value="<?php echo $cat['category']; ?>" <?php echo $category === $cat['category'] ? 'checked' : ''; ?>>
                                <label class="form-check-label" for="<?php echo $cat['category']; ?>"><?php echo ucfirst($cat['category']); ?></label>
                            </div>
                            <?php endforeach; ?>
                        </div>

                        <div class="mb-3">
                            <h6>Sort By</h6>
                            <select class="form-select" name="sort" onchange="document.getElementById('filterForm').submit()">
                                <option value="newest" <?php echo $sort === 'newest' ? 'selected' : ''; ?>>Newest First</option>
                                <option value="price_low" <?php echo $sort === 'price_low' ? 'selected' : ''; ?>>Price: Low to High</option>
                                <option value="price_high" <?php echo $sort === 'price_high' ? 'selected' : ''; ?>>Price: High to Low</option>
                                <option value="name" <?php echo $sort === 'name' ? 'selected' : ''; ?>>Name: A to Z</option>
                            </select>
                        </div>

                        <button type="submit" class="btn btn-primary w-100">Apply Filters</button>
                    </form>
                </div>
            </div>
        </div>

        <!-- Products Grid -->
        <div class="col-lg-9">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h4>
                    <?php if ($search): ?>
                    Search results for "<?php echo $search; ?>"
                    <?php elseif ($category): ?>
                    <?php echo ucfirst($category); ?>
                    <?php else: ?>
                    All Products
                    <?php endif; ?>
                    <span class="text-muted fs-6">(<?php echo count($products); ?> products)</span>
                </h4>
            </div>

            <?php if (empty($products)): ?>
            <div class="alert alert-info">
                <i class="fas fa-info-circle me-2"></i>No products found. Try adjusting your search or filters.
            </div>
            <?php else: ?>
            <div class="row g-4" id="productsGrid">
                <?php foreach ($products as $product): ?>
                <div class="col-lg-4 col-md-6">
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
                            <p class="card-text text-muted small flex-grow-1"><?php echo substr($product['description'], 0, 80) . '...'; ?></p>
                            <div class="mt-auto">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <h4 class="text-primary mb-0"><?php echo formatPrice($product['price']); ?></h4>
                                    <p class="small text-muted mb-0"><?php echo formatPriceAll($product['price']); ?></p>
                                    <small class="text-muted"><?php echo $product['stock']; ?> in stock</small>
                                </div>
                                <div class="d-grid gap-2">
                                    <a href="product.php?id=<?php echo $product['id']; ?>" class="btn btn-outline-primary">View Details</a>
                                    <?php if ($product['stock'] > 0): ?>
                                    <button class="btn btn-primary add-to-cart" data-product-id="<?php echo $product['id']; ?>">
                                        <i class="fas fa-cart-plus me-2"></i>Add to Cart
                                    </button>
                                    <?php else: ?>
                                    <button class="btn btn-secondary" disabled>Out of Stock</button>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
            <?php endif; ?>
        </div>
    </div>
</div>

<?php include 'includes/footer.php'; ?>
