// // src/components/ProductGrid/AnimatedProductGrid.jsx
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import ProductCard from '../ProductCard/ProductCard';
// import './AnimatedProductGrid.css';

// const AnimatedProductGrid = ({ products, isLoading, error }) => {
//     const [mounted, setMounted] = useState(false);

//     useEffect(() => {
//         setMounted(true);
//     }, []);

//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.1,
//                 delayChildren: 0.3
//             }
//         }
//     };

//     const titleVariants = {
//         hidden: { opacity: 0, x: -20 },
//         visible: {
//             opacity: 1,
//             x: 0,
//             transition: {
//                 duration: 0.5,
//                 ease: "easeOut"
//             }
//         }
//     };

//     if (isLoading) {
//         return (
//             <motion.div
//                 className="loading"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//             >
//                 Curating your selection...
//             </motion.div>
//         );
//     }

//     if (error) {
//         return (
//             <motion.p
//                 className="error"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//             >
//                 {error}
//             </motion.p>
//         );
//     }

//     return (
//         <>
//             <motion.h2
//                 className="title"
//                 variants={titleVariants}
//                 initial="hidden"
//                 animate="visible"
//                 transition={{ delay: 0.2 }}
//             >
//                 Exquisite Offerings
//             </motion.h2>

//             <motion.div
//                 className="product-grid"
//                 variants={containerVariants}
//                 initial="hidden"
//                 animate={mounted ? "visible" : "hidden"}
//             >
//                 {products.map((product) => (
//                     <motion.div
//                         key={product._id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.5 }}
//                     >
//                         <ProductCard product={product} />
//                     </motion.div>
//                 ))}
//             </motion.div>
//         </>
//     );
// };

// export default AnimatedProductGrid;
// src/components/ProductGrid/AnimatedProductGrid.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../ProductCard/ProductCard';
import './AnimatedProductGrid.css';

const AnimatedProductGrid = ({ products, isLoading, error }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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