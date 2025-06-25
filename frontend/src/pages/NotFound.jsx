import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container className="py-5 mt-5 text-center">
      <div className="mb-4">
        <span className="display-1 fw-bold text-primary">404</span>
      </div>
      <h1 className="mb-4">Page Not Found</h1>
      <p className="lead mb-5">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Button as={Link} to="/" variant="primary" size="lg">
        Go to Homepage
      </Button>
    </Container>
  );
};

export default NotFound;