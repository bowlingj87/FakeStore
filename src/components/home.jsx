import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container className="text-center mt-5">
      <h1>Welcome to Our Store</h1>
      <p className="mt-3">Explore our exclusive collection of products all from the comfort of your home. Browse, shop, and enjoy seamless online shopping experience!
        
      </p>
      <Link to="/products">
        <Button className="mt-4" variant="primary" >
          View Products
        </Button>
      </Link>
    </Container>
  );
}

export default Home;