// src/components/ProductCard/ProductCard.jsx
/**
 * Product card component that displays individual product information with interactive 3D hover effects.
 * Uses React.memo for performance optimization and implements smooth mouse tracking animations.
 * @component
 * @param {Object} props
 * @param {Object} props.product - Product data object containing name, price, stock, and photo
 */
import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { debounce } from '../../utils/debouncer';
import './ProductCard.css';

const ProductCard = React.memo(({ product }) => {
    // Calculate 3D rotation effect based on mouse position
    const handleMouseMove = useCallback((e, card) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        // Calculate rotation angles based on mouse position relative to card center
        const rotateX = (mouseY / rect.height) * -10;
        const rotateY = (mouseX / rect.width) * 10;

        // Apply 3D transform with perspective
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    }, []);

    // Debounce mouse move handler to improve performance
    const debouncedHandleMouseMove = useCallback(
        debounce((e, card) => handleMouseMove(e, card), 10),
        [handleMouseMove]
    );

    // Reset card transform on mouse leave
    const handleMouseLeave = useCallback((card) => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }, []);

    return (
        <motion.div
            className="product-card"
            onMouseMove={(e) => debouncedHandleMouseMove(e, e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
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
        </motion.div>
    );
});

export default ProductCard;