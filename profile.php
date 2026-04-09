<?php
require_once 'includes/config.php';

$pageTitle = 'My Profile';
requireLogin();

$conn = connectDB();
$user = getUserById($conn, $_SESSION['user_id']);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        if ($_POST['action'] === 'update_profile') {
            $name = sanitize($_POST['name']);
            $email = sanitize($_POST['email']);
            $phone = sanitize($_POST['phone']);
            $address = sanitize($_POST['address']);
            
            if (emailExists($conn, $email) && $email !== $user['email']) {
                $_SESSION['error'] = 'Email already in use.';
            } else {
                if (updateUser($conn, $_SESSION['user_id'], $name, $email, $phone, $address)) {
                    $_SESSION['user_name'] = $name;
                    $_SESSION['user_email'] = $email;
                    $_SESSION['success'] = 'Profile updated successfully.';
                    $user = getUserById($conn, $_SESSION['user_id']);
                } else {
                    $_SESSION['error'] = 'Failed to update profile.';
                }
            }
        } elseif ($_POST['action'] === 'change_password') {
            $currentPassword = $_POST['current_password'];
            $newPassword = $_POST['new_password'];
            $confirmPassword = $_POST['confirm_password'];
            
            if (!password_verify($currentPassword, $user['password'])) {
                $_SESSION['error'] = 'Current password is incorrect.';
            } elseif (strlen($newPassword) < 6) {
                $_SESSION['error'] = 'New password must be at least 6 characters.';
            } elseif ($newPassword !== $confirmPassword) {
                $_SESSION['error'] = 'Passwords do not match.';
            } else {
                if (updatePassword($conn, $_SESSION['user_id'], $newPassword)) {
                    $_SESSION['success'] = 'Password changed successfully.';
                } else {
                    $_SESSION['error'] = 'Failed to change password.';
                }
            }
        } elseif ($_POST['action'] === 'notification_settings') {
            $_SESSION['success'] = 'Notification preferences updated.';
        }
        
        header('Location: profile.php');
        exit;
    }
}
?>
<?php include 'includes/header.php'; ?>

<div class="container my-4">
    <h2 class="mb-4"><i class="fas fa-user-cog me-2"></i>Account Settings</h2>
    
    <div class="row">
        <!-- Sidebar -->
        <div class="col-lg-3 mb-4">
            <div class="card shadow-sm">
                <div class="card-body text-center py-5">
                    <div class="mb-3">
                        <i class="fas fa-user-circle fa-5x text-primary"></i>
                    </div>
                    <h4><?php echo $user['name']; ?></h4>
                    <p class="text-muted"><?php echo $user['email']; ?></p>
                    <span class="badge bg-secondary">Customer</span>
                    <hr class="my-3">
                    <div class="list-group">
                        <a href="profile.php" class="list-group-item list-group-item-action active">
                            <i class="fas fa-user me-2"></i>Profile
                        </a>
                        <a href="orders.php" class="list-group-item list-group-item-action">
                            <i class="fas fa-shopping-bag me-2"></i>My Orders
                        </a>
                        <a href="forgot_password.php" class="list-group-item list-group-item-action">
                            <i class="fas fa-key me-2"></i>Reset Password
                        </a>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Main Content -->
        <div class="col-lg-9">
            <!-- Profile Info -->
            <div class="card shadow-sm mb-4">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0"><i class="fas fa-user-edit me-2"></i>Edit Profile</h5>
                </div>
                <div class="card-body">
                    <form method="POST">
                        <input type="hidden" name="action" value="update_profile">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Full Name</label>
                                <input type="text" class="form-control" name="name" value="<?php echo $user['name']; ?>" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-control" name="email" value="<?php echo $user['email']; ?>" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Phone</label>
                                <input type="text" class="form-control" name="phone" value="<?php echo $user['phone'] ?? ''; ?>" placeholder="+91 XXXXX XXXXX">
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Member Since</label>
                                <input type="text" class="form-control" value="<?php echo date('M j, Y', strtotime($user['created_at'])); ?>" readonly>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Address</label>
                            <textarea class="form-control" name="address" rows="2" placeholder="Enter your full address"><?php echo $user['address'] ?? ''; ?></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save me-2"></i>Update Profile
                        </button>
                    </form>
                </div>
            </div>
            
            <!-- Change Password -->
            <div class="card shadow-sm mb-4">
                <div class="card-header bg-danger text-white">
                    <h5 class="mb-0"><i class="fas fa-key me-2"></i>Change Password</h5>
                </div>
                <div class="card-body">
                    <form method="POST">
                        <input type="hidden" name="action" value="change_password">
                        <div class="mb-3">
                            <label class="form-label">Current Password</label>
                            <div class="input-group">
                                <input type="password" class="form-control" id="current_password" name="current_password" required>
                                <button class="btn btn-outline-secondary" type="button" onclick="togglePassword('current_password', 'toggleIcon0')">
                                    <i class="fas fa-eye" id="toggleIcon0"></i>
                                </button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">New Password</label>
                                <div class="input-group">
                                    <input type="password" class="form-control" id="new_password" name="new_password" minlength="6" required>
                                    <button class="btn btn-outline-secondary" type="button" onclick="togglePassword('new_password', 'toggleIcon1')">
                                        <i class="fas fa-eye" id="toggleIcon1"></i>
                                    </button>
                                </div>
                                <small class="text-muted">Must be at least 6 characters</small>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Confirm New Password</label>
                                <div class="input-group">
                                    <input type="password" class="form-control" id="confirm_password" name="confirm_password" required>
                                    <button class="btn btn-outline-secondary" type="button" onclick="togglePassword('confirm_password', 'toggleIcon2')">
                                        <i class="fas fa-eye" id="toggleIcon2"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-danger">
                            <i class="fas fa-key me-2"></i>Change Password
                        </button>
                    </form>
                </div>
            </div>
            
            <!-- Notification Settings -->
            <div class="card shadow-sm mb-4">
                <div class="card-header bg-info text-white">
                    <h5 class="mb-0"><i class="fas fa-bell me-2"></i>Notification Settings</h5>
                </div>
                <div class="card-body">
                    <form method="POST">
                        <input type="hidden" name="action" value="notification_settings">
                        <div class="mb-3">
                            <label class="form-label">Email Notifications</label>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="orderUpdates" checked>
                                <label class="form-check-label" for="orderUpdates">Order Updates</label>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="promotions" checked>
                                <label class="form-check-label" for="promotions">Promotions & Offers</label>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="newsletter">
                                <label class="form-check-label" for="newsletter">Newsletter</label>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-info">
                            <i class="fas fa-save me-2"></i>Save Preferences
                        </button>
                    </form>
                </div>
            </div>
            
            <!-- Account Actions -->
            <div class="card shadow-sm">
                <div class="card-header bg-dark text-white">
                    <h5 class="mb-0"><i class="fas fa-shield-alt me-2"></i>Account Actions</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <a href="orders.php" class="btn btn-outline-primary w-100 py-3">
                                <i class="fas fa-box fa-2x mb-2"></i><br>
                                <strong>View Order History</strong>
                            </a>
                        </div>
                        <div class="col-md-6 mb-3">
                            <a href="contact.php" class="btn btn-outline-success w-100 py-3">
                                <i class="fas fa-headset fa-2x mb-2"></i><br>
                                <strong>Contact Support</strong>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include 'includes/footer.php'; ?>
