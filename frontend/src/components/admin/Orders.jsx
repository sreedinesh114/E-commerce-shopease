import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Table, Badge, Button, Form, InputGroup } from 'react-bootstrap';
import OrderDetails from './OrderDetails';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // In a real application, you would fetch this data from your API
    // For demo purposes, we're using placeholder data
    
    const ordersData = [
      {
        id: '1001',
        customer: 'John Smith',
        email: 'john@example.com',
        date: '2025-05-15',
        total: 129.99,
        status: 'Delivered',
        items: 2
      },
      {
        id: '1002',
        customer: 'Sarah Johnson',
        email: 'sarah@example.com',
        date: '2025-05-14',
        total: 239.47,
        status: 'Processing',
        items: 3
      },
      {
        id: '1003',
        customer: 'Michael Brown',
        email: 'michael@example.com',
        date: '2025-05-14',
        total: 99.99,
        status: 'Shipped',
        items: 1
      },
      {
        id: '1004',
        customer: 'Emily Davis',
        email: 'emily@example.com',
        date: '2025-05-13',
        total: 189.95,
        status: 'Delivered',
        items: 2
      },
      {
        id: '1005',
        customer: 'David Wilson',
        email: 'david@example.com',
        date: '2025-05-12',
        total: 59.99,
        status: 'Cancelled',
        items: 1
      }
    ];
    
    setOrders(ordersData);
    setLoading(false);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
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

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = filterStatus ? order.status === filterStatus : true;
    
    return matchesSearch && matchesStatus;
  });

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
    <Routes>
      <Route
        index
        element={
          <div>
            <h2 className="mb-4">Orders</h2>
            
            <div className="d-flex flex-column flex-md-row gap-3 mb-4">
              <div className="flex-grow-1">
                <InputGroup>
                  <Form.Control
                    placeholder="Search by order ID or customer name..."
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <Button variant="outline-secondary">
                    <i className="bi bi-search"></i>
                  </Button>
                </InputGroup>
              </div>
              
              <div style={{ width: '200px' }}>
                <Form.Select
                  value={filterStatus}
                  onChange={handleStatusChange}
                >
                  <option value="">All Statuses</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </Form.Select>
              </div>
            </div>
            
            <div className="table-responsive">
              <Table hover bordered className="align-middle">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="7\" className="text-center py-4">
                        No orders found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>
                          <div>{order.customer}</div>
                          <small className="text-muted">{order.email}</small>
                        </td>
                        <td>{new Date(order.date).toLocaleDateString()}</td>
                        <td>{order.items}</td>
                        <td>${order.total.toFixed(2)}</td>
                        <td>{getStatusBadge(order.status)}</td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => navigate(`/admin/orders/${order.id}`)}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        }
      />
      <Route path=":id" element={<OrderDetails />} />
    </Routes>
  );
};

export default Orders;