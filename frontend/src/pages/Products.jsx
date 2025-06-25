import { useState, useEffect } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductFilter from '../components/ProductFilter';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Categories and brands for filters
  const categories = [
    { label: 'Electronics', value: 'electronics' },
    { label: 'Clothing', value: 'clothing' },
    { label: 'Home & Kitchen', value: 'home' },
    { label: 'Beauty & Personal Care', value: 'beauty' }
  ];
  
  const brands = [
    { label: 'Apple', value: 'apple' },
    { label: 'Samsung', value: 'samsung' },
    { label: 'Sony', value: 'sony' },
    { label: 'Nike', value: 'nike' },
    { label: 'Adidas', value: 'adidas' }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // In a real application, you would fetch this data from your API
        // For demo purposes, we're using placeholder data
        
        // Simulate API call with filters
        const category = searchParams.get('category') || '';
        const search = searchParams.get('search') || '';
        const brand = searchParams.get('brand') || '';
        const sort = searchParams.get('sort') || 'newest';
        const minPrice = searchParams.get('minPrice') || '';
        const maxPrice = searchParams.get('maxPrice') || '';
        const inStock = searchParams.get('inStock') === 'true';
        const page = parseInt(searchParams.get('page') || '1');
        
        setCurrentPage(page);
        
        // This is sample data - in a real app, you'd fetch from your API
        const productsData = [
          {
            id: '1',
            name: 'Premium Wireless Headphones',
            description: 'Experience crystal-clear sound with our premium wireless headphones.',
            price: 199.99,
            originalPrice: 249.99,
            image: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rating: 4.7,
            inStock: true,
            category: 'electronics',
            brand: 'sony'
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
            category: 'electronics',
            brand: 'apple'
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
            category: 'clothing',
            brand: 'nike'
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
            category: 'home',
            brand: 'kitchenaid'
          },
          {
            id: '5',
            name: 'Ultra HD Smart TV 55"',
            description: 'Immerse yourself in stunning 4K resolution and smart features.',
            price: 699.99,
            originalPrice: 899.99,
            image: 'https://images.pexels.com/photos/5552789/pexels-photo-5552789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rating: 4.6,
            inStock: true,
            category: 'electronics',
            brand: 'samsung'
          },
          {
            id: '6',
            name: 'Running Shoes',
            description: 'Lightweight, comfortable running shoes with superior cushioning.',
            price: 89.99,
            originalPrice: 109.99,
            image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rating: 4.4,
            inStock: true,
            category: 'clothing',
            brand: 'adidas'
          },
          {
            id: '7',
            name: 'Stainless Steel Water Bottle',
            description: 'Keep your beverages hot or cold for hours with this insulated bottle.',
            price: 29.99,
            originalPrice: 34.99,
            image: 'https://images.pexels.com/photos/4065891/pexels-photo-4065891.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rating: 4.2,
            inStock: true,
            category: 'home',
            brand: 'generic'
          },
          {
            id: '8',
            name: 'Facial Moisturizer',
            description: 'Hydrating formula for all skin types, with SPF 30 protection.',
            price: 24.99,
            originalPrice: 29.99,
            image: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rating: 4.7,
            inStock: true,
            category: 'beauty',
            brand: 'generic'
          }
        ];
        
        // Filter products based on search params
        let filteredProducts = [...productsData];
        
        if (category) {
          filteredProducts = filteredProducts.filter(p => p.category === category);
        }
        
        if (search) {
          const searchLower = search.toLowerCase();
          filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchLower) || 
            p.description.toLowerCase().includes(searchLower)
          );
        }
        
        if (brand) {
          filteredProducts = filteredProducts.filter(p => p.brand === brand);
        }
        
        if (minPrice) {
          filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
        }
        
        if (maxPrice) {
          filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
        }
        
        if (inStock) {
          filteredProducts = filteredProducts.filter(p => p.inStock);
        }
        
        // Sort products
        switch (sort) {
          case 'price_low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
          case 'price_high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
          case 'popular':
            // In a real app, this would be based on sales or views
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
          default:
            // newest - in a real app, this would be based on creation date
            break;
        }
        
        // Calculate pagination
        const productsPerPage = 8;
        const totalItems = filteredProducts.length;
        setTotalPages(Math.ceil(totalItems / productsPerPage));
        
        // Get products for current page
        const startIndex = (page - 1) * productsPerPage;
        const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);
        
        setProducts(paginatedProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  const handlePageChange = (page) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', page);
    window.location.search = newSearchParams.toString();
  };

  return (
    <Container className="py-4 mt-5">
      <h1 className="mb-4">Shop Our Products</h1>
      
      <Row>
        {/* Filters - Left Sidebar */}
        <Col md={3} className="mb-4">
          <ProductFilter categories={categories} brands={brands} />
        </Col>
        
        {/* Product Listing */}
        <Col md={9}>
          {loading ? (
            <div className="d-flex justify-content-center my-5">
              <div className="spinner-border text-primary\" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center my-5">
              <h3>No products found</h3>
              <p>Try adjusting your filters or search criteria</p>
            </div>
          ) : (
            <>
              <p className="text-muted mb-3">
                Showing {products.length} products
              </p>
              <Row>
                {products.map((product) => (
                  <Col key={product.id} sm={6} lg={4} xl={3} className="mb-4">
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>
              
              {/* Pagination */}
              <div className="d-flex justify-content-center mt-4">
                <Pagination>
                  <Pagination.First 
                    onClick={() => handlePageChange(1)} 
                    disabled={currentPage === 1}
                  />
                  <Pagination.Prev 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1} 
                  />
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  
                  <Pagination.Next 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                  <Pagination.Last 
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Products;