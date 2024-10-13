// React E-commerce Application
// This application implements a basic e-commerce interface with role-based navigation
// and product display functionality. Now with enhanced UI styling and loading states.

import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { AlertCircle } from 'lucide-react';

function App() {
  // State Management
  const [products, setProducts] = useState([])
  const [data, setData] = useState(null);      // Stores decoded JWT data
  const [role, setRole] = useState(undefined); // Controls role-based UI rendering
  const [error, setError] = useState(null);    // Stores error messages
  const [isLoading, setIsLoading] = useState(true); // Controls loading state

  // API Configuration
  const headers = { withCredentials: true }    // Ensures cookies are sent with requests

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
  }, [])

  // JWT Processing
  useEffect(() => {
    // Extracts and decodes JWT from cookies to determine user role
    const extractJWTFromCookies = () => {
      const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

      if (cookieValue) {
        try {
          // Decodes the JWT token (middle part contains the payload)
          const decodedToken = JSON.parse(atob(cookieValue.split('.')[1]));
          setData(decodedToken);
          const { role } = decodedToken
          setRole(role)
          setError(null);
        } catch (error) {
          console.error('Error decoding JWT token:', error);
          setError('Failed to process authentication token');
          setData(null);
          setRole(undefined);
        }
      }
    };
    extractJWTFromCookies();
  }, []);

  return (
    <>
      {/* Navigation Bar */}
      <header className="bg-info py-2">
        <nav className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img src="/path-to-shop-icon.png" alt="Shop Icon" className="me-2" style={{ width: '24px', height: '24px' }} />
            <a className="navbar-brand text-white fw-bold" href="#">My Shop</a>
          </div>
          <div>
            <a className="text-white me-3" href="#">Home</a>
            <a className="text-white me-3" href="#">Login</a>
            <a className="text-white me-3" href="#">Register</a>
            <button className="btn btn-outline-light">Sign Out</button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container py-4">
        {error && (
          <div className="alert alert-danger d-flex align-items-center" role="alert">
            <AlertCircle className="me-2" />
            <div>{error}</div>
          </div>
        )}

        {/* Filter Section */}
        <h2 className="mb-3 text-primary">Product Filters</h2>
        <form className="mb-4">
          <div className="mb-3">
            <label htmlFor="filter" className="form-label">Filter products:</label>
            <input
              type="text"
              id="filter"
              className="form-control"
              placeholder="e.g., category, price range..."
            />
          </div>
          <div className="mb-3">
            <label htmlFor="sort" className="form-label">Sort by:</label>
            <input
              type="text"
              id="sort"
              className="form-control"
              placeholder="e.g., price, name..."
            />
          </div>
          <button type="submit" className="btn btn-primary">Search Products</button>
        </form>

        {/* Product Display */}
        <h2 className="mb-3 text-primary">Products</h2>
        {isLoading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading products...</span>
            </div>
            <p className="mt-2">Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {products.map((product) => (
              <div className="col" key={product._id}>
                <div className="card h-100">
                  <img src={product.photo} className="card-img-top" alt={product.name} />
                  <div className="card-body">
                    <h5 className="card-title text-primary">{product.name}</h5>
                    <p className="card-text">Price: ${product.price}</p>
                    <p className="card-text text-muted">Stock: {product.stock}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted">No products available.</p>
        )}
      </main>
    </>
  )
}

export default App

/*
IMPROVEMENT SUGGESTIONS:
1. styles pls this hurst to see
2. Type Safety: Consider using TypeScript or PropTypes
3. Form Handling: Implement form submission logic and controlled inputs
4. CSS Naming: Use consistent naming convention (className vs class)
5. Code Organization: Consider splitting into smaller components
6. Authentication: Implement proper sign out functionality
7. Accessibility: Enhance keyboard navigation and ARIA attributes
8. State Management: Consider using context or Redux for complex state
9. Testing: Add unit tests for critical functionality
10. UI Enhancement: Further refine visual design for optimal user experience
11. Responsive Design: Ensure consistent experience across all device sizes
*/