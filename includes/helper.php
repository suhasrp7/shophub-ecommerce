<?php
function getProductImage($image, $default = 'default.png') {
    $imagePath = __DIR__ . '/../assets/images/' . $image;
    if (file_exists($imagePath) && filesize($imagePath) > 100) {
        return 'assets/images/' . $image;
    }
    return 'assets/images/' . $default;
}
?>
