import { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch this data from your API
    // For demo purposes, we're using placeholder data
    
    const dashboardData = {
      totalSales: 15789.47,
      totalOrders: 124,
      totalProducts: 48,
      totalUsers: 254,
      recentOrders: [
        { id: '1001', customer: 'John Smith', date: '2025-05-15', total: 129.99, status: 'Delivered' },
        { id: '1002', customer: 'Sarah Johnson', date: '2025-05-14', total: 239.47, status: 'Processing' },
        { id: '1003', customer: 'Michael Brown', date: '2025-05-14', total: 99.99, status: 'Shipped' },
        { id: '1004', customer: 'Emily Davis', date: '2025-05-13', total: 189.95, status: 'Delivered' },
        { id: '1005', customer: 'David Wilson', date: '2025-05-12', total: 59.99, status: 'Delivered' },
      ]
    };
    
    setStats(dashboardData);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Dashboard Overview</h2>
      
      {/* Stats Cards */}
      <Row className="mb-4">
        <Col sm={6} xl={3} className="mb-4 mb-xl-0">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h6 className="text-muted mb-1">Total Sales</h6>
                  <h3 className="mb-0">${stats.totalSales.toLocaleString()}</h3>
                </div>
                <div className="bg-primary bg-opacity-10 p-3 rounded">
                  <i className="bi bi-currency-dollar text-primary"></i>
                </div>
              </div>
              <div className="mt-auto">
                <small className="text-success">
                  <i className="bi bi-arrow-up me-1"></i>
                  12.5% from last month
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col sm={6} xl={3} className="mb-4 mb-xl-0">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h6 className="text-muted mb-1">Total Orders</h6>
                  <h3 className="mb-0">{stats.totalOrders}</h3>
                </div>
                <div className="bg-success bg-opacity-10 p-3 rounded">
                  <i className="bi bi-bag-check text-success"></i>
                </div>
              </div>
              <div className="mt-auto">
                <small className="text-success">
                  <i className="bi bi-arrow-up me-1"></i>
                  8.2% from last month
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col sm={6} xl={3} className="mb-4 mb-sm-0">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h6 className="text-muted mb-1">Total Products</h6>
                  <h3 className="mb-0">{stats.totalProducts}</h3>
                </div>
                <div className="bg-warning bg-opacity-10 p-3 rounded">
                  <i className="bi bi-box text-warning"></i>
                </div>
              </div>
              <div className="mt-auto">
                <small className="text-success">
                  <i className="bi bi-arrow-up me-1"></i>
                  3.1% from last month
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col sm={6} xl={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h6 className="text-muted mb-1">Total Users</h6>
                  <h3 className="mb-0">{stats.totalUsers}</h3>
                </div>
                <div className="bg-info bg-opacity-10 p-3 rounded">
                  <i className="bi bi-people text-info"></i>
                </div>
              </div>
              <div className="mt-auto">
                <small className="text-success">
                  <i className="bi bi-arrow-up me-1"></i>
                  5.7% from last month
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Recent Orders */}
      <Card className="border-0 shadow-sm mt-4">
        <Card.Header className="bg-white py-3">
          <h5 className="mb-0">Recent Orders</h5>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>
                      <span className={`badge bg-${
                        order.status === 'Delivered' ? 'success' :
                        order.status === 'Shipped' ? 'info' :
                        order.status === 'Processing' ? 'warning' : 'danger'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Dashboard;