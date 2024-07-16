import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Products() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', quantity: 0, threshold: 0 });

    useEffect(() => {
        axios.get('http://localhost:3002/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Erreur lors de la récupération des produits:', error));
    }, []);

    const handleAddProduct = () => {
        axios.post('http://localhost:3002/products', newProduct)
            .then(response => {
                setProducts([...products, response.data]);
                setNewProduct({ name: '', description: '', quantity: 0, threshold: 0 });
            })
            .catch(error => console.error('Erreur lors de l\'ajout du produit:', error));
    };

    return (
        <div>
            <h1>Products</h1>
            <input type="text" placeholder="Name" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
            <input type="text" placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
            <input type="number" placeholder="Quantity" value={newProduct.quantity} onChange={e => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })} />
            <input type="number" placeholder="Threshold" value={newProduct.threshold} onChange={e => setNewProduct({ ...newProduct, threshold: parseInt(e.target.value) })} />
            <button onClick={handleAddProduct}>Add Product</button>
            <ul>
                {products.map(product => (
                    <li key={product._id}>{product.name} - {product.description}</li>
                ))}
            </ul>
        </div>
    );
}

export default Products;
