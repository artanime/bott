import React, { useState, useEffect, useCallback } from 'react';
import './ProductModal.css';

const ProductModal = ({ product, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [startX, setStartX] = useState(null); // Начальная позиция касания по оси X

    const images = product.images || [product.image]; // Массив с фотографиями продукта

    // Используем useCallback, чтобы сохранить функции неизменными между рендерами
    const prevImage = useCallback(() => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    }, [images.length]);

    const nextImage = useCallback(() => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    }, [images.length]);

    // Обработчик касания на моб. устройствах
    const handleTouchStart = (event) => {
        setStartX(event.touches[0].clientX);
    };

    const handleTouchMove = (event) => {
        if (!startX) return;

        const currentX = event.touches[0].clientX;
        const diffX = startX - currentX;

        if (diffX > 50) {
            nextImage(); // Свайп влево
            setStartX(null); // Сброс после свайпа
        } else if (diffX < -50) {
            prevImage(); // Свайп вправо
            setStartX(null); // Сброс после свайпа
        }
    };

    const handleBackdropClick = (event) => {
        if (event.target.className === 'modal-backdrop') {
            onClose();
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                nextImage();
            } else if (event.key === 'ArrowLeft') {
                prevImage();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [nextImage, prevImage]); // Добавляем зависимости

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div
                className="modal-content"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
            >
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
