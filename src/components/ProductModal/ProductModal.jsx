import React, { useState, useCallback } from 'react';
import './ProductModal.css';

const ProductModal = ({ product, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [startX, setStartX] = useState(null); // Для отслеживания начальной точки свайпа

    const images = product.images || [product.image]; // Массив с фотографиями продукта

    // Функция для перехода к предыдущему изображению
    const prevImage = useCallback(() => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    }, [images.length]);

    // Функция для перехода к следующему изображению
    const nextImage = useCallback(() => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    }, [images.length]);

    // Обработка начала касания для свайпа
    const handleTouchStart = (event) => {
        setStartX(event.touches[0].clientX);
    };

    // Обработка движения касания для свайпа
    const handleTouchMove = (event) => {
        if (!startX) return;

        const currentX = event.touches[0].clientX;
        const diffX = startX - currentX;

        if (diffX > 50) {
            nextImage(); // Свайп влево (переход к следующему изображению)
            setStartX(null); // Сброс после свайпа
        } else if (diffX < -50) {
            prevImage(); // Свайп вправо (переход к предыдущему изображению)
            setStartX(null); // Сброс после свайпа
        }
    };

    // Обработка кликов на левую или правую сторону изображения
    const handleImageClick = (event) => {
        const imageWidth = event.target.clientWidth;
        const clickX = event.clientX;

        if (clickX < imageWidth / 2) {
            prevImage(); // Клик на левой части изображения
        } else {
            nextImage(); // Клик на правой части изображения
        }
    };

    // Обработка клика на задний фон для закрытия галереи
    const handleBackdropClick = (event) => {
        if (event.target.className === 'modal-backdrop') {
            onClose();
        }
    };

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div
                className="modal-content"
                onTouchStart={handleTouchStart} // Начало свайпа
                onTouchMove={handleTouchMove}  // Движение свайпа
            >
                <button className="close-btn" onClick={onClose}>Закрыть</button>
                <div className="gallery">
                    {/* Обработчик клика по изображению */}
                    <img
                        src={images[currentImageIndex]}
                        alt={product.title}
                        className="gallery-img"
                        onClick={handleImageClick} // Клик по левой или правой части изображения
                    />
                </div>
                <div className="modal-title">{product.title}</div>
                <div className="modal-description">{product.description}</div>
                <div className="modal-price">Стоимость: <b>{product.price}₽</b></div>
            </div>
        </div>
    );
};

export default ProductModal;
