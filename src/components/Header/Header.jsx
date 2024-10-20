// // src/components/Header/Header.jsx
// /**
//  * Header component containing navigation and authentication controls.
//  * Features animated entrance effect using Framer Motion.
//  * @component
//  */
// import React from 'react';
// import { motion } from 'framer-motion';
// import './Header.css';

// const Header = () => {
//     // Define animation variants for header
//     const headerVariants = {
//         hidden: { opacity: 0, y: -20 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: {
//                 duration: 0.6,
//                 ease: "easeOut"
//             }
//         }
//     };

//     return (
//         <motion.header
//             className="header"
//             variants={headerVariants}
//             initial="hidden"
//             animate="visible"
//         >
//             <nav className="nav">
//                 <div className="logo">Luxe Boutique</div>
//                 <div className="nav-links">
//                     <a href="#" className="link">Home</a>
//                     <a href="#" className="link">Login</a>
//                     <a href="#" className="link">Register</a>
//                     <button className="button">Sign Out</button>
//                 </div>
//             </nav>
//         </motion.header>
//     );
// };

// export default Header;
/**
 * Header component containing navigation and authentication controls.
 * Features animated entrance effect using Framer Motion.
 * @component
 */
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

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

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
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
                    <a href="/" className="link">Home</a>
                    {user ? (
                        <>
                            <span className="link">Welcome, {user.name}</span>
                            <button className="button" onClick={handleLogout}>
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <a href="/login" className="link">Login</a>
                            <a href="/register" className="link">Register</a>
                        </>
                    )}
                </div>
            </nav>
        </motion.header>
    );
};

export default Header;