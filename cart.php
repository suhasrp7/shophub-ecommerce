<?php
require_once 'includes/config.php';

$pageTitle = 'Shopping Cart';
requireLogin();

$conn = connectDB();
$cartItems = getCartItems($conn, $_SESSION['user_id']);
$cartTotal = getCartTotal($conn, $_SESSION['user_id']);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        $cartId = (int)$_POST['cart_id'];
        
        if ($_POST['action'] === 'update') {
            $quantity = max(1, (int)$_POST['quantity']);
            updateCartQuantity($conn, $cartId, $quantity, $_SESSION['user_id']);
            $_SESSION['success'] = 'Cart updated successfully.';
        } elseif ($_POST['action'] === 'remove') {
            removeFromCart($conn, $cartId, $_SESSION['user_id']);
            $_SESSION['success'] = 'Item removed from cart.';
        }
        
        header('Location: cart.php');
        exit;
    }
}
?>
<?php include 'includes/header.php'; ?>

<div class="container my-4">
    <h2 class="mb-4"><i class="fas fa-shopping-cart me-2"></i>Shopping Cart</h2>
    
    <?php if (empty($cartItems)): ?>
    <div class="card shadow-sm">
        <div class="card-body text-center py-5">
            <i class="fas fa-shopping-cart fa-4x text-muted mb-4"></i>
            <h4 class="text-muted">Your cart is empty</h4>
            <p class="text-muted">Looks like you haven't added any items to your cart yet.</p>
            <a href="products.php" class="btn btn-primary mt-3">
                <i class="fas fa-shopping-bag me-2"></i>Continue Shopping
            </a>
        </div>
    </div>
    <?php else: ?>
    <div class="row">
        <div class="col-lg-8">
            <div class="card shadow-sm mb-4">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">Cart Items (<?php echo count($cartItems); ?>)</h5>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover mb-0">
                            <thead class="table-light">
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($cartItems as $item): ?>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <img src="assets/images/<?php echo $item['image']; ?>" class="rounded me-3" style="width: 60px; height: 60px; object-fit: cover;" alt="<?php echo $item['name']; ?>" onerror="this.src='assets/images/default.png'">
                                            <div>
                                                <h6 class="mb-0"><?php echo $item['name']; ?></h6>
                                                <small class="text-muted"><?php echo $item['stock']; ?> available</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td><?php echo formatPrice($item['price']); ?></td>
                                    <td style="width: 120px;">
                                        <form method="POST" class="d-flex align-items-center">
                                            <input type="hidden" name="action" value="update">
                                            <input type="hidden" name="cart_id" value="<?php echo $item['id']; ?>">
                                            <input type="number" name="quantity" class="form-control form-control-sm" value="<?php echo $item['quantity']; ?>" min="1" max="<?php echo $item['stock']; ?>" onchange="this.form.submit()">
                                        </form>
                                    </td>
                                    <td><strong><?php echo formatPrice($item['price'] * $item['quantity']); ?></strong></td>
                                    <td>
                                        <form method="POST">
                                            <input type="hidden" name="action" value="remove">
                                            <input type="hidden" name="cart_id" value="<?php echo $item['id']; ?>">
                                            <button type="submit" class="btn btn-outline-danger btn-sm" onclick="return confirm('Remove this item?')">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <a href="products.php" class="btn btn-outline-primary">
                <i class="fas fa-arrow-left me-2"></i>Continue Shopping
            </a>
        </div>
        
        <div class="col-lg-4">
            <div class="card shadow-sm">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">Order Summary</h5>
                </div>
                <div class="card-body">
                    <div class="d-flex justify-content-between mb-2">
                        <span>Subtotal (<?php echo count($cartItems); ?> items)</span>
                        <span><?php echo formatPrice($cartTotal); ?></span>
                    </div>
                    <div class="d-flex justify-content-between mb-2">
                        <span>Shipping</span>
                        <span class="text-success">Free</span>
                    </div>
                    <hr>
                    <div class="d-flex justify-content-between mb-3">
                        <strong>Total</strong>
                        <strong class="text-primary h4 mb-0"><?php echo formatPrice($cartTotal); ?></strong>
                    </div>
                    <p class="small text-muted text-end mb-3"><?php echo formatPriceAll($cartTotal); ?></p>
                    <a href="checkout.php" class="btn btn-primary w-100 py-2">
                        <i class="fas fa-lock me-2"></i>Proceed to Checkout
                    </a>
                    
                    <div class="mt-3 text-center">
                        <p class="text-muted small mb-1"><i class="fas fa-shield-alt me-1"></i>Secure checkout</p>
                        <p class="text-muted small"><i class="fas fa-undo me-1"></i>30-day returns</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php endif; ?>
</div>

<?php include 'includes/footer.php'; ?>
