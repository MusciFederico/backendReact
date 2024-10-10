// React E-commerce Application
// This application implements a basic e-commerce interface with role-based navigation
// and product display functionality. Now with enhanced UI styling.

import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  // State Management
  const [products, setProducst] = useState([]) // Typo in setter name, should be setProducts
  const [data, setData] = useState(null);      // Stores decoded JWT data
  const [role, setRole] = useState(undefined); // Controls role-based UI rendering

  // API Configuration
  const headers = { withCredentials: true }    // Ensures cookies are sent with requests

  // Product Fetching
  useEffect(() => {
    // TODO: Consider error handling and loading states
    axios("http://localhost:8080/api/products", headers)
      .then(res => setProducst(res.data.response))
      .catch(err => console.log("err", err))    // Consider proper error handling
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
        } catch (error) {
          console.error('Error decoding JWT token:', error);
          // TODO: Consider user feedback for token decoding failures
        }
      }
    };
    extractJWTFromCookies();
  }, []);

  return (
    <>
      {/* Navigation Bar - Updated with modern styling */}
      <header className="bg-info py-4 shadow-sm">
        <nav className="container navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid">
            {/* Updated branding with emoji for visual appeal */}
            <a className="navbar-brand text-white fw-bold" href="#">🛍️ My Shop</a>
            {/* Responsive hamburger menu */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Collapsible navigation content */}
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* Always visible */}
                <li className="nav-item">
                  <a className="nav-link active hover-shadow" aria-current="page" href="#">Home</a>
                </li>

                {/* Role-based navigation items */}
                {role === 0 && (
                  <li className="nav-item">
                    <a className="nav-link" href="#">Orders</a>
                  </li>
                )}
                {role === 1 && (
                  <li className="nav-item">
                    <a className="nav-link" href="#">Form</a>
                  </li>
                )}
                {role === undefined && (
                  <>
                    <li className="nav-item">
                      <a className="nav-link" href="#">Login</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">Register</a>
                    </li>
                  </>
                )}
              </ul>
              {/* Updated button style for better contrast */}
              <button className="btn btn-outline-light">Sign Out</button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container py-5">
        {/* Filter Section - Enhanced with improved visual hierarchy */}
        <h2 className="mb-4 text-primary fw-bold">Product Filters</h2>
        <form className="row gy-4">
          {/* Filter input */}
          <div className="col-12">
            <label htmlFor="filters" className="form-label fw-semibold">
              Filter products:
            </label>
            <input
              type="text"
              id="filter"
              name="filters"
              className="form-control form-control-lg"
              placeholder="e.g., category, price range..."
            />
          </div>

          {/* Sort input */}
          <div className="col-12">
            <label htmlFor="sorters" className="form-label fw-semibold">
              Sort by:
            </label>
            <input
              type="text"
              id="sort"
              name="sorters"
              className="form-control form-control-lg"
              placeholder="e.g., price, name..."
            />
          </div>

          <div className="col-12">
            <button id="buscar" type="submit" className="btn btn-primary btn-lg px-4">
              Search Products
            </button>
          </div>
        </form>

        {/* Product Display - Now with enhanced card styling */}
        {products.length > 0 && (
          <ul className="row row-cols-1 row-cols-md-3 g-4 mt-4">
            {products.map((each) => (
              <li className="col" key={each._id}>
                <div className="card h-100 shadow-sm hover-shadow transition">
                  <img src={each.photo} className="card-img-top" alt={each.name} />
                  <div className="card-body">
                    <h5 className="card-title text-primary">{each.name}</h5>
                    <p className="card-text fw-bold">Price: ${each.price}</p>
                    <p className="card-text text-muted">Stock: {each.stock}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* No products message */}
        {products.length === 0 && <p className="text-center text-muted mt-4">No products available.</p>}
      </main>

      {/* Updated footer with modern styling */}
      <footer className="bg-dark text-white text-center py-4">
        <p className="mb-0">© 2024 My Shop - The coolest footer you've ever seen</p>
      </footer>
    </>
  )
}

export default App

/*
IMPROVEMENT SUGGESTIONS:
1. Error Handling: Implement proper error handling for API requests and JWT decoding
2. Loading States: Add loading indicators during API calls
3. Type Safety: Consider using TypeScript or PropTypes
4. Form Handling: Implement form submission logic and controlled inputs
5. CSS Naming: Use consistent naming convention (className vs class)
6. Code Organization: Consider splitting into smaller components
7. Authentication: Implement proper sign out functionality
8. Accessibility: Enhance keyboard navigation and ARIA attributes
9. State Management: Consider using context or Redux for complex state
10. Testing: Add unit tests for critical functionality
11. UI Enhancement: Further refine visual design for optimal user experience
12. Responsive Design: Ensure consistent experience across all device sizes
*/

/////////////////////////
// // React E-commerce Application
// // This application implements a basic e-commerce interface with role-based navigation
// // and product display functionality. Now with enhanced UI styling.

// import { useState, useEffect } from 'react';
// import './App.css';
// import axios from 'axios';
// import { AlertCircle } from 'lucide-react';

// function App() {
//   // State Management
//   const [products, setProducts] = useState([]) // Fixed typo in setter name
//   const [data, setData] = useState(null);      // Stores decoded JWT data
//   const [role, setRole] = useState(undefined); // Controls role-based UI rendering
//   const [error, setError] = useState(null);    // Stores error messages
//   const [isLoading, setIsLoading] = useState(true);

//   // API Configuration
//   const headers = { withCredentials: true }    // Ensures cookies are sent with requests

//   // Product Fetching
//   useEffect(() => {
//     // TODO: Consider error handling and loading states
//     setIsLoading(true);
//     axios("http://localhost:8080/api/products", headers)
//       .then(res => {
//         setProducts(res.data.response);
//         setError(null);
//       })
//       .catch(err => {
//         console.log("err", err);    // Consider proper error handling
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
//           // TODO: Consider user feedback for token decoding failures
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
//       {/* Navigation Bar - Updated with modern styling */}
//       <header className="bg-info py-4 shadow-sm">
//         <nav className="container navbar navbar-expand-lg navbar-dark">
//           <div className="container-fluid">
//             {/* Updated branding with emoji for visual appeal */}
//             <a className="navbar-brand text-white fw-bold" href="#">🛍️ My Shop</a>
//             {/* Responsive hamburger menu */}
//             <button
//               className="navbar-toggler"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#navbarSupportedContent"
//               aria-controls="navbarSupportedContent"
//               aria-expanded="false"
//               aria-label="Toggle navigation"
//             >
//               <span className="navbar-toggler-icon"></span>
//             </button>

//             {/* Collapsible navigation content */}
//             <div className="collapse navbar-collapse" id="navbarSupportedContent">
//               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                 {/* Always visible */}
//                 <li className="nav-item">
//                   <a className="nav-link active hover-shadow" aria-current="page" href="#">Home</a>
//                 </li>

//                 {/* Role-based navigation items */}
//                 {role === 0 && (
//                   <li className="nav-item">
//                     <a className="nav-link" href="#">Orders</a>
//                   </li>
//                 )}
//                 {role === 1 && (
//                   <li className="nav-item">
//                     <a className="nav-link" href="#">Form</a>
//                   </li>
//                 )}
//                 {role === undefined && (
//                   <>
//                     <li className="nav-item">
//                       <a className="nav-link" href="#">Login</a>
//                     </li>
//                     <li className="nav-item">
//                       <a className="nav-link" href="#">Register</a>
//                     </li>
//                   </>
//                 )}
//               </ul>
//               {/* Updated button style for better contrast */}
//               <button className="btn btn-outline-light">Sign Out</button>
//             </div>
//           </div>
//         </nav>
//       </header>

//       {/* Main Content */}
//       <main className="container py-5">
//         {error && (
//           <div className="alert alert-danger d-flex align-items-center" role="alert">
//             <AlertCircle className="me-2" />
//             <div>{error}</div>
//           </div>
//         )}

//         {/* Filter Section - Enhanced with improved visual hierarchy */}
//         <h2 className="mb-4 text-primary fw-bold">Product Filters</h2>
//         <form className="row gy-4">
//           {/* Filter input */}
//           <div className="col-12">
//             <label htmlFor="filters" className="form-label fw-semibold">
//               Filter products:
//             </label>
//             <input
//               type="text"
//               id="filter"
//               name="filters"
//               className="form-control form-control-lg"
//               placeholder="e.g., category, price range..."
//             />
//           </div>

//           {/* Sort input */}
//           <div className="col-12">
//             <label htmlFor="sorters" className="form-label fw-semibold">
//               Sort by:
//             </label>
//             <input
//               type="text"
//               id="sort"
//               name="sorters"
//               className="form-control form-control-lg"
//               placeholder="e.g., price, name..."
//             />
//           </div>

//           <div className="col-12">
//             <button id="buscar" type="submit" className="btn btn-primary btn-lg px-4">
//               Search Products
//             </button>
//           </div>
//         </form>

//         {/* Product Display - Now with enhanced card styling */}
//         {isLoading ? (
//           <div className="text-center py-4">
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//           </div>
//         ) : products.length > 0 ? (
//           <ul className="row row-cols-1 row-cols-md-3 g-4 mt-4">
//             {products.map((each) => (
//               <li className="col" key={each._id}>
//                 <div className="card h-100 shadow-sm hover-shadow transition">
//                   <img src={each.photo} className="card-img-top" alt={each.name} />
//                   <div className="card-body">
//                     <h5 className="card-title text-primary">{each.name}</h5>
//                     <p className="card-text fw-bold">Price: ${each.price}</p>
//                     <p className="card-text text-muted">Stock: {each.stock}</p>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-center text-muted mt-4">No products available.</p>
//         )}
//       </main>

//       {/* Updated footer with modern styling */}
//       <footer className="bg-dark text-white text-center py-4">
//         <p className="mb-0">© 2024 My Shop - The coolest footer you've ever seen</p>
//       </footer>
//     </>
//   )
// }

// export default App

// /*
// IMPROVEMENT SUGGESTIONS:
// 2. Loading States: Add loading indicators during API calls
// 3. Type Safety: Consider using TypeScript or PropTypes
// 4. Form Handling: Implement form submission logic and controlled inputs
// 5. CSS Naming: Use consistent naming convention (className vs class)
// 6. Code Organization: Consider splitting into smaller components
// 7. Authentication: Implement proper sign out functionality
// 8. Accessibility: Enhance keyboard navigation and ARIA attributes
// 9. State Management: Consider using context or Redux for complex state
// 10. Testing: Add unit tests for critical functionality
// 11. UI Enhancement: Further refine visual design for optimal user experience
// 12. Responsive Design: Ensure consistent experience across all device sizes
// */