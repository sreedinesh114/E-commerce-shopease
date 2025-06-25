import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Tab, Nav, Table, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { currentUser, error } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [formErrors, setFormErrors] = useState({});
  
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: currentUser.name || '',
        email: currentUser.email || ''
      }));
    }
    
    // Fetch user orders
    // In a real application, you would fetch this from your API
    // For demo purposes, we're using placeholder data
    
    const ordersData = [
      {
        id: '1001',
        date: '2025-05-10',
        total: 129.99,
        status: 'Delivered',
        items: 2
      },
      {
        id: '1002',
        date: '2025-04-25',
        total: 239.47,
        status: 'Processing',
        items: 3
      },
      {
        id: '1003',
        date: '2025-03-18',
        total: 99.99,
        status: 'Delivered',
        items: 1
      }
    ];
    
    setOrders(ordersData);
    setLoading(false);
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear success message and error when user types
    if (success) setSuccess('');
    
    // Clear specific field error
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    // Only validate password fields if user is trying to change password
    if (formData.currentPassword || formData.newPassword || formData.confirmPassword) {
      if (!formData.currentPassword) {
        errors.currentPassword = 'Current password is required';
      }
      
      if (!formData.newPassword) {
        errors.newPassword = 'New password is required';
      } else if (formData.newPassword.length < 6) {
        errors.newPassword = 'New password must be at least 6 characters';
      }
      
      if (formData.newPassword !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      // In a real application, you would make an API call to update the user's profile
      // For demo purposes, we're just showing a success message
      
      setSuccess('Profile updated successfully!');
      
      // Clear password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'Delivered': 'success',
      'Shipped': 'info',
      'Processing': 'warning',
      'Cancelled': 'danger'
    };
    
    return (
      <Badge bg={statusMap[status] || 'secondary'}>
        {status}
      </Badge>
    );
  };

  return (
    <Container className="py-5 mt-5">
      <h1 className="mb-4">My Account</h1>
      
      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Row>
          <Col md={3} lg={3} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-0">
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="profile"
                      className="rounded-0 border-bottom px-4 py-3"
                    >
                      Profile Information
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="orders"
                      className="rounded-0 border-bottom px-4 py-3"
                    >
                      Order History
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={9} lg={9}>
            <Tab.Content>
              <Tab.Pane eventKey="profile">
                <Card className="border-0 shadow-sm">
                  <Card.Header className="bg-white">
                    <h5 className="mb-0">Profile Information</h5>
                  </Card.Header>
                  <Card.Body>
                    {error && (
                      <Alert variant="danger">
                        {error}
                      </Alert>
                    )}
                    
                    {success && (
                      <Alert variant="success">
                        {success}
                      </Alert>
                    )}
                    
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md={6} className="mb-3">
                          <Form.Group controlId="name">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              isInvalid={!!formErrors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                              {formErrors.name}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        
                        <Col md={6} className="mb-3">
                          <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              isInvalid={!!formErrors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                              {formErrors.email}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <hr className="my-4" />
                      
                      <h5 className="mb-3">Change Password</h5>
                      <p className="text-muted small mb-4">
                        Leave these fields blank if you don't want to change your password.
                      </p>
                      
                      <Row>
                        <Col md={12} className="mb-3">
                          <Form.Group controlId="currentPassword">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control
                              type="password"
                              name="currentPassword"
                              value={formData.currentPassword}
                              onChange={handleChange}
                              isInvalid={!!formErrors.currentPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                              {formErrors.currentPassword}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Row>
                        <Col md={6} className="mb-3">
                          <Form.Group controlId="newPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                              type="password"
                              name="newPassword"
                              value={formData.newPassword}
                              onChange={handleChange}
                              isInvalid={!!formErrors.newPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                              {formErrors.newPassword}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        
                        <Col md={6} className="mb-3">
                          <Form.Group controlId="confirmPassword">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control
                              type="password"
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              isInvalid={!!formErrors.confirmPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                              {formErrors.confirmPassword}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <div className="d-flex justify-content-end mt-4">
                        <Button type="submit" variant="primary">
                          Save Changes
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              
              <Tab.Pane eventKey="orders">
                <Card className="border-0 shadow-sm">
                  <Card.Header className="bg-white">
                    <h5 className="mb-0">Order History</h5>
                  </Card.Header>
                  <Card.Body>
                    {loading ? (
                      <div className="text-center py-3">
                        <div className="spinner-border text-primary\" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : orders.length === 0 ? (
                      <Alert variant="info">
                        You haven't placed any orders yet. <Link to="/products">Start shopping</Link>
                      </Alert>
                    ) : (
                      <div className="table-responsive">
                        <Table hover className="align-middle mb-0">
                          <thead>
                            <tr>
                              <th>Order ID</th>
                              <th>Date</th>
                              <th>Items</th>
                              <th>Total</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders.map((order) => (
                              <tr key={order.id}>
                                <td>#{order.id}</td>
                                <td>{new Date(order.date).toLocaleDateString()}</td>
                                <td>{order.items}</td>
                                <td>${order.total.toFixed(2)}</td>
                                <td>{getStatusBadge(order.status)}</td>
                                <td>
                                  <Button 
                                    as={Link} 
                                    to={`/orders/${order.id}`} 
                                    variant="outline-primary" 
                                    size="sm"
                                  >
                                    Details
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default Profile;