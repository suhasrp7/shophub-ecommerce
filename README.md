# E-commerce Website - Setup Instructions

## Prerequisites
- XAMPP or WAMP installed
- Web browser (Chrome, Firefox, Edge)
- MySQL database

## Installation Steps

### Step 1: Copy Project Files
Copy the `ecommerce` folder to your web server root:
- XAMPP: `C:\xampp\htdocs\`
- WAMP: `C:\wamp64\www\`

### Step 2: Start Services
1. Open XAMPP/WAMP Control Panel
2. Start Apache
3. Start MySQL

### Step 3: Create Database
1. Open phpMyAdmin: http://localhost/phpmyadmin
2. Click "Import" tab
3. Browse and select `database.sql` file
4. Click "Go" to import

### Step 4: Configure Database Connection
Edit `includes/config.php` if needed:
```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'ecommerce_db');
```

### Step 5: Access the Website
Frontend: http://localhost/php-internship-project/ecommerce/
Admin Panel: http://localhost/php-internship-project/ecommerce/admin/

## Demo Credentials

### Admin Login
- Email: admin@ecommerce.com
- Password: admin123

### Customer
- Register a new account at the register page

## Features Included

### Frontend
- Home page with featured products
- Product listing with filters and search
- Product details page
- Shopping cart
- Checkout with multiple payment options
- User profile management
- Order history

### Admin Panel
- Dashboard with statistics
- Product management (CRUD)
- Order management with status updates
- User management

### Security
- Password hashing (bcrypt)
- Prepared statements (SQL injection prevention)
- Session-based authentication
- Input sanitization

## Project Structure
```
ecommerce/
├── admin/           # Admin panel pages
├── api/             # AJAX API endpoints
├── assets/
│   ├── css/         # Stylesheets
│   ├── js/          # JavaScript files
│   └── images/      # Product images
├── includes/        # Core PHP files
│   ├── config.php
│   ├── product_functions.php
│   ├── user_functions.php
│   ├── cart_functions.php
│   └── order_functions.php
├── uploads/         # Uploaded files
├── database.sql     # Database schema
└── README.md        # This file
```

## Troubleshooting

### Database Connection Error
- Ensure MySQL is running
- Check credentials in config.php
- Verify database exists

### 404 Errors
- Ensure Apache mod_rewrite is enabled (if using clean URLs)
- Check file paths are correct

### Image Not Showing
- Ensure uploads/ folder has write permissions
- Check product image path in database
