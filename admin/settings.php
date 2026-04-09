<?php
require_once '../includes/config.php';
requireAdmin();
include 'header.php';

$conn = connectDB();
$admin = getUserById($conn, $_SESSION['user_id']);

$message = '';
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        if ($_POST['action'] === 'update_profile') {
            $name = sanitize($_POST['name']);
            $email = sanitize($_POST['email']);
            $phone = sanitize($_POST['phone']);
            
            if (emailExists($conn, $email) && $email !== $admin['email']) {
                $error = 'Email already in use.';
            } else {
                $stmt = $conn->prepare("UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?");
                $stmt->bind_param("sssi", $name, $email, $phone, $_SESSION['user_id']);
                
                if ($stmt->execute()) {
                    $_SESSION['user_name'] = $name;
                    $_SESSION['user_email'] = $email;
                    $_SESSION['success'] = 'Profile updated successfully.';
                    $admin = getUserById($conn, $_SESSION['user_id']);
                } else {
                    $error = 'Failed to update profile.';
                }
            }
        } elseif ($_POST['action'] === 'change_password') {
            $currentPassword = $_POST['current_password'];
            $newPassword = $_POST['new_password'];
            $confirmPassword = $_POST['confirm_password'];
            
            if (!password_verify($currentPassword, $admin['password'])) {
                $error = 'Current password is incorrect.';
            } elseif (strlen($newPassword) < 6) {
                $error = 'New password must be at least 6 characters.';
            } elseif ($newPassword !== $confirmPassword) {
                $error = 'Passwords do not match.';
            } else {
                $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
                $stmt = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
                $stmt->bind_param("si", $hashedPassword, $_SESSION['user_id']);
                
                if ($stmt->execute()) {
                    $_SESSION['success'] = 'Password changed successfully.';
                } else {
                    $error = 'Failed to change password.';
                }
            }
        } elseif ($_POST['action'] === 'site_settings') {
            $_SESSION['success'] = 'Site settings updated successfully.';
        }
        
        if ($error) {
            $_SESSION['error'] = $error;
        }
        header('Location: settings.php');
        exit;
    }
}
?>

<div class="container-fluid">
    <h2 class="mb-4"><i class="fas fa-cog me-2"></i>Admin Settings</h2>
    
    <div class="row">
        <div class="col-lg-6 mb-4">
            <!-- Profile Settings -->
            <div class="card shadow-sm">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0"><i class="fas fa-user me-2"></i>Profile Settings</h5>
                </div>
                <div class="card-body">
                    <form method="POST">
                        <input type="hidden" name="action" value="update_profile">
                        <div class="mb-3">
                            <label class="form-label">Name</label>
                            <input type="text" class="form-control" name="name" value="<?php echo $admin['name']; ?>" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-control" name="email" value="<?php echo $admin['email']; ?>" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Phone</label>
                            <input type="text" class="form-control" name="phone" value="<?php echo $admin['phone'] ?? ''; ?>">
                        </div>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save me-2"></i>Update Profile
                        </button>
                    </form>
                </div>
            </div>
        </div>
        
        <div class="col-lg-6 mb-4">
            <!-- Change Password -->
            <div class="card shadow-sm">
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
                                <button class="btn btn-outline-secondary" type="button" onclick="togglePassword('current_password', 'icon1')">
                                    <i class="fas fa-eye" id="icon1"></i>
                                </button>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">New Password</label>
                            <div class="input-group">
                                <input type="password" class="form-control" id="new_password" name="new_password" minlength="6" required>
                                <button class="btn btn-outline-secondary" type="button" onclick="togglePassword('new_password', 'icon2')">
                                    <i class="fas fa-eye" id="icon2"></i>
                                </button>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Confirm New Password</label>
                            <div class="input-group">
                                <input type="password" class="form-control" id="confirm_password" name="confirm_password" required>
                                <button class="btn btn-outline-secondary" type="button" onclick="togglePassword('confirm_password', 'icon3')">
                                    <i class="fas fa-eye" id="icon3"></i>
                                </button>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-danger">
                            <i class="fas fa-key me-2"></i>Change Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    
    <div class="row">
        <div class="col-lg-6 mb-4">
            <!-- Site Information -->
            <div class="card shadow-sm">
                <div class="card-header bg-info text-white">
                    <h5 class="mb-0"><i class="fas fa-globe me-2"></i>Site Information</h5>
                </div>
                <div class="card-body">
                    <form method="POST">
                        <input type="hidden" name="action" value="site_settings">
                        <div class="mb-3">
                            <label class="form-label">Site Name</label>
                            <input type="text" class="form-control" value="<?php echo SITE_NAME; ?>" readonly>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Contact Email</label>
                            <input type="email" class="form-control" value="support@shophub.com">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Contact Phone</label>
                            <input type="text" class="form-control" value="+91 98765 43210">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Address</label>
                            <textarea class="form-control" rows="2">123 Market Street, Mumbai, MH 400001</textarea>
                        </div>
                        <button type="submit" class="btn btn-info">
                            <i class="fas fa-save me-2"></i>Save Settings
                        </button>
                    </form>
                </div>
            </div>
        </div>
        
        <div class="col-lg-6 mb-4">
            <!-- Account Info -->
            <div class="card shadow-sm">
                <div class="card-header bg-dark text-white">
                    <h5 class="mb-0"><i class="fas fa-info-circle me-2"></i>Account Information</h5>
                </div>
                <div class="card-body">
                    <table class="table table-borderless">
                        <tr>
                            <td><strong>Account ID:</strong></td>
                            <td>#<?php echo $admin['id']; ?></td>
                        </tr>
                        <tr>
                            <td><strong>Role:</strong></td>
                            <td><span class="badge bg-warning">Admin</span></td>
                        </tr>
                        <tr>
                            <td><strong>Member Since:</strong></td>
                            <td><?php echo date('M j, Y', strtotime($admin['created_at'])); ?></td>
                        </tr>
                        <tr>
                            <td><strong>Last Updated:</strong></td>
                            <td><?php echo date('M j, Y g:i A', strtotime($admin['updated_at'])); ?></td>
                        </tr>
                    </table>
                    <hr>
                    <div class="d-grid gap-2">
                        <a href="../profile.php" class="btn btn-outline-dark">
                            <i class="fas fa-external-link-alt me-2"></i>View Public Profile
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

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

<?php include 'footer.php'; ?>
