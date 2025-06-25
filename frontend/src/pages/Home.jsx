import { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real application, you would fetch this data from your API
        // For demo purposes, we're using placeholder data
        
        const featuredProductsData = [
          {
            id: '1',
            name: 'Premium Wireless Headphones',
            description: 'Experience crystal-clear sound with our premium wireless headphones.',
            price: 199.99,
            originalPrice: 249.99,
            image: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rating: 4.7,
            inStock: true,
            category: 'electronics'
          },
          {
            id: '2',
            name: 'Smart Watch Series 5',
            description: 'Track your fitness and stay connected with this sleek smart watch.',
            price: 299.99,
            originalPrice: 349.99,
            image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rating: 4.5,
            inStock: true,
            category: 'electronics'
          },
          {
            id: '3',
            name: 'Slim Fit Cotton T-Shirt',
            description: 'Classic cotton t-shirt with a modern slim fit design.',
            price: 24.99,
            originalPrice: 29.99,
            image: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rating: 4.3,
            inStock: true,
            category: 'clothing'
          },
          {
            id: '4',
            name: 'Professional Chef Knife',
            description: 'High-carbon stainless steel chef knife for precision cutting.',
            price: 79.99,
            originalPrice: 99.99,
            image: 'https://images.pexels.com/photos/4252137/pexels-photo-4252137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rating: 4.8,
            inStock: false,
            category: 'kitchen'
          }
        ];
        
        const categoriesData = [
          {
            name: 'Electronics',
            image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            value: 'electronics'
          },
          {
            name: 'Clothing',
            image: 'https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            value: 'clothing'
          },
          {
            name: 'Home & Kitchen',
            image: 'https://images.pexels.com/photos/6480707/pexels-photo-6480707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            value: 'home'
          },
          {
            name: 'Beauty & Personal Care',
            image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            value: 'beauty'
          }
        ];
        
        setFeaturedProducts(featuredProductsData);
        setCategories(categoriesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <Carousel fade className="mb-5">
        <Carousel.Item>
          <div 
            style={{ 
              height: '500px',
              background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://images.pexels.com/photos/1078973/pexels-photo-1078973.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <Carousel.Caption>
            <h1>Summer Collection 2025</h1>
            <p>Discover the latest trends for the summer season.</p>
            <Button as={Link} to="/products" variant="light" size="lg">
              Shop Now
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div 
            style={{ 
              height: '500px', 
              background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <Carousel.Caption>
            <h1>Tech Gadgets Sale</h1>
            <p>Up to 40% off on the latest electronics.</p>
            <Button as={Link} to="/products?category=electronics" variant="light" size="lg">
              Explore Deals
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Categories Section */}
      <Container className="mb-5">
        <h2 className="section-title mb-4">Shop by Category</h2>
        <Row>
          {categories.map((category, index) => (
            <Col key={index} xs={6} md={3} className="mb-4">
              <Link 
                to={`/products?category=${category.value}`} 
                className="text-decoration-none"
              >
                <Card className="category-card border-0 shadow-sm h-100">
                  <div style={{ height: '150px', overflow: 'hidden' }}>
                    <Card.Img 
                      variant="top" 
                      src={category.image} 
                      alt={category.name}
                      style={{ 
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                      className="category-img"
                    />
                  </div>
                  <Card.Body className="text-center">
                    <Card.Title className="mb-0">{category.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Featured Products Section */}
      <Container className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="section-title mb-0">Featured Products</h2>
          <Button as={Link} to="/products" variant="outline-primary">
            View All
          </Button>
        </div>
        <Row>
          {featuredProducts.map((product) => (
            <Col key={product.id} sm={6} md={4} lg={3} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>

      {/* Promo Section */}
      <div 
        className="py-5 mb-5 text-white" 
        style={{
          background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))'
        }}
      >
        <Container className="text-center">
          <h2 className="mb-3">Summer Sale is On!</h2>
          <p className="lead mb-4">Get up to 50% off on selected items. Limited time offer.</p>
          <Button 
            as={Link} 
            to="/products?sale=true" 
            variant="light" 
            size="lg" 
            className="rounded-pill px-4"
          >
            Shop the Sale
          </Button>
        </Container>
      </div>

      {/* Newsletter Section */}
      <Container className="mb-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="bg-light p-4 p-md-5 rounded-3 text-center">
              <h3 className="mb-3">Subscribe to Our Newsletter</h3>
              <p className="text-muted mb-4">
                Get updates on new products, special offers, and seasonal discounts.
              </p>
              <div className="input-group mb-3">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Your email address" 
                  aria-label="Email address"
                />
                <Button variant="primary" type="button">
                  Subscribe
                </Button>
              </div>
              <small className="text-muted">
                By subscribing, you agree to our Privacy Policy.
              </small>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;