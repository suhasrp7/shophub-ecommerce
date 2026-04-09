function addToCart(productId, quantity = 1) {
    fetch('api/add_to_cart.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'product_id=' + productId + '&quantity=' + quantity
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showToast('Added to cart!', 'success');
            updateCartCount(data.cart_count);
        } else {
            showToast(data.message || 'Failed to add to cart', 'error');
            if (data.redirect) {
                window.location.href = 'login.php';
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showToast('An error occurred', 'error');
    });
}

function updateCartCount(count) {
    const badges = document.querySelectorAll('.nav-link .badge');
    badges.forEach(badge => {
        if (count > 0) {
            badge.textContent = count;
            badge.style.display = 'inline';
        } else {
            badge.style.display = 'none';
        }
    });
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type === 'error' ? 'danger' : 'success'} position-fixed`;
    toast.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 250px; animation: slideIn 0.3s ease';
    toast.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'} me-2"></i>
        ${message}
        <button type="button" class="btn-close float-end" onclick="this.parentElement.remove()"></button>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.dataset.productId;
            const quantity = document.getElementById('quantity')?.value || 1;
            
            this.disabled = true;
            this.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Adding...';
            
            addToCart(productId, quantity);
            
            setTimeout(() => {
                this.disabled = false;
                this.innerHTML = '<i class="fas fa-cart-plus me-2"></i>Add to Cart';
            }, 1000);
        });
    });

    document.querySelectorAll('.buy-now').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.dataset.productId;
            const quantity = document.getElementById('quantity')?.value || 1;
            
            this.disabled = true;
            this.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
            
            fetch('api/add_to_cart.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'product_id=' + productId + '&quantity=' + quantity
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = 'checkout.php';
                } else if (data.redirect) {
                    window.location.href = data.redirect;
                } else {
                    showToast(data.message || 'Please login to continue', 'error');
                    this.disabled = false;
                    this.innerHTML = '<i class="fas fa-bolt me-2"></i>Buy Now';
                }
            })
            .catch(error => {
                showToast('An error occurred', 'error');
                this.disabled = false;
                this.innerHTML = '<i class="fas fa-bolt me-2"></i>Buy Now';
            });
        });
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('shadow');
    } else {
        navbar.classList.remove('shadow');
    }
});

function confirmDelete(message = 'Are you sure?') {
    return confirm(message);
}

function searchProducts(query) {
    if (query.length < 2) return;
    
    fetch('api/search.php?q=' + encodeURIComponent(query))
        .then(response => response.json())
        .then(data => {
            console.log('Search results:', data);
        });
}
