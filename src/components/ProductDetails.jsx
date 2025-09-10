import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleted, setDeleted] = useState(false);
    const [cartMessage, setCartMessage] = useState(null);
    const [showModal, setShowModal] = useState(false);
// Fetch product details from API on component mount or when id changes
    useEffect(() => {
        axios
            .get(`https://fakestoreapi.com/products/${id}`)
            .then((response) => {
                setProduct(response.data); //Store product data
                setLoading(false); //Stop loading
            })
            .catch((error) => {
                setError("Failed to load product details."); //Handle API errors
                setLoading(false);
            });
    }, [id]);
    //Handle deleting a product
    const handleDelete = () => {
            axios
                .delete(`https://fakestoreapi.com/products/${id}`)
                .then (() => {
                    setDeleted(true); //Mark as deleted
                    setShowModal(false); //Close modal
                    
                })
                .catch(() => {
                    setError("Failed to delete the product."); //Handle delete errors
                    setShowModal(false);
                });
        };
        //Handle adding product to cart
    const handleAddToCart = () => {
            setCartMessage(`${product.title} added to cart!`);      
        };
        // Show loading, error, or deleted states
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
            {/* Show success message when added to cart */}
            {cartMessage && <Alert variant="success">{cartMessage}</Alert>}

            {/* Display product details */}
            <Card className = "product-card">
                <Card.Img variant="top" src={product.image} alt={product.title} />
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text><strong>Category:</strong> {product.category}</Card.Text>
                    <Card.Text>${product.price}</Card.Text>
                    {/* Buttons for add to cart, edit, and delete */}
                     <div className="mt-4 d-flex justify-content-center gap-2">
                        <Button variant="primary" onClick={handleAddToCart} className="me-2">Add to Cart</Button>
                        <Button variant="warning" as={Link} to={`/editproduct/${product.id}`}>Edit Product</Button>
                        <Button variant="danger" onClick={() => setShowModal(true)}>Delete Product</Button>
                     
                    </div>

                </Card.Body>
            </Card>
            
            {/* Delete Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{product.title}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
            </Container>
            );
}

            export default ProductDetails;