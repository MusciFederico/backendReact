// src/App.jsx
/**
 * Main application component that serves as the root container for the e-commerce application.
 * Implements a container-based layout with header, filter section, and product grid.
 * Uses the custom useProducts hook to manage product data fetching and state.
 */
import React from 'react';
import Header from './components/Header/Header';
import FilterSection from './components/FilterSection/FilterSection';
import AnimatedProductGrid from './components/AnimatedProductGrid/AnimatedProductGrid';
import { useProducts } from './hooks/useProducts';
import './App.css';

function App() {
  // Destructure the product data and loading states from the custom hook
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