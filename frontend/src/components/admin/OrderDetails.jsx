import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, Row, Col, ListGroup, Badge, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');

  useEffect(() => {
    // In a real application, you would fetch this data from your API
    // For demo purposes, we're using placeholder data
    
    const orderData = {
      id: '1002',
      customer: {
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '(555) 123-4567'
      },
      date: '2025-05-14T15:30:00Z',
      status: 'Processing',
      paymentMethod: 'Credit Card',
      isPaid: true,
      paidAt: '2025-05-14T15:30:00Z',
      isDelivered: false,
      items: [
        {
          id: '1',
          name: 'Premium Wireless Headphones',
          image: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          price: 199.99,
          quantity: 1
        },
        {
          id: '5',
          name: 'Ultra HD Smart TV 55"',
          image: 'https://images.pexels.com/photos/5552789/pexels-photo-5552789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          price: 699.99,
          quantity: 1
        }
      ],
      shippingAddress: {
        address: '123 Main St',
        city: 'Boston',
        postalCode: '02108',
        country: 'United States'
      },
      itemsPrice: 899.98,
      shippingPrice: 0.00,
      taxPrice: 89.99,
      totalPrice: 989.97
    };
    
    setOrder(orderData);
    setStatus(orderData.status);
    setLoading(false);
  }, [id]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const updateOrderStatus = async () => {
    try {
      // In a real application, you would make an API call to update the order
      // For demo purposes, we're just updating the local state
      setOrder(prev => ({
        ...prev,
        status
      }));
      
      // Show success message
    } catch (error) {
      console.error('Error updating order status:', error);
      // Show error message
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center">
        <h3>Order not found</h3>
        <Button 
          as={Link} 
          to="/admin/orders" 
          variant="primary" 
          className="mt-3"
        >
          Back to Orders
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Order #{order.id}</h2>
        <Button 
          variant="outline-primary" 
          as={Link} 
          to="/admin/orders"
        >
          Back to Orders
        </Button>
      </div>
      
      <Row>
        <Col lg={8}>
          {/* Order Items */}
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Order Items</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <ListGroup variant="flush">
                {order.items.map((item) => (
                  <ListGroup.Item key={item.id} className="py-3">
                    <div className="d-flex">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                        className="me-3"
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{item.name}</h6>
                        <div className="d-flex justify-content-between">
                          <span>
                            {item.quantity} x ${item.price.toFixed(2)}
                          </span>
                          <span className="fw-bold">
                            ${(item.quantity * item.price).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
          
          {/* Customer Information */}
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Customer Information</h5>
            </Card.Header>
            <Card.Body>
              <p className="mb-1"><strong>Name:</strong> {order.customer.name}</p>
              <p className="mb-1"><strong>Email:</strong> {order.customer.email}</p>
              <p className="mb-0"><strong>Phone:</strong> {order.customer.phone}</p>
            </Card.Body>
          </Card>
          
          {/* Shipping Information */}
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Shipping Information</h5>
            </Card.Header>
            <Card.Body>
              <p className="mb-1">
                <strong>Address:</strong> {order.shippingAddress.address}
              </p>
              <p className="mb-1">
                <strong>City:</strong> {order.shippingAddress.city}
              </p>
              <p className="mb-1">
                <strong>Postal Code:</strong> {order.shippingAddress.postalCode}
              </p>
              <p className="mb-0">
                <strong>Country:</strong> {order.shippingAddress.country}
              </p>
              
              <div className="mt-3">
                <Badge bg={order.isDelivered ? 'success' : 'warning'}>
                  {order.isDelivered ? 'Delivered' : 'Not Delivered'}
                </Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          {/* Order Summary */}
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush" className="mb-3">
                <ListGroup.Item className="d-flex justify-content-between px-0">
                  <span>Items:</span>
                  <span>${order.itemsPrice.toFixed(2)}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between px-0">
                  <span>Shipping:</span>
                  <span>${order.shippingPrice.toFixed(2)}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between px-0">
                  <span>Tax:</span>
                  <span>${order.taxPrice.toFixed(2)}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between px-0 fw-bold">
                  <span>Total:</span>
                  <span>${order.totalPrice.toFixed(2)}</span>
                </ListGroup.Item>
              </ListGroup>
              
              <div className="d-flex align-items-center mb-3">
                <Badge 
                  bg={order.isPaid ? 'success' : 'danger'}
                  className="me-2"
                >
                  {order.isPaid ? 'Paid' : 'Not Paid'}
                </Badge>
                
                {order.isPaid && (
                  <small className="text-muted">
                    Paid on {new Date(order.paidAt).toLocaleDateString()}
                  </small>
                )}
              </div>
              
              <div className="mb-3">
                <p className="mb-1"><strong>Payment Method:</strong></p>
                <p>{order.paymentMethod}</p>
              </div>
            </Card.Body>
          </Card>
          
          {/* Update Status */}
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Update Status</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Order Status</Form.Label>
                <Form.Select
                  value={status}
                  onChange={handleStatusChange}
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </Form.Select>
              </Form.Group>
              
              <Button 
                variant="primary" 
                onClick={updateOrderStatus}
                className="w-100"
              >
                Update Status
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderDetails;