import React, { useState, useEffect, useCallback } from 'react';
import './ProductModal.css';

const ProductModal = ({ product, onClose }) => {
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [startX, setStartX] = useState(null); // Начальная позиция касания по оси X

    const media = product.media || [product.image]; // Массив с медиа (фото и видео)

    // Используем useCallback, чтобы сохранить функции неизменными между рендерами
    const prevMedia = useCallback(() => {
        setCurrentMediaIndex((prevIndex) =>
            prevIndex === 0 ? media.length - 1 : prevIndex - 1
        );
    }, [media.length]);

    const nextMedia = useCallback(() => {
        setCurrentMediaIndex((prevIndex) =>
            prevIndex === media.length - 1 ? 0 : prevIndex + 1
        );
    }, [media.length]);

    // Обработчик касания на моб. устройствах
    const handleTouchStart = (event) => {
        setStartX(event.touches[0].clientX);
    };

    const handleTouchMove = (event) => {
        if (!startX) return;

        const currentX = event.touches[0].clientX;
        const diffX = startX - currentX;

        if (diffX > 50) {
            nextMedia(); // Свайп влево
            setStartX(null); // Сброс после свайпа
        } else if (diffX < -50) {
            prevMedia(); // Свайп вправо
            setStartX(null); // Сброс после свайпа
        }
    };

    // Обработчик кликов на изображение для перелистывания
    const handleImageClick = (event) => {
        const imageWidth = event.target.clientWidth;
        const clickX = event.clientX;

        if (clickX < imageWidth / 2) {
            prevMedia(); // Клик на левой половине изображения — листаем влево
        } else {
            nextMedia(); // Клик на правой половине изображения — листаем вправо
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
                nextMedia();
            } else if (event.key === 'ArrowLeft') {
                prevMedia();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [nextMedia, prevMedia]);

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div
                className="modal-content"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
            >
                <button className="close-btn" onClick={onClose}>Закрыть</button>
                <div className="gallery">
                    <button className="gallery-btn" onClick={prevMedia}>◀</button>

                    {/* Определяем, является ли текущий элемент видео или изображением */}
                    {media[currentMediaIndex].includes('.mp4') ? (
                        <video controls className="gallery-media">
                            <source src={media[currentMediaIndex]} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <img
                            src={media[currentMediaIndex]}
                            alt={product.title}
                            className="gallery-media"
                            onClick={handleImageClick} // Обработка клика по изображению
                        />
                    )}

                    <button className="gallery-btn" onClick={nextMedia}>▶</button>
                </div>
                <div className="modal-title">{product.title}</div>
                <div className="modal-description">{product.description}</div>
                <div className="modal-price">Стоимость: <b>{product.price}₽</b></div>
            </div>
        </div>
    );
};

export default ProductModal;
