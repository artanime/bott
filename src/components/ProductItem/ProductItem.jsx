import React, { useState } from 'react';
import Button from "../Button/Button";
import './ProductItem.css';
import ProductModal from '../ProductModal/ProductModal'; // Импортируем модальное окно

const ProductItem = ({ product, className, onAdd }) => {
    const [isModalOpen, setModalOpen] = useState(false); // Состояние для открытия/закрытия модального окна


    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <div className={`product ${className}`}>
            <div className="img">
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

            {/* Модальное окно с галереей */}
            {isModalOpen && <ProductModal product={product} onClose={closeModal} />}
        </div>
    );
};

export default ProductItem;
