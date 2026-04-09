<?php
require_once 'includes/config.php';

$pageTitle = 'Contact Us';
?>
<?php include 'includes/header.php'; ?>

<div class="container my-5">
    <div class="row">
        <div class="col-lg-8 mx-auto">
            <div class="card shadow-lg">
                <div class="card-header bg-primary text-white text-center py-4">
                    <h3 class="mb-0"><i class="fas fa-headset me-2"></i>Contact Us</h3>
                </div>
                <div class="card-body p-4">
                    <div class="row mb-4">
                        <div class="col-md-6 text-center mb-3">
                            <div class="p-3 bg-light rounded">
                                <i class="fas fa-phone fa-2x text-success mb-2"></i>
                                <h6>Call Us</h6>
                                <p class="mb-0 text-muted">+91 98765 43210</p>
                                <p class="mb-0 text-muted">+91 98765 43211</p>
                            </div>
                        </div>
                        <div class="col-md-6 text-center mb-3">
                            <div class="p-3 bg-light rounded">
                                <i class="fab fa-whatsapp fa-2x text-success mb-2"></i>
                                <h6>WhatsApp</h6>
                                <p class="mb-0 text-muted">+91 98765 43210</p>
                                <p class="small text-muted">Quick response within 1 hour</p>
                            </div>
                        </div>
                        <div class="col-md-6 text-center mb-3">
                            <div class="p-3 bg-light rounded">
                                <i class="fas fa-envelope fa-2x text-primary mb-2"></i>
                                <h6>Email</h6>
                                <p class="mb-0 text-muted">support@shophub.com</p>
                                <p class="mb-0 text-muted">help@shophub.com</p>
                            </div>
                        </div>
                        <div class="col-md-6 text-center mb-3">
                            <div class="p-3 bg-light rounded">
                                <i class="fas fa-map-marker-alt fa-2x text-danger mb-2"></i>
                                <h6>Address</h6>
                                <p class="mb-0 text-muted">123 Market Street</p>
                                <p class="mb-0 text-muted">Mumbai, MH 400001</p>
                            </div>
                        </div>
                    </div>

                    <hr>

                    <h5 class="mb-3">Send us a Message</h5>
                    <form>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Your Name</label>
                                <input type="text" class="form-control" placeholder="Enter your name">
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Email Address</label>
                                <input type="email" class="form-control" placeholder="Enter your email">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Phone Number</label>
                                <input type="tel" class="form-control" placeholder="+91 XXXXX XXXXX">
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Subject</label>
                                <select class="form-select">
                                    <option>General Inquiry</option>
                                    <option>Order Support</option>
                                    <option>Product Question</option>
                                    <option>Return/Exchange</option>
                                    <option>Feedback</option>
                                </select>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Message</label>
                            <textarea class="form-control" rows="5" placeholder="How can we help you?"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary w-100 py-2">
                            <i class="fas fa-paper-plane me-2"></i>Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include 'includes/footer.php'; ?>
