import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Breadcrumb, Tabs, Tab, Form, ListGroup, Badge } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // In a real application, this would fetch from your API
        // For demo purposes, we're using placeholder data
        
        // Simulated product data
        const productData = {
          id: '1',
          name: 'Premium Wireless Headphones',
          description: 'Experience crystal-clear sound with our premium wireless headphones. Features include active noise cancellation, 30-hour battery life, and a comfortable over-ear design. Perfect for music enthusiasts and professionals alike.',
          price: 199.99,
          originalPrice: 249.99,
          category: 'electronics',
          brand: 'Sony',
          rating: 4.7,
          reviewCount: 124,
          inStock: true,
          freeShipping: true,
          features: [
            'Active noise cancellation',
            '30-hour battery life',
            'Bluetooth 5.0 connectivity',
            'Built-in microphone for calls',
            'Comfortable over-ear design'
          ],
          images: [
            'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          ],
          specifications: [
            { name: 'Brand', value: 'Sony' },
            { name: 'Model', value: 'WH-1000XM4' },
            { name: 'Color', value: 'Black' },
            { name: 'Connectivity', value: 'Bluetooth 5.0' },
            { name: 'Battery Life', value: '30 hours' },
            { name: 'Weight', value: '254g' }
          ],
          reviews: [
            { 
              id: 1, 
              user: 'John D.', 
              rating: 5, 
              date: '2025-05-10', 
              comment: "Best headphones I've ever owned. The noise cancellation is incredible."
            },
            { 
              id: 2, 
              user: 'Sarah M.', 
              rating: 4, 
              date: '2025-04-22', 
              comment: "Great sound quality but they're a bit heavy for extended wear."
            },
            { 
              id: 3, 
              user: 'Michael T.', 
              rating: 5, 
              date: '2025-04-15', 
              comment: 'Worth every penny! The battery life is amazing.'
            }
          ]
        };
        
        // Simulated related products
        const relatedProductsData = [
          {
            id: '2',
            name: 'Noise Cancelling Earbuds',
            description: 'Compact earbuds with impressive noise cancellation.',
            price: 149.99,
            originalPrice: 179.99,
            image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rating: 4.5,
            inStock: true
          },
          {
            id: '5',
            name: 'Bluetooth Speaker',
            description: 'Portable speaker with 360° sound and 20-hour battery life.',
            price: 129.99,
            originalPrice: 159.99,
            image: 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rating: 4.4,
            inStock: true
          },
          {
            id: '7',
            name: 'Wireless Charging Pad',
            description: 'Fast wireless charging for all Qi-compatible devices.',
            price: 29.99,
            originalPrice: 39.99,
            image: 'https://images.pexels.com/photos/3082341/pexels-photo-3082341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rating: 4.2,
            inStock: true
          }
        ];
        
        setProduct(productData);
        setRelatedProducts(relatedProductsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  if (loading) {
    return (
      <Container className="py-5 mt-5">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-5 mt-5">
        <div className="text-center">
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist or has been removed.</p>
          <Button as={Link} to="/products" variant="primary">
            Back to Products
          </Button>
        </div>
      </Container>
    );
  }

  // Calculate discount percentage
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <Container className="py-4 mt-5">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Home</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/products' }}>Products</Breadcrumb.Item>
        <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
      </Breadcrumb>
      
      <Row>
        {/* Product Images */}
        <Col md={6} className="mb-4">
          <div className="product-image-main mb-3 border rounded">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name}
              className="img-fluid"
              style={{ width: '100%', height: '400px', objectFit: 'contain' }}
            />
          </div>
          
          <Row>
            {product.images.map((img, idx) => (
              <Col xs={4} key={idx}>
                <div 
                  className={`product-image-thumbnail border ${selectedImage === idx ? 'border-primary' : ''}`}
                  onClick={() => setSelectedImage(idx)}
                  style={{ cursor: 'pointer' }}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} view ${idx + 1}`} 
                    className="img-fluid"
                    style={{ height: '100px', objectFit: 'cover', width: '100%' }}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </Col>
        
        {/* Product Details */}
        <Col md={6}>
          <h1 className="mb-2">{product.name}</h1>
          
          <div className="d-flex align-items-center mb-3">
            <div className="text-warning me-2">
              {Array.from({ length: 5 }).map((_, idx) => (
                <span key={idx}>
                  {idx < Math.floor(product.rating) ? '★' : idx < product.rating ? '★' : '☆'}
                </span>
              ))}
            </div>
            <span className="text-muted">
              {product.rating.toFixed(1)} ({product.reviewCount} reviews)
            </span>
          </div>
          
          <div className="mb-3">
            <span className="fs-3 fw-bold text-primary me-2">
              ${product.price.toFixed(2)}
            </span>
            {discountPercentage > 0 && (
              <>
                <span className="text-muted text-decoration-line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <Badge bg="danger" className="ms-2">
                  {discountPercentage}% OFF
                </Badge>
              </>
            )}
          </div>
          
          <p className="mb-4">{product.description}</p>
          
          <div className="d-flex align-items-center mb-4">
            <Badge bg={product.inStock ? 'success' : 'danger'} className="me-2">
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </Badge>
            {product.freeShipping && (
              <Badge bg="info">Free Shipping</Badge>
            )}
          </div>
          
          <div className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <Form.Label htmlFor="quantity" className="me-3 mb-0">Quantity:</Form.Label>
              <Form.Control
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                style={{ width: '80px' }}
                className="me-3"
              />
              <Button 
                variant="primary" 
                size="lg" 
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-grow-1"
              >
                Add to Cart
              </Button>
            </div>
          </div>
          
          <hr className="my-4" />
          
          <div className="mb-3">
            <strong>Brand:</strong> {product.brand}
          </div>
          <div className="mb-3">
            <strong>Category:</strong> {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </div>
          
          <div className="mb-4">
            <h5 className="mb-3">Key Features:</h5>
            <ul className="mb-0">
              {product.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
      
      {/* Tabs for additional information */}
      <div className="mt-5">
        <Tabs 
          defaultActiveKey="details" 
          id="product-tabs" 
          className="mb-4"
        >
          <Tab eventKey="details" title="Specifications">
            <ListGroup variant="flush">
              {product.specifications.map((spec, idx) => (
                <ListGroup.Item key={idx} className="d-flex justify-content-between">
                  <span className="text-muted">{spec.name}</span>
                  <span>{spec.value}</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Tab>
          
          <Tab eventKey="reviews" title={`Reviews (${product.reviewCount})`}>
            <div className="mb-4">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-bottom pb-3 mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <h6 className="mb-0">{review.user}</h6>
                    <small className="text-muted">{review.date}</small>
                  </div>
                  <div className="text-warning mb-2">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <span key={idx}>
                        {idx < review.rating ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                  <p className="mb-0">{review.comment}</p>
                </div>
              ))}
              
              <Button variant="outline-primary" className="mt-3">
                Write a Review
              </Button>
            </div>
          </Tab>
        </Tabs>
      </div>
      
      {/* Related Products */}
      <div className="mt-5">
        <h3 className="mb-4">You May Also Like</h3>
        <Row>
          {relatedProducts.map((product) => (
            <Col key={product.id} sm={6} md={4} className="mb-4">
              <div className="product-card h-100 border rounded shadow-sm">
                <Link 
                  to={`/products/${product.id}`}
                  className="d-block text-decoration-none"
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'contain' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-truncate">{product.name}</h5>
                    <p className="card-text text-muted">
                      ${product.price.toFixed(2)}
                      {product.originalPrice && (
                        <span className="text-decoration-line-through ms-2">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </p>
                    <div className="text-warning">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <span key={idx}>
                          {idx < Math.floor(product.rating) ? '★' : idx < product.rating ? '★' : '☆'}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default ProductDetails;