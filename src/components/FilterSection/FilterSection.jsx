// src/components/FilterSection/FilterSection.jsx
/**
 * Filter section component that provides search and sorting functionality.
 * Implements animated appearance using Framer Motion.
 * @component
 */
import React from 'react';
import { motion } from 'framer-motion';
import './FilterSection.css';

const FilterSection = () => {
    // Define animation variants for filter section
    const filterVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div
            className="filter-section"
            variants={filterVariants}
            initial="hidden"
            animate="visible"
        >
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
        </motion.div>
    );
};

export default FilterSection;