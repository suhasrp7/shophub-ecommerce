<?php
require_once 'includes/config.php';

$pageTitle = 'Checkout';
requireLogin();

$conn = connectDB();
$cartItems = getCartItems($conn, $_SESSION['user_id']);
$cartTotal = getCartTotal($conn, $_SESSION['user_id']);
$user = getUserById($conn, $_SESSION['user_id']);

if (empty($cartItems)) {
    header('Location: cart.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $shippingAddress = sanitize($_POST['address']) . ', ' . sanitize($_POST['city']) . ', ' . sanitize($_POST['state']) . ' ' . sanitize($_POST['zip']);
    $paymentMethod = sanitize($_POST['payment_method']);
    
    $conn->begin_transaction();
    
    try {
        $orderId = createOrder($conn, $_SESSION['user_id'], $cartTotal, $shippingAddress, $paymentMethod);
        
        if (!$orderId) {
            throw new Exception('Failed to create order');
        }
        
        foreach ($cartItems as $item) {
            addOrderItem($conn, $orderId, $item['product_id'], $item['quantity'], $item['price']);
            updateStock($conn, $item['product_id'], $item['quantity']);
        }
        
        clearCart($conn, $_SESSION['user_id']);
        
        $conn->commit();
        
        $_SESSION['success'] = 'Order placed successfully! Order ID: #' . $orderId;
        header('Location: order_confirmation.php?id=' . $orderId);
        exit;
        
    } catch (Exception $e) {
        $conn->rollback();
        $_SESSION['error'] = 'Failed to place order. Please try again.';
    }
}
?>
<?php include 'includes/header.php'; ?>

<div class="container my-4">
    <h2 class="mb-4"><i class="fas fa-credit-card me-2"></i>Checkout</h2>
    
    <form method="POST">
        <div class="row">
            <div class="col-lg-8">
                <!-- Shipping Information -->
                <div class="card shadow-sm mb-4">
                    <div class="card-header bg-primary text-white">
                        <h5 class="mb-0"><i class="fas fa-truck me-2"></i>Shipping Information</h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Full Name</label>
                                <input type="text" class="form-control" value="<?php echo $user['name']; ?>" readonly>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-control" value="<?php echo $user['email']; ?>" readonly>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Street Address</label>
                            <input type="text" class="form-control" name="address" value="<?php echo $user['address'] ?? ''; ?>" required placeholder="123 Main Street">
                        </div>
                        <div class="row">
                            <div class="col-md-4 mb-3">
                                <label class="form-label">City</label>
                                <input type="text" class="form-control" name="city" required placeholder="New York">
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="form-label">State</label>
                                <input type="text" class="form-control" name="state" required placeholder="NY">
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="form-label">ZIP Code</label>
                                <input type="text" class="form-control" name="zip" required placeholder="10001">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Payment Method -->
                <div class="card shadow-sm mb-4">
                    <div class="card-header bg-primary text-white">
                        <h5 class="mb-0"><i class="fas fa-wallet me-2"></i>Payment Method</h5>
                    </div>
                    <div class="card-body">
                        <div class="row g-3">
                            <div class="col-md-4">
                                <div class="form-check custom-radio">
                                    <input class="form-check-input" type="radio" name="payment_method" id="cod" value="cod" checked>
                                    <label class="form-check-label card p-3 w-100" for="cod">
                                        <i class="fas fa-money-bill-wave fa-2x text-success mb-2"></i>
                                        <br>Cash on Delivery
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-check custom-radio">
                                    <input class="form-check-input" type="radio" name="payment_method" id="card" value="card">
                                    <label class="form-check-label card p-3 w-100" for="card">
                                        <i class="fas fa-credit-card fa-2x text-primary mb-2"></i>
                                        <br>Credit/Debit Card
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-check custom-radio">
                                    <input class="form-check-input" type="radio" name="payment_method" id="paypal" value="paypal">
                                    <label class="form-check-label card p-3 w-100" for="paypal">
                                        <i class="fab fa-paypal fa-2x text-info mb-2"></i>
                                        <br>PayPal
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        <div id="cardDetails" class="mt-3 d-none">
                            <div class="row">
                                <div class="col-md-12 mb-3">
                                    <label class="form-label">Card Number</label>
                                    <input type="text" class="form-control" placeholder="1234 5678 9012 3456">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Expiry Date</label>
                                    <input type="text" class="form-control" placeholder="MM/YY">
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">CVV</label>
                                    <input type="text" class="form-control" placeholder="123">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-4">
                <!-- Order Summary -->
                <div class="card shadow-sm">
                    <div class="card-header bg-primary text-white">
                        <h5 class="mb-0">Order Summary</h5>
                    </div>
                    <div class="card-body">
                        <h6 class="mb-3">Items (<?php echo count($cartItems); ?>)</h6>
                        <div class="mb-3" style="max-height: 200px; overflow-y: auto;">
                            <?php foreach ($cartItems as $item): ?>
                            <div class="d-flex justify-content-between mb-2 small">
                                <span><?php echo $item['name']; ?> x<?php echo $item['quantity']; ?></span>
                                <span><?php echo formatPrice($item['price'] * $item['quantity']); ?></span>
                            </div>
                            <?php endforeach; ?>
                        </div>
                        <hr>
                        <div class="d-flex justify-content-between mb-2">
                            <span>Subtotal</span>
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
                        <button type="submit" class="btn btn-primary w-100 py-2">
                            <i class="fas fa-lock me-2"></i>Place Order
                        </button>
                        
                        <p class="text-center text-muted small mt-3">
                            <i class="fas fa-shield-alt me-1"></i>Your payment is secure and encrypted
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>

<script>
document.querySelectorAll('input[name="payment_method"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const cardDetails = document.getElementById('cardDetails');
        if (this.value === 'card') {
            cardDetails.classList.remove('d-none');
        } else {
            cardDetails.classList.add('d-none');
        }
    });
});
</script>

<?php include 'includes/footer.php'; ?>
