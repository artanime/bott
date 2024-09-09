import React, { useState } from 'react';
import './ProductModal.css';

const ProductModal = ({ product, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = product.images || [product.image]; // Массив с фотографиями продукта

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleBackdropClick = (event) => {
        // Закрытие галереи при нажатии на фон (если клик был на backdrop)
        if (event.target.className === 'modal-backdrop') {
            onClose();
        }
    };

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>Закрыть</button>
                <div className="gallery">
                    <button className="gallery-btn" onClick={prevImage}>◀</button>
                    <img src={images[currentImageIndex]} alt={product.title} className="gallery-img" />
                    <button className="gallery-btn" onClick={nextImage}>▶</button>
                </div>
                <div className="modal-title">{product.title}</div>
                <div className="modal-description">{product.description}</div>
                <div className="modal-price">Стоимость: <b>{product.price}₽</b></div>
            </div>
        </div>
    );
};

export default ProductModal;
