// React E-commerce Application
// This file contains the main App component which serves as the entry point for the application.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './components/ProductCard';
import './App.css';

function App() {
  // State Management
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // API Configuration
  const headers = { withCredentials: true };

  // Product Fetching
  useEffect(() => {
    setIsLoading(true);
    axios("http://localhost:8080/api/products", headers)
      .then(res => {
        setProducts(res.data.response);
        setError(null);
      })
      .catch(err => {
        console.log("err", err);
        setError(err.response?.data?.message || 'Failed to fetch products');
        setProducts([]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="container">
      <header className="header">
        <nav className="nav">
          <div className="logo">Luxe Boutique</div>
          <div className="nav-links">
            <a href="#" className="link">Home</a>
            <a href="#" className="link">Login</a>
            <a href="#" className="link">Register</a>
            <button className="button">Sign Out</button>
          </div>
        </nav>
      </header>

      <main>
        <h1 className="title">Refined Selection</h1>
        <div className="filter-section">
          <input
            className="input"
            type="text"
            placeholder="Curate your collection: e.g., category, price range"
          />
          <input
            className="input"
            type="text"
            placeholder="Arrange by: e.g., price, name..."
          />
          <button className="button button-primary">Discover Treasures</button>
        </div>

        <h2 className="title">Exquisite Offerings</h2>
        {isLoading ? (
          <p className="loading">Curating your selection...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
// IMPROVEMENT SUGGESTIONS:
// 1. Styling: Implemented luxurious design with cursor-following product cards for an interactive feel.
// 3. Accessibility: Ensure the cursor-following effect doesn't interfere with screen readers or keyboard navigation.
// 4. Browser Compatibility: Test the 3D transform effects across different browsers and provide fallbacks if necessary.
// 5. Mobile Experience: The cursor-following effect is disabled on mobile, but consider adding touch-based interactions for mobile users.
// 6. Error Handling: Implement more robust error handling and user-friendly error messages.
// 7. Loading State: Add a more visually appealing loading state, perhaps with a branded loading animation.
// 8. Pagination: If the product list is long, consider implementing pagination or infinite scroll.
// 9. State Management: For a larger application, consider using Redux or Context API for more complex state management.
// 10. Code Splitting: As the application grows, implement code splitting to improve load times.
// 11. SEO: Ensure proper meta tags and semantic HTML structure for better search engine optimization.