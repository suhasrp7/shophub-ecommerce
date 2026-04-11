import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="text-white mb-3">
              <i className="fas fa-shopping-bag me-2"></i>
              ShopHub
            </h5>
            <p className="text-white-50">
              Your one-stop destination for premium electronics, accessories, and more. 
              Quality products at competitive prices with excellent customer service.
            </p>
            <div className="d-flex gap-3">
              <a href="#"><i className="fab fa-facebook fa-lg"></i></a>
              <a href="#"><i className="fab fa-twitter fa-lg"></i></a>
              <a href="#"><i className="fab fa-instagram fa-lg"></i></a>
              <a href="#"><i className="fab fa-linkedin fa-lg"></i></a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="text-white mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="text-white mb-3">Contact Info</h6>
            <ul className="list-unstyled text-white-50">
              <li className="mb-2">
                <i className="fas fa-phone me-2"></i>
                +1 (555) 123-4567
              </li>
              <li className="mb-2">
                <i className="fas fa-envelope me-2"></i>
                support@shophub.com
              </li>
              <li className="mb-2">
                <i className="fas fa-map-marker-alt me-2"></i>
                123 Commerce Street, NY
              </li>
            </ul>
          </div>
          
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="text-white mb-3">Business Hours</h6>
            <ul className="list-unstyled text-white-50">
              <li className="mb-2">Monday - Friday: 9AM - 6PM</li>
              <li className="mb-2">Saturday: 10AM - 4PM</li>
              <li className="mb-2">Sunday: Closed</li>
            </ul>
          </div>
        </div>
        
        <hr className="bg-secondary" />
        
        <div className="text-center text-white-50">
          <p className="mb-0">&copy; {new Date().getFullYear()} ShopHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
