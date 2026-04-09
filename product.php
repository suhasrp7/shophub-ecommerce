<?php
require_once 'includes/config.php';

$conn = connectDB();

if (!isset($_GET['id']) || empty($_GET['id'])) {
    header('Location: products.php');
    exit;
}

$product = getProductById($conn, (int)$_GET['id']);

if (!$product) {
    header('Location: products.php');
    exit;
}

$pageTitle = $product['name'];

// Related products
$relatedProducts = getProductsByCategory($conn, $product['category']);
$relatedProducts = array_filter($relatedProducts, fn($p) => $p['id'] !== $product['id']);
$relatedProducts = array_slice($relatedProducts, 0, 4);
?>
<?php include 'includes/header.php'; ?>

<div class="container my-4">
    <nav aria-label="breadcrumb" class="mb-3">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="index.php">Home</a></li>
            <li class="breadcrumb-item"><a href="products.php">Products</a></li>
            <li class="breadcrumb-item"><a href="products.php?category=<?php echo urlencode($product['category']); ?>"><?php echo ucfirst($product['category']); ?></a></li>
            <li class="breadcrumb-item active"><?php echo $product['name']; ?></li>
        </ol>
    </nav>

    <div class="row">
        <div class="col-lg-6 mb-4">
            <div class="card shadow-sm">
                <img src="assets/images/<?php echo $product['image']; ?>" class="card-img-top product-detail-image" alt="<?php echo $product['name']; ?>" onerror="this.src='assets/images/default.png'">
            </div>
        </div>
        <div class="col-lg-6">
            <div class="card shadow-sm h-100">
                <div class="card-body">
                    <span class="badge bg-secondary mb-2"><?php echo ucfirst($product['category']); ?></span>
                    <h2 class="mb-3"><?php echo $product['name']; ?></h2>
                    
                    <div class="mb-3">
                        <?php if ($product['stock'] > 10): ?>
                        <span class="badge bg-success"><i class="fas fa-check-circle me-1"></i> In Stock</span>
                        <?php elseif ($product['stock'] > 0): ?>
                        <span class="badge bg-warning text-dark"><i class="fas fa-exclamation-circle me-1"></i> Only <?php echo $product['stock']; ?> left</span>
                        <?php else: ?>
                        <span class="badge bg-danger"><i class="fas fa-times-circle me-1"></i> Out of Stock</span>
                        <?php endif; ?>
                    </div>

                    <h3 class="text-primary mb-4"><?php echo formatPrice($product['price']); ?></h3>
                    <p class="text-muted"><?php echo formatPriceAll($product['price']); ?></p>
                    
                    <p class="text-muted mb-4"><?php echo nl2br($product['description']); ?></p>

                    <?php if ($product['stock'] > 0): ?>
                    <div class="mb-4">
                        <label class="form-label">Quantity:</label>
                        <div class="d-flex align-items-center">
                            <button class="btn btn-outline-secondary" onclick="decreaseQty()">-</button>
                            <input type="number" class="form-control mx-2 text-center" id="quantity" value="1" min="1" max="<?php echo $product['stock']; ?>" style="width: 80px;">
                            <button class="btn btn-outline-secondary" onclick="increaseQty()">+</button>
                        </div>
                    </div>
                    
                    <div class="d-grid gap-2">
                        <button class="btn btn-success btn-lg buy-now" data-product-id="<?php echo $product['id']; ?>">
                            <i class="fas fa-bolt me-2"></i>Buy Now - <?php echo formatPrice($product['price']); ?>
                        </button>
                        <button class="btn btn-primary add-to-cart" data-product-id="<?php echo $product['id']; ?>">
                            <i class="fas fa-cart-plus me-2"></i>Add to Cart
                        </button>
                    </div>
                    <?php else: ?>
                    <div class="alert alert-danger">
                        <i class="fas fa-exclamation-triangle me-2"></i>This product is currently out of stock.
                    </div>
                    <?php endif; ?>

                    <hr class="my-4">

                    <div class="row text-center">
                        <div class="col-4">
                            <i class="fas fa-truck text-primary fa-lg mb-2"></i>
                            <p class="small mb-0">Free Shipping</p>
                        </div>
                        <div class="col-4">
                            <i class="fas fa-shield-alt text-primary fa-lg mb-2"></i>
                            <p class="small mb-0">Secure Payment</p>
                        </div>
                        <div class="col-4">
                            <i class="fas fa-undo text-primary fa-lg mb-2"></i>
                            <p class="small mb-0">Easy Returns</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <?php if (!empty($relatedProducts)): ?>
    <section class="mt-5">
        <h3 class="mb-4">Related Products</h3>
        <div class="row g-4">
            <?php foreach ($relatedProducts as $related): ?>
            <div class="col-lg-3 col-md-6">
                <div class="card product-card h-100 shadow-sm">
                    <img src="assets/images/<?php echo $related['image']; ?>" class="card-img-top product-image" alt="<?php echo $related['name']; ?>" onerror="this.src='assets/images/default.png'">
                    <div class="card-body">
                        <h6 class="card-title"><?php echo $related['name']; ?></h6>
                        <p class="text-primary fw-bold"><?php echo formatPrice($related['price']); ?></p>
                        <p class="small text-muted"><?php echo formatPriceAll($related['price']); ?></p>
                        <a href="product.php?id=<?php echo $related['id']; ?>" class="btn btn-outline-primary btn-sm w-100">View</a>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </section>
    <?php endif; ?>
</div>

<script>
function increaseQty() {
    const input = document.getElementById('quantity');
    const max = parseInt(input.max);
    if (parseInt(input.value) < max) {
        input.value = parseInt(input.value) + 1;
    }
}

function decreaseQty() {
    const input = document.getElementById('quantity');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function() {
        const productId = this.dataset.productId;
        const qty = document.getElementById('quantity')?.value || 1;
        addToCart(productId, qty);
    });
});
</script>

<?php include 'includes/footer.php'; ?>
