import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row className="mb-4">
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="mb-3">ShopEase</h5>
            <p className="text-muted">
              Your one-stop destination for quality products at competitive prices.
              Shop with ease, shop with confidence.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-light">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-light">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-light">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </Col>
          
          <Col md={2} className="mb-4 mb-md-0">
            <h6 className="mb-3">Shop</h6>
            <ul className="list-unstyled">
              <li><Link to="/products" className="text-muted text-decoration-none">All Products</Link></li>
              <li><Link to="/products?category=electronics" className="text-muted text-decoration-none">Electronics</Link></li>
              <li><Link to="/products?category=clothing" className="text-muted text-decoration-none">Clothing</Link></li>
              <li><Link to="/products?category=home" className="text-muted text-decoration-none">Home & Kitchen</Link></li>
            </ul>
          </Col>
          
          <Col md={2} className="mb-4 mb-md-0">
            <h6 className="mb-3">Account</h6>
            <ul className="list-unstyled">
              <li><Link to="/profile" className="text-muted text-decoration-none">My Profile</Link></li>
              <li><Link to="/orders" className="text-muted text-decoration-none">Orders</Link></li>
              <li><Link to="/wishlist" className="text-muted text-decoration-none">Wishlist</Link></li>
              <li><Link to="/cart" className="text-muted text-decoration-none">Shopping Cart</Link></li>
            </ul>
          </Col>
          
          <Col md={4}>
            <h6 className="mb-3">Newsletter</h6>
            <p className="text-muted">Stay updated with our latest offers and products</p>
            <div className="input-group">
              <input 
                type="email" 
                className="form-control" 
                placeholder="Email Address" 
                aria-label="Email Address"
              />
              <button className="btn btn-primary" type="button">Subscribe</button>
            </div>
          </Col>
        </Row>
        
        <hr className="my-4 bg-secondary" />
        
        <Row>
          <Col className="text-center text-md-start">
            <p className="text-muted mb-0">
              © {currentYear} ShopEase. All rights reserved.
            </p>
          </Col>
          <Col className="text-center text-md-end">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <Link to="/privacy" className="text-muted text-decoration-none">Privacy Policy</Link>
              </li>
              <li className="list-inline-item ms-3">
                <Link to="/terms" className="text-muted text-decoration-none">Terms of Service</Link>
              </li>
              <li className="list-inline-item ms-3">
                <Link to="/contact" className="text-muted text-decoration-none">Contact Us</Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;