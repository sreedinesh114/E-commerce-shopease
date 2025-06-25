import { useState } from 'react';
import { Form, Button, Accordion } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ProductFilter = ({ categories, brands }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    inStock: searchParams.get('inStock') === 'true' || false,
    sort: searchParams.get('sort') || 'newest'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (filters.category) params.append('category', filters.category);
    if (filters.brand) params.append('brand', filters.brand);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.inStock) params.append('inStock', filters.inStock);
    if (filters.sort) params.append('sort', filters.sort);
    
    navigate(`/products?${params.toString()}`);
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      inStock: false,
      sort: 'newest'
    });
    navigate('/products');
  };

  return (
    <div className="product-filter border rounded p-3 bg-white shadow-sm">
      <h5 className="mb-3">Filter Products</h5>
      
      <Accordion defaultActiveKey="0" className="mb-3">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Categories</Accordion.Header>
          <Accordion.Body>
            <Form.Select 
              name="category" 
              value={filters.category} 
              onChange={handleChange}
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category.value}>
                  {category.label}
                </option>
              ))}
            </Form.Select>
          </Accordion.Body>
        </Accordion.Item>
        
        <Accordion.Item eventKey="1">
          <Accordion.Header>Brands</Accordion.Header>
          <Accordion.Body>
            <Form.Select 
              name="brand" 
              value={filters.brand} 
              onChange={handleChange}
            >
              <option value="">All Brands</option>
              {brands.map((brand, index) => (
                <option key={index} value={brand.value}>
                  {brand.label}
                </option>
              ))}
            </Form.Select>
          </Accordion.Body>
        </Accordion.Item>
        
        <Accordion.Item eventKey="2">
          <Accordion.Header>Price Range</Accordion.Header>
          <Accordion.Body>
            <div className="d-flex gap-2">
              <Form.Group>
                <Form.Control
                  type="number"
                  placeholder="Min"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleChange}
                  className="mb-2"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="number"
                  placeholder="Max"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      
      <Form.Group className="mb-3">
        <Form.Check 
          type="checkbox" 
          label="In Stock Only" 
          name="inStock"
          checked={filters.inStock}
          onChange={handleChange}
        />
      </Form.Group>
      
      <Form.Group className="mb-4">
        <Form.Label>Sort By</Form.Label>
        <Form.Select 
          name="sort" 
          value={filters.sort} 
          onChange={handleChange}
        >
          <option value="newest">Newest</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
          <option value="popular">Most Popular</option>
          <option value="rating">Highest Rated</option>
        </Form.Select>
      </Form.Group>
      
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={applyFilters}>
          Apply Filters
        </Button>
        <Button variant="outline-secondary" onClick={resetFilters}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default ProductFilter;