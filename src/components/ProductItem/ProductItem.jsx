import React from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate для перенаправления
import Button from "../Button/Button";
import './ProductItem.css';

const ProductItem = ({ product, className, onAdd }) => {
    const navigate = useNavigate(); // Используем useNavigate для перенаправления

    // Обработчик для перехода на страницу галереи
    const handleCardClick = () => {
        navigate(`/gallery/${product.id}`); // Перенаправляем на страницу галереи продукта
    };

    const onAddHandler = (e) => {
        e.stopPropagation(); // Останавливаем событие, чтобы не сработало открытие галереи
        onAdd(product); // Добавляем товар в корзину
    };

    return (
        <div className={`product ${className}`} onClick={handleCardClick}> {/* При клике на карточку */}
            <div className="title">{product.title}</div>
            <div className="img">
                <img src={product.image} alt={product.title} />
            </div>
            <div className="description">{product.description}</div>
            <div className="bottom-section">
                <div className="price">
                    <span>Price: <b>${product.price}</b></span>
                </div>
                <Button className="add-btn" onClick={onAddHandler}>
                    Look
                </Button>
            </div>
        </div>
    );
};

export default ProductItem;
