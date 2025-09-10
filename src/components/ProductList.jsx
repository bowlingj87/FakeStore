import { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

function ProductList() {
    const [products, setProducts] = useState([]); //Store list of products
    const [loading, setLoading] = useState(true); //Track loading state
    const [error, setError] = useState(null); //Track error state

    // Fetch products from API on component   
        useEffect(() => {
            axios
            .get("https://fakestoreapi.com/products")
            .then((response)=> {
                setProducts(response.data); //Store producs
                setLoading(false); //Stop loading
            })
            .catch((error) => {
                setError("Failed to fetch products."); //Handle API errors
                setLoading(false);
            })
        }, []);

        if (loading) return <p> Loading products...</p> // Show loading message
        if (error) return <p>{error}</p>; // Show error message


    return (
        <>
            <Container>
                <Row>
                    {/*Map through products and display each in a card */}
                    {products.map((product) => ( 
                    <Col key ={product.id} md={4} className="mb-3">
                        <Card>
                        <Card.Img variant="top" src={product.image} alt={product.title}/>
                        <Card.Body>
                           <Card.Title>{product.title}</Card.Title>
                           <Card.Text>${product.price}</Card.Text>                                 
                        </Card.Body>
                        <Link className="custom-button" to={`/products/${product.id}`}>View Details</Link>
                        </Card> 
                    </Col>
                    ))}
                </Row>
            </Container>
      
</>
   ) 
}
export default ProductList;