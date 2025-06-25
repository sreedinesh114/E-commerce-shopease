import { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addToCart(product);
      setIsAdding(false);
    }, 300); // Small delay for animation
  };

  // Calculate discount percentage
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <Card className="product-card h-100 border-0 shadow-sm">
      <div className="product-img-container">
        <Card.Img 
          variant="top" 
          src={product.image} 
          alt={product.name} 
          className="product-img"
          style={{ height: '200px', objectFit: 'contain' }}
        />
      </div>
      
      <Card.Body className="d-flex flex-column">
        {product.inStock ? (
          <Badge bg="success\" text="white\" className="position-absolute top-0 end-0 m-2">
            In Stock
          </Badge>
        ) : (
          <Badge bg="danger" text="white" className="position-absolute top-0 end-0 m-2">
            Out of Stock
          </Badge>
        )}
        
        <Link 
          to={`/products/${product.id}`} 
          className="text-decoration-none"
        >
          <Card.Title className="fs-5 text-truncate mb-1">
            {product.name}
          </Card.Title>
        </Link>
        
        <Card.Text className="text-muted small mb-2 flex-grow-1">
          {product.description.length > 60 
            ? product.description.substring(0, 60) + '...' 
            : product.description}
        </Card.Text>
        
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <span className="fs-5 fw-bold text-primary">${product.price.toFixed(2)}</span>
            {discountPercentage > 0 && (
              <>
                <span className="text-muted text-decoration-line-through ms-2 small">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <Badge bg="danger" className="ms-2">-{discountPercentage}%</Badge>
              </>
            )}
          </div>
          <div className="d-flex">
            {product.rating && (
              <div className="text-warning me-1">
                ★ {product.rating.toFixed(1)}
              </div>
            )}
          </div>
        </div>
        
        <Button 
          variant="primary" 
          className={`btn-add-to-cart w-100 ${isAdding ? 'active' : ''}`}
          onClick={handleAddToCart}
          disabled={!product.inStock || isAdding}
        >
          {isAdding ? 'Adding...' : 'Add to Cart'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;