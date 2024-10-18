// src/components/AnimatedProductGrid/AnimatedProductGrid.jsx
/**
 * Component for displaying a grid of product cards with animations.
 * Handles loading states, errors, and implements staggered animations for product cards.
 * @component
 * @param {Object} props
 * @param {Array} props.products - Array of product objects
 * @param {boolean} props.isLoading - Loading state indicator
 * @param {string|null} props.error - Error message if present
 */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../ProductCard/ProductCard';
import './AnimatedProductGrid.css';

const AnimatedProductGrid = ({ products, isLoading, error }) => {
    // Track component mount state for animation control
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Define animation variants for container and children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    // Handle loading state
    if (isLoading) {
        return (
            <motion.div
                className="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                Curating your selection...
            </motion.div>
        );
    }

    // Handle error state
    if (error) {
        return (
            <motion.p
                className="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {error}
            </motion.p>
        );
    }

    return (
        <>
            <motion.h2
                className="title"
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
            >
                Exquisite Offerings
            </motion.h2>

            <motion.div
                className="product-grid"
                variants={containerVariants}
                initial="hidden"
                animate={mounted ? "visible" : "hidden"}
            >
                {products.map((product) => (
                    <motion.div
                        key={product._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <ProductCard product={product} />
                    </motion.div>
                ))}
            </motion.div>
        </>
    );
};

export default AnimatedProductGrid;