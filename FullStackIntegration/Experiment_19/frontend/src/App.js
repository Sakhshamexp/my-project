import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Use existing App.css for base styles

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    
    // Ensure this URL matches your backend port
    axios.get('http://localhost:5001/api/products')
      .then(res => {
        setProducts(res.data);
        setError(null);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Check server status.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading-state">Loading products...</div>;
  if (error) return <div className="error-state">Error: {error}</div>;

  return (
    // Inline styles for basic layout, or update App.css
    <div className="App" style={{ 
      padding: '20px', 
      textAlign: 'center', 
      backgroundColor: '#222', 
      minHeight: '100vh', 
      color: 'white'
    }}>
      <h1>Product List</h1>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '30px', 
        flexWrap: 'wrap'
      }}>
        {products.map(p => (
          <div key={p.id} style={{ 
            backgroundColor: '#333', 
            padding: '20px', 
            borderRadius: '8px', 
            width: '200px', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)'
          }}>
            <h3>{p.name}</h3>
            <p style={{ color: '#90ee90' }}>Price: ${p.price}</p>
            <button style={{ 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '4px', 
              cursor: 'pointer'
            }}>
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;