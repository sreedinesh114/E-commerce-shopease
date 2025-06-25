import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import AdminDashboard from '../components/admin/Dashboard';
import AdminProducts from '../components/admin/Products';
import AdminOrders from '../components/admin/Orders';
import AdminUsers from '../components/admin/Users';

const Admin = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.pathname.includes('/products') ? 'products' :
    location.pathname.includes('/orders') ? 'orders' :
    location.pathname.includes('/users') ? 'users' : 
    'dashboard'
  );

  return (
    <Container fluid className="py-5 mt-5">
      <h1 className="mb-4">Admin Dashboard</h1>
      
      <Tab.Container activeKey={activeTab} onSelect={k => setActiveTab(k)}>
        <Row>
          <Col md={3} lg={2} className="mb-4">
            <div className="bg-light rounded p-3">
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link 
                    as={Link}
                    to="/admin"
                    eventKey="dashboard"
                    className="mb-2"
                  >
                    Dashboard
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    as={Link}
                    to="/admin/products"
                    eventKey="products"
                    className="mb-2"
                  >
                    Products
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    as={Link}
                    to="/admin/orders"
                    eventKey="orders"
                    className="mb-2"
                  >
                    Orders
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    as={Link}
                    to="/admin/users"
                    eventKey="users"
                  >
                    Users
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </Col>
          
          <Col md={9} lg={10}>
            <div className="bg-white rounded p-4 shadow-sm">
              <Routes>
                <Route index element={<AdminDashboard />} />
                <Route path="products/*" element={<AdminProducts />} />
                <Route path="orders/*" element={<AdminOrders />} />
                <Route path="users/*" element={<AdminUsers />} />
              </Routes>
            </div>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default Admin;