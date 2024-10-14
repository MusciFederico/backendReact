// // React E-commerce Application
// // This application implements a basic e-commerce interface with role-based navigation
// // and product display functionality. Now with enhanced UI styling and loading states.

// import { useState, useEffect } from 'react';
// import './App.css';
// import axios from 'axios';
// import { AlertCircle } from 'lucide-react';

// function App() {
//   // State Management
//   const [products, setProducts] = useState([])
//   const [data, setData] = useState(null);      // Stores decoded JWT data
//   const [role, setRole] = useState(undefined); // Controls role-based UI rendering
//   const [error, setError] = useState(null);    // Stores error messages
//   const [isLoading, setIsLoading] = useState(true); // Controls loading state

//   // API Configuration
//   const headers = { withCredentials: true }    // Ensures cookies are sent with requests

//   // Product Fetching
//   useEffect(() => {
//     setIsLoading(true);
//     axios("http://localhost:8080/api/products", headers)
//       .then(res => {
//         setProducts(res.data.response);
//         setError(null);
//       })
//       .catch(err => {
//         console.log("err", err);
//         setError(err.response?.data?.message || 'Failed to fetch products');
//         setProducts([]);
//       })
//       .finally(() => setIsLoading(false));
//   }, [])

//   // JWT Processing
//   useEffect(() => {
//     // Extracts and decodes JWT from cookies to determine user role
//     const extractJWTFromCookies = () => {
//       const cookieValue = document.cookie
//         .split('; ')
//         .find(row => row.startsWith('token='))
//         ?.split('=')[1];

//       if (cookieValue) {
//         try {
//           // Decodes the JWT token (middle part contains the payload)
//           const decodedToken = JSON.parse(atob(cookieValue.split('.')[1]));
//           setData(decodedToken);
//           const { role } = decodedToken
//           setRole(role)
//           setError(null);
//         } catch (error) {
//           console.error('Error decoding JWT token:', error);
//           setError('Failed to process authentication token');
//           setData(null);
//           setRole(undefined);
//         }
//       }
//     };
//     extractJWTFromCookies();
//   }, []);

//   return (
//     <>
//       {/* Navigation Bar */}
//       <header className="bg-info py-2">
//         <nav className="container d-flex justify-content-between align-items-center">
//           <div className="d-flex align-items-center">
//             <img src="/path-to-shop-icon.png" alt="Shop Icon" className="me-2" style={{ width: '24px', height: '24px' }} />
//             <a className="navbar-brand text-white fw-bold" href="#">My Shop</a>
//           </div>
//           <div>
//             <a className="text-white me-3" href="#">Home</a>
//             <a className="text-white me-3" href="#">Login</a>
//             <a className="text-white me-3" href="#">Register</a>
//             <button className="btn btn-outline-light">Sign Out</button>
//           </div>
//         </nav>
//       </header>

//       {/* Main Content */}
//       <main className="container py-4">
//         {error && (
//           <div className="alert alert-danger d-flex align-items-center" role="alert">
//             <AlertCircle className="me-2" />
//             <div>{error}</div>
//           </div>
//         )}

//         {/* Filter Section */}
//         <h2 className="mb-3 text-primary">Product Filters</h2>
//         <form className="mb-4">
//           <div className="mb-3">
//             <label htmlFor="filter" className="form-label">Filter products:</label>
//             <input
//               type="text"
//               id="filter"
//               className="form-control"
//               placeholder="e.g., category, price range..."
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="sort" className="form-label">Sort by:</label>
//             <input
//               type="text"
//               id="sort"
//               className="form-control"
//               placeholder="e.g., price, name..."
//             />
//           </div>
//           <button type="submit" className="btn btn-primary">Search Products</button>
//         </form>

//         {/* Product Display */}
//         <h2 className="mb-3 text-primary">Products</h2>
//         {isLoading ? (
//           <div className="text-center py-4">
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading products...</span>
//             </div>
//             <p className="mt-2">Loading products...</p>
//           </div>
//         ) : products.length > 0 ? (
//           <div className="row row-cols-1 row-cols-md-3 g-4">
//             {products.map((product) => (
//               <div className="col" key={product._id}>
//                 <div className="card h-100">
//                   <img src={product.photo} className="card-img-top" alt={product.name} />
//                   <div className="card-body">
//                     <h5 className="card-title text-primary">{product.name}</h5>
//                     <p className="card-text">Price: ${product.price}</p>
//                     <p className="card-text text-muted">Stock: {product.stock}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-muted">No products available.</p>
//         )}
//       </main>
//     </>
//   )
// }

// export default App

// /*
// IMPROVEMENT SUGGESTIONS:
// 1. styles pls this hurst to see
// 2. Type Safety: Consider using TypeScript or PropTypes
// 3. Form Handling: Implement form submission logic and controlled inputs
// 4. CSS Naming: Use consistent naming convention (className vs class)
// 5. Code Organization: Consider splitting into smaller components
// 6. Authentication: Implement proper sign out functionality
// 7. Accessibility: Enhance keyboard navigation and ARIA attributes
// 8. State Management: Consider using context or Redux for complex state
// 9. Testing: Add unit tests for critical functionality
// 10. UI Enhancement: Further refine visual design for optimal user experience
// 11. Responsive Design: Ensure consistent experience across all device sizes
// */

// React E-commerce Application
// This application implements a basic e-commerce interface with role-based navigation
// and product display functionality. Now with enhanced UI styling and loading states.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

  const handleMouseMove = (e, card) => {
    const { left, top, width, height } = card.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    const rotateX = (mouseY / height) * 10; // Max rotation of 10 degrees
    const rotateY = (mouseX / width) * -10; // Max rotation of 10 degrees

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = (card) => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };

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
              <div
                key={product._id}
                className="product-card"
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              >
                <div className="product-card-inner">
                  <img src={product.photo} alt={product.name} className="product-image" />
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">${product.price.toFixed(2)}</p>
                    <p className="product-stock">Available: {product.stock}</p>
                    <button className="button button-primary">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

/*
IMPROVEMENT SUGGESTIONS:
1. Styling: Implemented luxurious design with cursor-following product cards for an interactive feel.
2. Performance: Consider debouncing or throttling the mouse move event handler for better performance.
3. Accessibility: Ensure the cursor-following effect doesn't interfere with screen readers or keyboard navigation.
4. Browser Compatibility: Test the 3D transform effects across different browsers and provide fallbacks if necessary.
5. Mobile Experience: The cursor-following effect is disabled on mobile, but consider adding touch-based interactions for mobile users.
6. Error Handling: Implement more robust error handling and user-friendly error messages.
7. Loading State: Add a more visually appealing loading state, perhaps with a branded loading animation.
8. Pagination: If the product list is long, consider implementing pagination or infinite scroll.
9. State Management: For a larger application, consider using Redux or Context API for more complex state management.
10. Code Splitting: As the application grows, implement code splitting to improve load times.
11. SEO: Ensure proper meta tags and semantic HTML structure for better search engine optimization.
*/