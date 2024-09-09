import React, { useState } from 'react';
import Button from "../Button/Button";
import './ProductItem.css';
import ProductModal from '../ProductModal/ProductModal'; // Импортируем модальное окно с галереей

const ProductItem = ({ product, className, onAdd }) => {
    const [isModalOpen, setModalOpen] = useState(false); // Состояние для открытия/закрытия галереи

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className={`product ${className}`}>
            <div className="img" onClick={openModal}> {/* Добавляем обработчик клика на изображение */}
                <img src={product.image} alt={product.title} />
            </div>
            <div className="title">{product.title}</div>
            <div className="description">{product.description}</div>
            <div className="price">
                <span>Стоимость: <b>{product.price}₽</b></span>
            </div>
            <Button className="add-btn" onClick={openModal}>
                Look
            </Button>

            {/* Модальное окно с галереей фотографий */}
            {isModalOpen && <ProductModal product={product} onClose={closeModal} />}
        </div>
    );
};

export default ProductItem;
