import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleted, setDeleted] = useState(false);
    const [cartMessage, setCartMessage] = useState(null);

    useEffect(() => {
        axios
            .get(`https://fakestoreapi.com/products/${id}`)
            .then((response) => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Failed to load product details.");
                setLoading(false);
            });
    }, [id]);

    const handleDelete = () => {
            axios
                .delete(`https://fakestoreapi.com/products/${id}`)
                .then (() => {
                    setDeleted(true);
                    setProduct(null);
                })
                .catch(() => {
                    setError("Failed to delete the product.");
                });
        };

    const handleAddToCart = () => {
            setCartMessage(`${product.title} added to cart!`);      
        };

    if (loading) return <p> Loading products...</p>
    if (error) return <p>{error}</p>;
    if (deleted) 
        return (
     <Container className="mt-3">
                <Alert variant="success">Product deleted successfully.</Alert>
                <Button as={Link} to="/products" variant="primary">
                    Back to Products
                </Button>
            </Container>
        );

    return (
        <Container>
            {cartMessage && <Alert variant="success">{cartMessage}</Alert>}
            <Card className = "product-card">
                <Card.Img variant="top" src={product.image} alt={product.title} />
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text><strong>Category:</strong> {product.category}</Card.Text>
                    <Card.Text>${product.price}</Card.Text>

                     <div className="mt-4 d-flex justify-content-center gap-2">
                        <Button variant="primary" onClick={handleAddToCart} className="me-2">Add to Cart</Button>
                        <Button variant="warning" as={Link} to={`/editproduct/${product.id}`}>Edit Product</Button>
                        <Button variant="danger" onClick={handleDelete}>Delete Product</Button>

                        
                    </div>

                </Card.Body>
            </Card>
            </Container>
            );
}

            export default ProductDetails;