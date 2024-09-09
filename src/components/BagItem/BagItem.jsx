import React from 'react';
import './BagItem.css';

const BagItem = ({ product }) => {
    return (
        <div className="bag-item">
            <div className="bag-item-img">
                <img src={product.image} alt={product.title} />
            </div>
            <div className="bag-item-details">
                <h3 className="bag-item-title">{product.title}</h3>
                <p className="bag-item-price">${product.price}</p>
            </div>
        </div>
    );
};

export default BagItem;
