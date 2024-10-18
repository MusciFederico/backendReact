// // import React, { useCallback } from 'react';
// // import { debounce } from '../../utils/debouncer';

// // const ProductCard = React.memo(({ product }) => {
// //     const handleMouseMove = useCallback((e, card) => {
// //         const { left, top, width, height } = card.getBoundingClientRect();
// //         const centerX = left + width / 2;
// //         const centerY = top + height / 2;
// //         const mouseX = e.clientX - centerX;
// //         const mouseY = e.clientY - centerY;
// //         // Reversed the signs here to change the tilt direction
// //         const rotateX = (mouseY / height) * -10; // Max rotation of 10 degrees
// //         const rotateY = (mouseX / width) * 10; // Max rotation of 10 degrees

// //         card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
// //     }, []);

// //     // Debounced version of handleMouseMove
// //     const debouncedHandleMouseMove = useCallback(
// //         debounce((e, card) => handleMouseMove(e, card), 10),
// //         [handleMouseMove]
// //     );

// //     const handleMouseLeave = useCallback((card) => {
// //         card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
// //     }, []);

// //     return (
// //         <div
// //             className="product-card"
// //             onMouseMove={(e) => debouncedHandleMouseMove(e, e.currentTarget)}
// //             onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
// //         >
// //             <div className="product-card-inner">
// //                 <img src={product.photo} alt={product.name} className="product-image" />
// //                 <div className="product-info">
// //                     <h3 className="product-name">{product.name}</h3>
// //                     <p className="product-price">${product.price.toFixed(2)}</p>
// //                     <p className="product-stock">Available: {product.stock}</p>
// //                     <button className="button button-primary">Add to Cart</button>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // });

// // export default ProductCard;

// // src/components/ProductCard/ProductCard.jsx
// import React, { useCallback } from 'react';
// import { debounce } from '../../utils/debouncer';
// import './ProductCard.css';

// const ProductCard = React.memo(({ product }) => {
//     const handleMouseMove = useCallback((e, card) => {
//         const { left, top, width, height } = card.getBoundingClientRect();
//         const centerX = left + width / 2;
//         const centerY = top + height / 2;
//         const mouseX = e.clientX - centerX;
//         const mouseY = e.clientY - centerY;
//         const rotateX = (mouseY / height) * -10;
//         const rotateY = (mouseX / width) * 10;

//         card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
//     }, []);

//     const debouncedHandleMouseMove = useCallback(
//         debounce((e, card) => handleMouseMove(e, card), 10),
//         [handleMouseMove]
//     );

//     const handleMouseLeave = useCallback((card) => {
//         card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
//     }, []);

//     return (
//         <div
//             className="product-card"
//             onMouseMove={(e) => debouncedHandleMouseMove(e, e.currentTarget)}
//             onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
//         >
//             <div className="product-card-inner">
//                 <img src={product.photo} alt={product.name} className="product-image" />
//                 <div className="product-info">
//                     <h3 className="product-name">{product.name}</h3>
//                     <p className="product-price">${product.price.toFixed(2)}</p>
//                     <p className="product-stock">Available: {product.stock}</p>
//                     <button className="button button-primary">Add to Cart</button>
//                 </div>
//             </div>
//         </div>
//     );
// });

// export default ProductCard;
// src/components/ProductCard/ProductCard.jsx
import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { debounce } from '../../utils/debouncer';
import './ProductCard.css';

const ProductCard = React.memo(({ product }) => {
    const handleMouseMove = useCallback((e, card) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        const rotateX = (mouseY / rect.height) * -10;
        const rotateY = (mouseX / rect.width) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    }, []);

    const debouncedHandleMouseMove = useCallback(
        debounce((e, card) => handleMouseMove(e, card), 10),
        [handleMouseMove]
    );

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
