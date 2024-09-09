import React, { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import './Gallery.css';

const products = [
    { id: '1', title: 'Attack on Titan',
        media: [
            { type: 'image', src: '/images/attack.jpg' },
            { type: 'image', src: '/images/6.jpg' },
            { type: 'image', src: '/images/5.jpg' },
            { type: 'image', src: '/images/4.1.jpg' },
            { type: 'video', src: '/images/titan.mp4' } // Пример видео
        ]
    },
];

const Gallery = () => {
    const { id } = useParams();
    const product = products.find(p => p.id === id);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [startX, setStartX] = useState(null);

    // Вызов хуков вне условий
    const prevMedia = useCallback(() => {
        if (product) {
            setCurrentMediaIndex((prevIndex) =>
                prevIndex === 0 ? product.media.length - 1 : prevIndex - 1
            );
        }
    }, [product]);

    const nextMedia = useCallback(() => {
        if (product) {
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

    // Если продукт не найден, возвращаем сообщение
    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="gallery-page">
            <h1>{product.title} Gallery</h1>
            <div className="gallery-grid">
                {product.media.map((item, index) => (
                    <div key={index} className="gallery-item">
                        {item.type === 'image' ? (
                            <img
                                src={item.src}
                                alt={`Gallery media ${index + 1}`}
                                className="gallery-image"
                                onClick={() => openFullscreen(index)}
                            />
                        ) : (
                            <video
                                src={item.src}
                                className="gallery-video"
                                onClick={() => openFullscreen(index)}
                                controls
                            />
                        )}
                    </div>
                ))}
            </div>

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
                                alt={`Fullscreen ${currentMediaIndex + 1}`}
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
