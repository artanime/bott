import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Используем useNavigate для кнопки "Назад"
import './Gallery.css';

const products = [
    { id: '1', title: 'Attack on Titan',
        media: [
            { type: 'image', src: '/images/attack.jpg' },
            { type: 'image', src: '/images/6.jpg' },
            { type: 'image', src: '/images/5.jpg' },
            { type: 'image', src: '/images/4.1.jpg' },
            { type: 'video', src: '/images/titan.mp4', poster: '/images/222.jpg', title: 'Titan Battle' } // Добавляем название видео
        ]
    },
];

const Gallery = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Хук для навигации назад
    const product = products.find(p => p.id === id);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const videoRef = useRef(null); // Используем реф для видео

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
        if (videoRef.current) {
            videoRef.current.pause(); // Останавливаем видео при закрытии
        }
    };

    useEffect(() => {
        if (!isFullscreen && videoRef.current) {
            videoRef.current.pause(); // Останавливаем видео, если полноэкранный режим закрыт
        }
    }, [isFullscreen]);

    const images = product?.media.filter(item => item.type === 'image');
    const videos = product?.media.filter(item => item.type === 'video');

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

            {/* Галерея видео в формате карточки */}
            <h2>Media Gallery</h2>
            <div className="media-gallery-grid">
                {videos.map((video, index) => (
                    <div key={index + images.length} className="media-card">
                        <div className="video-card">
                            <div className="video-poster">
                                <img
                                    src={video.poster}
                                    alt={`Poster of ${video.title}`}
                                    className="video-poster-img"
                                />
                            </div>
                            <div className="video-content">
                                <h3>{video.title}</h3>
                                <button className="play-button" onClick={() => openFullscreen(index + images.length)}>
                                    ▶ Play
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Полноэкранный режим для изображений и видео */}
            {isFullscreen && (
                <div
                    className="fullscreen-backdrop"
                    onClick={closeFullscreen}
                >
                    <div className="fullscreen-content-youtube">
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
                                ref={videoRef} // Добавляем реф для управления видео
                                src={process.env.PUBLIC_URL + product.media[currentMediaIndex].src}
                                className="fullscreen-video-youtube"
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
