function toggleSidebar() {
    const sidebar = document.getElementById('adminSidebar');
    const hamburger = document.getElementById('hamburgerBtn');
    
    sidebar.classList.toggle('show');
    hamburger.classList.toggle('active');
}

document.addEventListener('click', function(e) {
    const sidebar = document.getElementById('adminSidebar');
    const hamburger = document.getElementById('hamburgerBtn');
    
    if (window.innerWidth < 992) {
        if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
            sidebar.classList.remove('show');
            hamburger.classList.remove('active');
        }
    }
});

function confirmDelete(message = 'Are you sure you want to delete this item?') {
    return confirm(message);
}

function showLoading() {
    const overlay = document.createElement('div');
    overlay.className = 'spinner-overlay';
    overlay.id = 'loadingOverlay';
    overlay.innerHTML = '<div class="spinner-border text-primary" style="width: 3rem; height: 3rem;"></div>';
    document.body.appendChild(overlay);
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.remove();
}
