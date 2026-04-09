    <footer class="bg-dark text-white mt-5 pt-4 pb-3">
        <div class="container">
            <div class="row">
                <div class="col-md-4 mb-3">
                    <h5><?php echo SITE_NAME; ?></h5>
                    <p class="text-muted">Your one-stop shop for all electronics and accessories. Quality products at affordable prices delivered across India.</p>
                    <div class="mt-3">
                        <h6 class="text-white">Follow Us</h6>
                        <a href="#" class="text-muted me-3"><i class="fab fa-facebook fa-lg"></i></a>
                        <a href="#" class="text-muted me-3"><i class="fab fa-twitter fa-lg"></i></a>
                        <a href="#" class="text-muted me-3"><i class="fab fa-instagram fa-lg"></i></a>
                        <a href="#" class="text-muted"><i class="fab fa-whatsapp fa-lg"></i></a>
                    </div>
                </div>
                <div class="col-md-4 mb-3">
                    <h5>Quick Links</h5>
                    <ul class="list-unstyled">
                        <li><a href="index.php" class="text-muted text-decoration-none">Home</a></li>
                        <li><a href="products.php" class="text-muted text-decoration-none">Products</a></li>
                        <li><a href="cart.php" class="text-muted text-decoration-none">Cart</a></li>
                        <li><a href="login.php" class="text-muted text-decoration-none">Login</a></li>
                        <li><a href="contact.php" class="text-muted text-decoration-none">Contact Us</a></li>
                    </ul>
                </div>
                <div class="col-md-4 mb-3">
                    <h5>Contact Us</h5>
                    <ul class="list-unstyled text-muted">
                        <li class="mb-2"><i class="fas fa-envelope me-2 text-primary"></i> support@shophub.com</li>
                        <li class="mb-2"><i class="fas fa-phone me-2 text-success"></i> +91 98765 43210</li>
                        <li class="mb-2"><i class="fas fa-phone me-2 text-success"></i> +91 98765 43211</li>
                        <li class="mb-2"><i class="fab fa-whatsapp me-2 text-success"></i> +91 98765 43210</li>
                        <li class="mb-2"><i class="fas fa-map-marker-alt me-2 text-danger"></i> 123 Market Street, Mumbai, MH 400001</li>
                    </ul>
                    <div class="mt-3">
                        <p class="small text-muted mb-1"><i class="fas fa-clock me-2"></i> Mon-Sat: 9:00 AM - 8:00 PM</p>
                        <p class="small text-muted"><i class="fas fa-clock me-2"></i> Sunday: 10:00 AM - 6:00 PM</p>
                    </div>
                </div>
            </div>
            <hr class="bg-secondary">
            <div class="row">
                <div class="col-md-6 text-center text-md-start">
                    <p class="text-muted mb-0">&copy; <?php echo date('Y'); ?> <?php echo SITE_NAME; ?>. All rights reserved.</p>
                </div>
                <div class="col-md-6 text-center text-md-end">
                    <p class="text-muted mb-0">Made with <i class="fas fa-heart text-danger"></i> in India</p>
                </div>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="assets/js/main.js"></script>
    <script>
    function togglePassword(inputId, iconId) {
        const input = document.getElementById(inputId);
        const icon = document.getElementById(iconId);
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
    </script>
</body>
</html>
