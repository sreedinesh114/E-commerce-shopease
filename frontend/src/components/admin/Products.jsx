import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Button, Table, Form, InputGroup, Modal } from 'react-bootstrap';
import axios from 'axios';
import ProductForm from './ProductForm';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    // In a real application, you would fetch this data from your API
    // For demo purposes, we're using placeholder data
    
    const productsData = [
      {
        id: '1',
        name: 'Premium Wireless Headphones',
        price: 199.99,
        category: 'Electronics',
        brand: 'Sony',
        inStock: true
      },
      {
        id: '2',
        name: 'Smart Watch Series 5',
        price: 299.99,
        category: 'Electronics',
        brand: 'Apple',
        inStock: true
      },
      {
        id: '3',
        name: 'Slim Fit Cotton T-Shirt',
        price: 24.99,
        category: 'Clothing',
        brand: 'Nike',
        inStock: true
      },
      {
        id: '4',
        name: 'Professional Chef Knife',
        price: 79.99,
        category: 'Home & Kitchen',
        brand: 'KitchenAid',
        inStock: false
      },
      {
        id: '5',
        name: 'Ultra HD Smart TV 55"',
        price: 699.99,
        category: 'Electronics',
        brand: 'Samsung',
        inStock: true
      }
    ];
    
    setProducts(productsData);
    setLoading(false);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      // In a real application, you would make an API call to delete the product
      // For demo purposes, we're just filtering the local state
      setProducts(products.filter(p => p.id !== productToDelete.id));
      setShowDeleteModal(false);
      setProductToDelete(null);
      // Show success message
    } catch (error) {
      console.error('Error deleting product:', error);
      // Show error message
    }
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
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
    <Routes>
      <Route
        index
        element={
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="mb-0">Products</h2>
              <Button 
                variant="primary" 
                onClick={() => navigate('/admin/products/create')}
              >
                Add New Product
              </Button>
            </div>
            
            <div className="mb-4">
              <InputGroup>
                <Form.Control
                  placeholder="Search products..."
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
                    <th>Price</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td>#{product.id}</td>
                      <td>{product.name}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>
                        <span className={`badge bg-${product.inStock ? 'success' : 'danger'}`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteClick(product)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            
            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete the product 
                <strong>{productToDelete?.name}</strong>? 
                This action cannot be undone.
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
          </div>
        }
      />
      <Route 
        path="create" 
        element={<ProductForm />} 
      />
      <Route 
        path="edit/:id" 
        element={<ProductForm />} 
      />
    </Routes>
  );
};

export default Products;