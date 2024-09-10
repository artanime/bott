import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BagItem.css';

const BagItem = ({ product, onRemove }) => {
    const navigate = useNavigate();

    // Переход на детальную страницу товара
    const handleCardClick = () => {
        navigate(`/gallery/${product.id}`);
    };

    return (
        <div className="bag-item" onClick={handleCardClick}>
            <img src={product.image} alt={product.title} className="bag-item-image" />
            <div className="bag-item-info">
                <h3>{product.title}</h3>
                <p>Price: ${product.price}</p>
            </div>
            <button className="remove-btn" onClick={(e) => {
                e.stopPropagation(); // Останавливаем всплытие, чтобы карточка не открывалась при удалении
                onRemove();
            }}>
                Remove
            </button>
        </div>
    );
};

export default BagItem;
