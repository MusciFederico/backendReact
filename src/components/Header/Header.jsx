// src/components/Header/Header.jsx
/**
 * Header component containing navigation and authentication controls.
 * Features animated entrance effect using Framer Motion.
 * @component
 */
import React from 'react';
import { motion } from 'framer-motion';
import './Header.css';

const Header = () => {
    // Define animation variants for header
    const headerVariants = {
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
        <motion.header
            className="header"
            variants={headerVariants}
            initial="hidden"
            animate="visible"
        >
            <nav className="nav">
                <div className="logo">Luxe Boutique</div>
                <div className="nav-links">
                    <a href="#" className="link">Home</a>
                    <a href="#" className="link">Login</a>
                    <a href="#" className="link">Register</a>
                    <button className="button">Sign Out</button>
                </div>
            </nav>
        </motion.header>
    );
};

export default Header;