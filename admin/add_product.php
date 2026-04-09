<?php
require_once '../includes/config.php';
requireAdmin();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $conn = connectDB();
    
    $name = sanitize($_POST['name']);
    $description = sanitize($_POST['description']);
    $price = (float)$_POST['price'];
    $category = sanitize($_POST['category']);
    $stock = (int)$_POST['stock'];
    
    $image = 'default.png';
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = '../assets/images/';
        $imageName = time() . '_' . basename($_FILES['image']['name']);
        $imagePath = $uploadDir . $imageName;
        
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (in_array($_FILES['image']['type'], $allowedTypes) && $_FILES['image']['size'] < 5000000) {
            if (move_uploaded_file($_FILES['image']['tmp_name'], $imagePath)) {
                $image = $imageName;
            }
        }
    }
    
    if (addProduct($conn, $name, $description, $price, $image, $category, $stock)) {
        $_SESSION['success'] = 'Product added successfully.';
    } else {
        $_SESSION['error'] = 'Failed to add product.';
    }
    
    header('Location: products.php');
    exit;
}

$conn = connectDB();
$categories = getCategories($conn);
include 'header.php';
?>

<div class="container-fluid">
    <h2 class="mb-4"><i class="fas fa-plus me-2"></i>Add Product</h2>
    
    <div class="card border-0 shadow-sm">
        <div class="card-body">
            <form method="POST" enctype="multipart/form-data">
                <div class="row">
                    <div class="col-md-8">
                        <div class="mb-3">
                            <label class="form-label">Product Name</label>
                            <input type="text" class="form-control" name="name" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Description</label>
                            <textarea class="form-control" name="description" rows="5" required></textarea>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Price ($)</label>
                                <input type="number" class="form-control" name="price" step="0.01" min="0" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Stock</label>
                                <input type="number" class="form-control" name="stock" min="0" required>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Category</label>
                            <select class="form-select" name="category" required>
                                <?php foreach ($categories as $cat): ?>
                                <option value="<?php echo $cat['category']; ?>"><?php echo ucfirst($cat['category']); ?></option>
                                <?php endforeach; ?>
                                <option value="new">+ Add New Category</option>
                            </select>
                        </div>
                        <div class="mb-3 d-none" id="newCategory">
                            <label class="form-label">New Category Name</label>
                            <input type="text" class="form-control" name="new_category" placeholder="Enter new category name">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Product Image</label>
                            <div class="border rounded p-3 text-center">
                                <img src="../assets/images/default.png" id="preview" class="img-fluid mb-3" style="max-height: 200px;">
                                <input type="file" class="form-control" name="image" accept="image/*" onchange="previewImage(this)">
                                <small class="text-muted">Max size: 5MB. Formats: JPG, PNG, GIF</small>
                            </div>
                        </div>
                    </div>
                </div>
                
                <hr>
                <div class="d-flex gap-2">
                    <button type="submit" class="btn btn-primary"><i class="fas fa-save me-2"></i>Save Product</button>
                    <a href="products.php" class="btn btn-secondary"><i class="fas fa-arrow-left me-2"></i>Cancel</a>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
function previewImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('preview').src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

document.querySelector('select[name="category"]').addEventListener('change', function() {
    const newCategory = document.getElementById('newCategory');
    if (this.value === 'new') {
        newCategory.classList.remove('d-none');
        newCategory.querySelector('input').required = true;
    } else {
        newCategory.classList.add('d-none');
        newCategory.querySelector('input').required = false;
    }
});
</script>

<?php include 'footer.php'; ?>
