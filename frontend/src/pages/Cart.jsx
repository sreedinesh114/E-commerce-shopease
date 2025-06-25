import { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) newQuantity = 1;
    updateQuantity(id, newQuantity);
  };

  const applyCoupon = () => {
    // In a real app, this would validate the coupon with the backend
    if (couponCode.toLowerCase() === 'discount20') {
      setDiscount(totalPrice * 0.2);
      setCouponApplied(true);
    } else {
      setDiscount(0);
      setCouponApplied(false);
      alert('Invalid coupon code');
    }
  };

  const proceedToCheckout = () => {
    if (currentUser) {
      navigate('/checkout');
    } else {
      navigate('/login?redirect=checkout');
    }
  };

  // Calculate shipping cost
  const shippingCost = totalPrice > 100 ? 0 : 10;
  
  // Calculate final amount
  const finalAmount = totalPrice + shippingCost - discount;

  return (
    <Container className="py-5 mt-4">
      <h1 className="mb-4">Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <img 
            src="https://images.pexels.com/photos/2872879/pexels-photo-2872879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Empty Cart"
            style={{ height: '200px', objectFit: 'contain', opacity: 0.5 }}
            className="mb-4"
          />
          <h3>Your cart is empty</h3>
          <p className="text-muted mb-4">Looks like you haven't added any products to your cart yet.</p>
          <Button as={Link} to="/products" variant="primary" size="lg">
            Continue Shopping
          </Button>
        </div>
      ) : (
        <Row>
          {/* Cart Items */}
          <Col lg={8} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white">
                <h5 className="mb-0">Cart Items ({cartItems.length})</h5>
              </Card.Header>
              <Card.Body>
                {cartItems.map((item) => (
                  <div key={item.id} className="d-flex mb-4 pb-4 border-bottom">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                      className="me-3"
                    />
                    
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between mb-2">
                        <h5 className="mb-0">
                          <Link to={`/products/${item.id}`} className="text-decoration-none">
                            {item.name}
                          </Link>
                        </h5>
                        <span className="fw-bold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      
                      <p className="text-muted mb-2 small">{item.description.substring(0, 100)}...</p>
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <Form.Control
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                            className="text-center mx-2"
                            style={{ width: '60px' }}
                          />
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                        
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="d-flex justify-content-between mt-4">
                  <Button 
                    as={Link} 
                    to="/products" 
                    variant="outline-primary"
                  >
                    Continue Shopping
                  </Button>
                  <Button 
                    variant="outline-danger"
                    onClick={() => clearCart()}
                  >
                    Clear Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          {/* Order Summary */}
          <Col lg={4}>
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white">
                <h5 className="mb-0">Order Summary</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span>
                    {shippingCost === 0 
                      ? <span className="text-success">Free</span>
                      : `$${shippingCost.toFixed(2)}`
                    }
                  </span>
                </div>
                
                {couponApplied && (
                  <div className="d-flex justify-content-between mb-2 text-success">
                    <span>Discount:</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                
                <hr />
                
                <div className="d-flex justify-content-between mb-4 fw-bold">
                  <span>Total:</span>
                  <span className="text-primary">${finalAmount.toFixed(2)}</span>
                </div>
                
                <div className="mb-3">
                  <Form.Label>Coupon Code</Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="me-2"
                    />
                    <Button 
                      variant="outline-secondary"
                      onClick={applyCoupon}
                    >
                      Apply
                    </Button>
                  </div>
                  <Form.Text className="text-muted">
                    Try "DISCOUNT20" for 20% off
                  </Form.Text>
                </div>
                
                {totalPrice > 100 && (
                  <Alert variant="success" className="mb-3 py-2">
                    <small>
                      Free shipping on orders over $100!
                    </small>
                  </Alert>
                )}
                
                <Button 
                  variant="primary" 
                  className="w-100"
                  onClick={proceedToCheckout}
                >
                  Proceed to Checkout
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Cart;