import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(id ? true : false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    brand: '',
    inStock: true,
    image: '',
    images: [''],
    features: [''],
    specifications: [{ name: '', value: '' }]
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      // In a real application, you would fetch this product from your API
      // For demo purposes, we're using placeholder data
      
      // Simulate API call
      setTimeout(() => {
        const productData = {
          id: '1',
          name: 'Premium Wireless Headphones',
          description: 'Experience crystal-clear sound with our premium wireless headphones. Features include active noise cancellation, 30-hour battery life, and a comfortable over-ear design.',
          price: 199.99,
          originalPrice: 249.99,
          category: 'electronics',
          brand: 'Sony',
          inStock: true,
          image: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          images: [
            'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          ],
          features: [
            'Active noise cancellation',
            '30-hour battery life',
            'Bluetooth 5.0 connectivity',
            'Built-in microphone for calls',
            'Comfortable over-ear design'
          ],
          specifications: [
            { name: 'Brand', value: 'Sony' },
            { name: 'Model', value: 'WH-1000XM4' },
            { name: 'Color', value: 'Black' },
            { name: 'Connectivity', value: 'Bluetooth 5.0' },
            { name: 'Battery Life', value: '30 hours' },
            { name: 'Weight', value: '254g' }
          ]
        };
        
        setFormData(productData);
        setLoading(false);
      }, 500);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData(prev => ({
      ...prev,
      features: updatedFeatures
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      features: updatedFeatures
    }));
  };

  const handleSpecChange = (index, field, value) => {
    const updatedSpecs = [...formData.specifications];
    updatedSpecs[index] = {
      ...updatedSpecs[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      specifications: updatedSpecs
    }));
  };

  const addSpecification = () => {
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, { name: '', value: '' }]
    }));
  };

  const removeSpecification = (index) => {
    const updatedSpecs = [...formData.specifications];
    updatedSpecs.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      specifications: updatedSpecs
    }));
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = value;
    setFormData(prev => ({
      ...prev,
      images: updatedImages
    }));
  };

  const addImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const removeImage = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      images: updatedImages
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (formData.price && isNaN(formData.price)) newErrors.price = 'Price must be a number';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.brand) newErrors.brand = 'Brand is required';
    if (!formData.image) newErrors.image = 'Main image URL is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      if (id) {
        // Update product
        // const response = await axios.put(`/api/products/${id}`, formData);
        console.log('Product updated:', formData);
      } else {
        // Create product
        // const response = await axios.post('/api/products', formData);
        console.log('Product created:', formData);
      }
      
      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
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

  return (
    <div>
      <h2 className="mb-4">{id ? 'Edit Product' : 'Add New Product'}</h2>
      
      <Form onSubmit={handleSubmit}>
        <Card className="mb-4">
          <Card.Header>
            <h5 className="mb-0">Basic Information</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    isInvalid={!!errors.brand}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.brand}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price ($)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    isInvalid={!!errors.price}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.price}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Original Price ($) <span className="text-muted">(For discounts)</span></Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    isInvalid={!!errors.category}
                  >
                    <option value="">Select Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="home">Home & Kitchen</option>
                    <option value="beauty">Beauty & Personal Care</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.category}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock Status</Form.Label>
                  <Form.Check
                    type="checkbox"
                    label="In Stock"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>
          </Card.Body>
        </Card>
        
        <Card className="mb-4">
          <Card.Header>
            <h5 className="mb-0">Images</h5>
          </Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>Main Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                isInvalid={!!errors.image}
              />
              <Form.Control.Feedback type="invalid">
                {errors.image}
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Label>Additional Images</Form.Label>
            {formData.images.map((img, index) => (
              <div key={index} className="d-flex mb-2">
                <Form.Control
                  type="text"
                  value={img}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder="Enter image URL"
                  className="me-2"
                />
                <Button 
                  variant="outline-danger"
                  onClick={() => removeImage(index)}
                  disabled={formData.images.length === 1}
                >
                  Remove
                </Button>
              </div>
            ))}
            
            <Button 
              variant="outline-secondary" 
              onClick={addImage}
              className="mt-2"
            >
              Add Image
            </Button>
          </Card.Body>
        </Card>
        
        <Card className="mb-4">
          <Card.Header>
            <h5 className="mb-0">Features</h5>
          </Card.Header>
          <Card.Body>
            {formData.features.map((feature, index) => (
              <div key={index} className="d-flex mb-2">
                <Form.Control
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder="Enter product feature"
                  className="me-2"
                />
                <Button 
                  variant="outline-danger"
                  onClick={() => removeFeature(index)}
                  disabled={formData.features.length === 1}
                >
                  Remove
                </Button>
              </div>
            ))}
            
            <Button 
              variant="outline-secondary" 
              onClick={addFeature}
              className="mt-2"
            >
              Add Feature
            </Button>
          </Card.Body>
        </Card>
        
        <Card className="mb-4">
          <Card.Header>
            <h5 className="mb-0">Specifications</h5>
          </Card.Header>
          <Card.Body>
            {formData.specifications.map((spec, index) => (
              <Row key={index} className="mb-2">
                <Col xs={5}>
                  <Form.Control
                    type="text"
                    value={spec.name}
                    onChange={(e) => handleSpecChange(index, 'name', e.target.value)}
                    placeholder="Specification name"
                  />
                </Col>
                <Col xs={5}>
                  <Form.Control
                    type="text"
                    value={spec.value}
                    onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                    placeholder="Specification value"
                  />
                </Col>
                <Col xs={2}>
                  <Button 
                    variant="outline-danger"
                    onClick={() => removeSpecification(index)}
                    disabled={formData.specifications.length === 1}
                    className="w-100"
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            ))}
            
            <Button 
              variant="outline-secondary" 
              onClick={addSpecification}
              className="mt-2"
            >
              Add Specification
            </Button>
          </Card.Body>
        </Card>
        
        <div className="d-flex gap-2">
          <Button variant="secondary" onClick={() => navigate('/admin/products')}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {id ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ProductForm;