// // React E-commerce Application
// // This file contains the main App component which serves as the entry point for the application.

// // IMPROVEMENT SUGGESTIONS:
// // 1. Styling: Implemented luxurious design with cursor-following product cards for an interactive feel.
// // 3. Accessibility: Ensure the cursor-following effect doesn't interfere with screen readers or keyboard navigation.
// // 4. Browser Compatibility: Test the 3D transform effects across different browsers and provide fallbacks if necessary.
// // 5. Mobile Experience: The cursor-following effect is disabled on mobile, but consider adding touch-based interactions for mobile users.
// // 6. Error Handling: Implement more robust error handling and user-friendly error messages.
// // 7. Loading State: Add a more visually appealing loading state, perhaps with a branded loading animation.
// // 8. Pagination: If the product list is long, consider implementing pagination or infinite scroll.
// // 9. State Management: For a larger application, consider using Redux or Context API for more complex state management.
// // 10. Code Splitting: As the application grows, implement code splitting to improve load times.
// // 11. SEO: Ensure proper meta tags and semantic HTML structure for better search engine optimization.

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ProductCard from './components/ProductCard/ProductCard';
// import { motion } from 'framer-motion';
// import './App.css';

// function App() {
//   // State Management
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [mounted, setMounted] = useState(false);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.3
//       }
//     }
//   };

//   const headerVariants = {
//     hidden: { opacity: 0, y: -20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut"
//       }
//     }
//   };

//   const titleVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         duration: 0.5,
//         ease: "easeOut"
//       }
//     }
//   };

//   // API Configuration and Product Fetching
//   useEffect(() => {
//     setIsLoading(true);
//     axios("http://localhost:8080/api/products", { withCredentials: true })
//       .then(res => {
//         setProducts(res.data.response);
//         setError(null);
//       })
//       .catch(err => {
//         console.log("err", err);
//         setError(err.response?.data?.message || 'Failed to fetch products');
//         setProducts([]);
//       })
//       .finally(() => {
//         setIsLoading(false);
//         setMounted(true);
//       });
//   }, []);

//   return (
//     <div className="container">
//       <motion.header
//         className="header"
//         variants={headerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <nav className="nav">
//           <div className="logo">Luxe Boutique</div>
//           <div className="nav-links">
//             <a href="#" className="link">Home</a>
//             <a href="#" className="link">Login</a>
//             <a href="#" className="link">Register</a>
//             <button className="button">Sign Out</button>
//           </div>
//         </nav>
//       </motion.header>

//       <main>
//         <motion.h1
//           className="title"
//           variants={titleVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           Refined Selection
//         </motion.h1>

//         <motion.div
//           className="filter-section"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           <input
//             className="input"
//             type="text"
//             placeholder="Curate your collection: e.g., category, price range"
//           />
//           <input
//             className="input"
//             type="text"
//             placeholder="Arrange by: e.g., price, name..."
//           />
//           <button className="button button-primary">Discover Treasures</button>
//         </motion.div>

//         <motion.h2
//           className="title"
//           variants={titleVariants}
//           initial="hidden"
//           animate="visible"
//           transition={{ delay: 0.3 }}
//         >
//           Exquisite Offerings
//         </motion.h2>

//         {isLoading ? (
//           <motion.p
//             className="loading"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             Curating your selection...
//           </motion.p>
//         ) : error ? (
//           <motion.p
//             className="error"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             {error}
//           </motion.p>
//         ) : (
//           <motion.div
//             className="product-grid"
//             variants={containerVariants}
//             initial="hidden"
//             animate={mounted ? "visible" : "hidden"}
//           >
//             {products.map((product) => (
//               <motion.div
//                 key={product._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 whileHover={{
//                   scale: 1.03,
//                   transition: { duration: 0.2 }
//                 }}
//               >
//                 <ProductCard product={product} />
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default App;

// src/App.jsx
import React from 'react';
import Header from './components/Header/Header';
import FilterSection from './components/FilterSection/FilterSection';
import AnimatedProductGrid from './components/AnimatedProductGrid/AnimatedProductGrid';
import { useProducts } from './hooks/useProducts';
import './App.css';

function App() {
  const { products, isLoading, error } = useProducts();

  return (
    <div className="container">
      <Header />
      <main>
        <FilterSection />
        <AnimatedProductGrid
          products={products}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </div>
  );
}

export default App;