import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Badge, Form, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { currentUser, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar 
      expand="lg" 
      fixed="top" 
      className={`transition-all duration-300 ${
        scrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <span className="fw-bold fs-4 text-primary">ShopEase</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
          </Nav>

          <Form className="d-flex mx-auto" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search products..."
              className="me-2 rounded-pill"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '300px' }}
            />
            <Button 
              variant="outline-primary" 
              type="submit" 
              className="rounded-pill"
            >
              Search
            </Button>
          </Form>

          <Nav>
            <Nav.Link as={Link} to="/cart" className="position-relative me-2">
              Cart
              {itemCount > 0 && (
                <Badge 
                  bg="primary" 
                  pill 
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {itemCount}
                </Badge>
              )}
            </Nav.Link>

            {currentUser ? (
              <NavDropdown title={currentUser.name || "Account"} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/profile">My Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/orders">My Orders</NavDropdown.Item>
                {currentUser.isAdmin && (
                  <NavDropdown.Item as={Link} to="/admin">Admin Dashboard</NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;