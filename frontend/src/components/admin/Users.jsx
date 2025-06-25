import { useState, useEffect } from 'react';
import { Table, Badge, Button, Form, InputGroup, Modal } from 'react-bootstrap';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState({
    id: '',
    name: '',
    email: '',
    isAdmin: false
  });

  useEffect(() => {
    // In a real application, you would fetch this data from your API
    // For demo purposes, we're using placeholder data
    
    const usersData = [
      {
        id: '1',
        name: 'John Smith',
        email: 'john@example.com',
        isAdmin: true,
        createdAt: '2025-01-15T12:00:00Z'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        isAdmin: false,
        createdAt: '2025-02-20T10:30:00Z'
      },
      {
        id: '3',
        name: 'Michael Brown',
        email: 'michael@example.com',
        isAdmin: false,
        createdAt: '2025-03-05T09:15:00Z'
      },
      {
        id: '4',
        name: 'Emily Davis',
        email: 'emily@example.com',
        isAdmin: false,
        createdAt: '2025-03-10T14:45:00Z'
      },
      {
        id: '5',
        name: 'David Wilson',
        email: 'david@example.com',
        isAdmin: false,
        createdAt: '2025-04-01T11:20:00Z'
      }
    ];
    
    setUsers(usersData);
    setLoading(false);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      // In a real application, you would make an API call to delete the user
      // For demo purposes, we're just filtering the local state
      setUsers(users.filter(u => u.id !== userToDelete.id));
      setShowDeleteModal(false);
      setUserToDelete(null);
      // Show success message
    } catch (error) {
      console.error('Error deleting user:', error);
      // Show error message
    }
  };

  const handleEditClick = (user) => {
    setEditUser({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditUser(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEditSubmit = async () => {
    try {
      // In a real application, you would make an API call to update the user
      // For demo purposes, we're just updating the local state
      setUsers(users.map(u => 
        u.id === editUser.id ? { ...u, ...editUser } : u
      ));
      setShowEditModal(false);
      // Show success message
    } catch (error) {
      console.error('Error updating user:', error);
      // Show error message
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <h2 className="mb-4">Users</h2>
      
      <div className="mb-4">
        <InputGroup>
          <Form.Control
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <Button variant="outline-secondary">
            <i className="bi bi-search"></i>
          </Button>
        </InputGroup>
      </div>
      
      <div className="table-responsive">
        <Table hover bordered className="align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Joined Date</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6\" className="text-center py-4">
                  No users found matching your criteria.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>#{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Badge bg={user.isAdmin ? 'danger' : 'info'}>
                      {user.isAdmin ? 'Admin' : 'Customer'}
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEditClick(user)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDeleteClick(user)}
                        disabled={user.isAdmin} // Prevent deleting admin users
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
      
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the user <strong>{userToDelete?.name}</strong>? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Edit User Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editUser.name}
                onChange={handleEditChange}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editUser.email}
                onChange={handleEditChange}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Admin Privileges"
                name="isAdmin"
                checked={editUser.isAdmin}
                onChange={handleEditChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;