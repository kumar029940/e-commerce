import React from 'react';

export default function Product({ inCart, onToggle, title, description, image, category, price }) {
    return (
        <div className="Product">
            <img src={image} alt={title} />
            <h2>{title}</h2>
            <p>{description.substring(0, 67)}</p>
            <p>Category: {category}</p>
            <p>Price: ${price}</p>
            <button onClick={onToggle}>
                {inCart ? 'Remove from Cart' : 'Add to Cart'}
            </button>
        </div>
    );
}
