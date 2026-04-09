<?php
require_once '../includes/config.php';
requireAdmin();

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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = sanitize($_POST['name']);
    $description = sanitize($_POST['description']);
    $price = (float)$_POST['price'];
    $category = sanitize($_POST['category']);
    $stock = (int)$_POST['stock'];
    
    $image = $product['image'];
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = '../uploads/';
        $imageName = time() . '_' . basename($_FILES['image']['name']);
        $imagePath = $uploadDir . $imageName;
        
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (in_array($_FILES['image']['type'], $allowedTypes) && $_FILES['image']['size'] < 5000000) {
            if (move_uploaded_file($_FILES['image']['tmp_name'], $imagePath)) {
                $image = $imageName;
            }
        }
    }
    
    if (updateProduct($conn, $product['id'], $name, $description, $price, $image, $category, $stock)) {
        $_SESSION['success'] = 'Product updated successfully.';
        header('Location: products.php');
        exit;
    } else {
        $_SESSION['error'] = 'Failed to update product.';
    }
}

$categories = getCategories($conn);
include 'header.php';
?>

<div class="container-fluid">
    <h2 class="mb-4"><i class="fas fa-edit me-2"></i>Edit Product</h2>
    
    <div class="card border-0 shadow-sm">
        <div class="card-body">
            <form method="POST" enctype="multipart/form-data">
                <div class="row">
                    <div class="col-md-8">
                        <div class="mb-3">
                            <label class="form-label">Product Name</label>
                            <input type="text" class="form-control" name="name" value="<?php echo $product['name']; ?>" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Description</label>
                            <textarea class="form-control" name="description" rows="5" required><?php echo $product['description']; ?></textarea>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Price ($)</label>
                                <input type="number" class="form-control" name="price" step="0.01" min="0" value="<?php echo $product['price']; ?>" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Stock</label>
                                <input type="number" class="form-control" name="stock" min="0" value="<?php echo $product['stock']; ?>" required>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Category</label>
                            <select class="form-select" name="category" required>
                                <?php foreach ($categories as $cat): ?>
                                <option value="<?php echo $cat['category']; ?>" <?php echo $product['category'] === $cat['category'] ? 'selected' : ''; ?>><?php echo ucfirst($cat['category']); ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Product Image</label>
                            <div class="border rounded p-3 text-center">
                                <img src="../assets/images/<?php echo $product['image']; ?>" id="preview" class="img-fluid mb-3" style="max-height: 200px;" onerror="this.src='../assets/images/default.png'">
                                <input type="file" class="form-control" name="image" accept="image/*" onchange="previewImage(this)">
                                <small class="text-muted">Leave empty to keep current image</small>
                            </div>
                        </div>
                    </div>
                </div>
                
                <hr>
                <div class="d-flex gap-2">
                    <button type="submit" class="btn btn-primary"><i class="fas fa-save me-2"></i>Update Product</button>
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
</script>

<?php include 'footer.php'; ?>
