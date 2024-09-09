import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Используем useNavigate для кнопки "Назад"
import './Gallery.css';

const products = [
    { id: '1', title: 'Attack on Titan',
        media: [
            { type: 'image', src: '/images/attack.jpg' },
            { type: 'image', src: '/images/6.jpg' },
            { type: 'image', src: '/images/5.jpg' },
            { type: 'image', src: '/images/4.1.jpg' },
            { type: 'video', src: '/videos/sample.mp4', poster: '/images/video-preview.jpg' }
        ]
    },
];

const Gallery = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Хук для навигации назад
    const product = products.find(p => p.id === id);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [startX, setStartX] = useState(null);

    // Функции для листания медиа
    const prevMedia = useCallback(() => {
        if (product?.media) {
            setCurrentMediaIndex((prevIndex) =>
                prevIndex === 0 ? product.media.length - 1 : prevIndex - 1
            );
        }
    }, [product]);

    const nextMedia = useCallback(() => {
        if (product?.media) {
            setCurrentMediaIndex((prevIndex) =>
                prevIndex === product.media.length - 1 ? 0 : prevIndex + 1
            );
        }
    }, [product]);

    const openFullscreen = (index) => {
        setCurrentMediaIndex(index);
        setIsFullscreen(true);
    };

    const closeFullscreen = () => {
        setIsFullscreen(false);
    };

    const handleTouchStart = (event) => {
        setStartX(event.touches[0].clientX);
    };

    const handleTouchMove = (event) => {
        if (!startX) return;
        const currentX = event.touches[0].clientX;
        const diffX = startX - currentX;

        if (diffX > 50) {
            nextMedia();
            setStartX(null);
        } else if (diffX < -50) {
            prevMedia();
            setStartX(null);
        }
    };

    const handleClick = (event) => {
        const screenWidth = window.innerWidth;
        const clickX = event.clientX;

        if (clickX > screenWidth * 0.9) {
            nextMedia();
        } else if (clickX < screenWidth * 0.1) {
            prevMedia();
        } else if (event.target.className === 'fullscreen-backdrop') {
            closeFullscreen();
        }
    };

    // Разделяем изображения и видео для показа в разных контейнерах
    const images = product?.media.filter(item => item.type === 'image');
    const videos = product?.media.filter(item => item.type === 'video');

    // Если продукт не найден, возвращаем сообщение
    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="gallery-page">
            {/* Кнопка "Назад" */}
            <button className="back-button" onClick={() => navigate(-1)}>
                ← Назад
            </button>

            <h1>{product.title}</h1>

            {/* Галерея изображений */}
            <h2>Gallery</h2>
            <div className="gallery-grid">
                {images.map((image, index) => (
                    <div key={index} className="gallery-item">
                        <img
                            src={image.src}
                            alt={`View of ${product.title}`}
                            className="gallery-image"
                            onClick={() => openFullscreen(index)}
                        />
                    </div>
                ))}
            </div>

            {/* Галерея видео */}
            <h2>Media Gallery</h2>
            <div className="media-gallery-grid">
                {videos.map((video, index) => (
                    <div key={index + images.length} className="media-item">
                        <video
                            src={video.src}
                            className="gallery-video"
                            poster={video.poster} /* Добавляем постер для видео */
                            controls
                            onClick={() => openFullscreen(index + images.length)}
                        />
                    </div>
                ))}
            </div>

            {/* Полноэкранный режим для изображений и видео */}
            {isFullscreen && (
                <div
                    className="fullscreen-backdrop"
                    onClick={handleClick}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    <div className="fullscreen-content">
                        <button className="close-btn" onClick={closeFullscreen}>
                            ✖
                        </button>
                        <button className="prev-btn" onClick={prevMedia}>◀</button>
                        {product.media[currentMediaIndex].type === 'image' ? (
                            <img
                                src={product.media[currentMediaIndex].src}
                                alt={`Fullscreen view of ${product.title}`}
                                className="fullscreen-image"
                            />
                        ) : (
                            <video
                                src={product.media[currentMediaIndex].src}
                                className="fullscreen-video"
                                controls
                                autoPlay
                            />
                        )}
                        <button className="next-btn" onClick={nextMedia}>▶</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
