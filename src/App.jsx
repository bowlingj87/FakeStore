import { useState } from 'react'
import './App.css'
import Home from './components/home'
import NavigationBar from './components/NavigationBar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductList from './components/ProductList'
import AddProduct from './components/AddProduct'
import ProductDetails from './components/ProductDetails'
import EditProduct from './components/EditProduct'



function App() {
 
  return (
    <Router>  
      <NavigationBar/>
      {/* Define routes for different pages */}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products" element={<ProductList/>}/>
          <Route path="/products/:id" element={<ProductDetails/>}/>
          <Route path="/addproducts" element={<AddProduct/>}/>
          <Route path="/editproduct/:id" element={<EditProduct />} />
        </Routes>
      </Router>
    );
}

export default App
