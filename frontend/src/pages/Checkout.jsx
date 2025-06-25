import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  
  // Shipping address form
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: ''
  });
  
  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState('credit');
  
  // Form validation state
  const [validated, setValidated] = useState(false);
  
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  
  const handleShippingSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    setStep(2);
  };
  
  const handlePlaceOrder = async () => {
    try {
      // In a real application, you would make an API call to create the order
      // For demo purposes, we're just simulating an order creation
      
      // Simulate API request delay
      setTimeout(() => {
        const newOrderId = `ORD-${Date.now().toString().slice(-8)}`;
        setOrderId(newOrderId);
        setOrderComplete(true);
        clearCart();
      }, 1500);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };
  
  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  // Calculate costs
  const shippingCost = totalPrice > 100 ? 0 : 10;
  const taxRate = 0.1; // 10%
  const taxCost = totalPrice * taxRate;
  const finalAmount = totalPrice + shippingCost + taxCost;
  
  if (!cartItems.length && !orderComplete) {
    return (
      <Container className="py-5 mt-5">
        <Alert variant="warning">
          Your cart is empty. Please add some products before proceeding to checkout.
        </Alert>
        <Button 
          variant="primary" 
          onClick={() => navigate('/products')}
        >
          Continue Shopping
        </Button>
      </Container>
    );
  }
  
  if (orderComplete) {
    return (
      <Container className="py-5 mt-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="text-center p-5">
                <div className="mb-4">
                  <span className="display-1 text-success">✓</span>
                </div>
                <h2 className="mb-4">Order Placed Successfully!</h2>
                <p className="mb-3">
                  Thank you for your purchase. Your order has been received and is being processed.
                </p>
                <p className="mb-4">
                  Your order number is: <strong>{orderId}</strong>
                </p>
                <p className="text-muted mb-4">
                  You will receive an email confirmation shortly.
                </p>
                <div className="d-grid gap-3">
                  <Button 
                    variant="primary" 
                    onClick={() => navigate('/products')}
                    size="lg"
                  >
                    Continue Shopping
                  </Button>
                  <Button 
                    variant="outline-primary" 
                    onClick={() => navigate('/orders')}
                  >
                    View My Orders
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
  
  return (
    <Container className="py-5 mt-5">
      <h1 className="mb-4">Checkout</h1>
      
      <Row>
        <Col lg={8} className="mb-4">
          {/* Checkout Steps */}
          <div className="d-flex mb-4">
            <div className={`checkout-step ${step >= 1 ? 'active' : ''}`}>
              <div className="step-number">1</div>
              <div className="step-title">Shipping</div>
            </div>
            <div className="checkout-connector"></div>
            <div className={`checkout-step ${step >= 2 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <div className="step-title">Payment</div>
            </div>
          </div>
          
          {/* Step 1: Shipping */}
          {step === 1 && (
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white">
                <h5 className="mb-0">Shipping Address</h5>
              </Card.Header>
              <Card.Body>
                <Form noValidate validated={validated} onSubmit={handleShippingSubmit}>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group controlId="fullName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="fullName"
                          value={shippingAddress.fullName}
                          onChange={handleShippingChange}
                          placeholder="Enter your full name"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter your full name.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group controlId="phone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          required
                          type="tel"
                          name="phone"
                          value={shippingAddress.phone}
                          onChange={handleShippingChange}
                          placeholder="Enter your phone number"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter a valid phone number.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="address"
                      value={shippingAddress.address}
                      onChange={handleShippingChange}
                      placeholder="Enter your street address"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your address.
                    </Form.Control.Feedback>
                  </Form.Group>
                  
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="city"
                          value={shippingAddress.city}
                          onChange={handleShippingChange}
                          placeholder="Enter your city"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter your city.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group controlId="postalCode">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="postalCode"
                          value={shippingAddress.postalCode}
                          onChange={handleShippingChange}
                          placeholder="Enter your postal code"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter your postal code.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-4" controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Select
                      required
                      name="country"
                      value={shippingAddress.country}
                      onChange={handleShippingChange}
                    >
                      <option value="">Select a country</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please select your country.
                    </Form.Control.Feedback>
                  </Form.Group>
                  
                  <div className="d-flex justify-content-between">
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => navigate('/cart')}
                    >
                      Back to Cart
                    </Button>
                    <Button 
                      variant="primary" 
                      type="submit"
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          )}
          
          {/* Step 2: Payment */}
          {step === 2 && (
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white">
                <h5 className="mb-0">Payment Method</h5>
              </Card.Header>
              <Card.Body>
                <Form className="mb-4">
                  <div className="mb-3">
                    <Form.Check
                      type="radio"
                      id="credit"
                      label="Credit/Debit Card"
                      name="paymentMethod"
                      value="credit"
                      checked={paymentMethod === 'credit'}
                      onChange={handlePaymentMethodChange}
                      className="mb-2"
                    />
                    {paymentMethod === 'credit' && (
                      <Card className="mb-3 mt-2 border">
                        <Card.Body>
                          <Row>
                            <Col md={12} className="mb-3">
                              <Form.Group>
                                <Form.Label>Card Number</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="1234 5678 9012 3456"
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                              <Form.Group>
                                <Form.Label>Expiry Date</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="MM/YY"
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                              <Form.Group>
                                <Form.Label>CVV</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="123"
                                />
                              </Form.Group>
                            </Col>
                            <Col md={12}>
                              <Form.Group>
                                <Form.Label>Name on Card</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="John Smith"
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    )}
                    
                    <Form.Check
                      type="radio"
                      id="paypal"
                      label="PayPal"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={handlePaymentMethodChange}
                      className="mb-2"
                    />
                    
                    <Form.Check
                      type="radio"
                      id="cash"
                      label="Cash on Delivery"
                      name="paymentMethod"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={handlePaymentMethodChange}
                    />
                  </div>
                </Form>
                
                <div className="d-flex justify-content-between">
                  <Button 
                    variant="outline-secondary" 
                    onClick={goBack}
                  >
                    Back to Shipping
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </Button>
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>
        
        <Col lg={4}>
          {/* Order Summary */}
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="d-flex justify-content-between mb-2">
                    <div>
                      <span>{item.quantity} x </span>
                      <span className="text-truncate" style={{maxWidth: '150px', display: 'inline-block'}}>
                        {item.name}
                      </span>
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <hr />
              
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
              <div className="d-flex justify-content-between mb-2">
                <span>Tax (10%):</span>
                <span>${taxCost.toFixed(2)}</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-0 fw-bold">
                <span>Total:</span>
                <span className="text-primary">${finalAmount.toFixed(2)}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;