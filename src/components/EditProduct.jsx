import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";

function EditProduct() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        price: "",
        image: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Fetch existing product data
    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(response => {
                setFormData({
                    title: response.data.title,
                    description: response.data.description,
                    category: response.data.category,
                    price: response.data.price,
                    image: response.data.image
                });
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load product data.");
                setLoading(false);
            });
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://fakestoreapi.com/products/${id}`, formData);
            setSuccess(true);
            setError(null);
        } catch (err) {
            setError("Failed to update product. Please try again.");
            setSuccess(false);
        }
    };

    if (loading) return <p>Loading product data...</p>;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container className="mt-5">
            <h2>Edit Product</h2>

            {success && <Alert variant="success" dismissible>Product updated successfully!</Alert>}

            <Form onSubmit={handleSubmit} className="mt-3">
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" name="category" value={formData.category} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control type="text" name="image" value={formData.image} onChange={handleChange} required />
                </Form.Group>

                <Button variant="primary" type="submit" className="me-2">Update Product</Button>
                <Button as={Link} to="/products" variant="secondary">Cancel</Button>
            </Form>
        </Container>
    );
}

export default EditProduct;