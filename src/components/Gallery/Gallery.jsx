import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import './Gallery.css';

const products = [
    { id: '1', title: 'Attack on Titan',
        images: [
            '/images/attack.jpg',
            '/images/6.jpg',
            '/images/5.jpg',
            '/images/4.1.jpg'] },
];

const Gallery = () => {
    const { id } = useParams(); // Получаем ID из URL
    const navigate = useNavigate(); // Используем useNavigate для навигации
    const product = products.find(p => p.id === id); // Находим продукт по ID

    if (!product) {
        return <div>Product not found</div>;
    }

    // Функция для возврата на предыдущую страницу
    const handleGoBack = () => {
        navigate(-1); // Вернуться на предыдущую страницу
    };

    return (
        <div className="gallery-page">
            <button className="back-button" onClick={handleGoBack}>Назад</button> {/* Кнопка "Назад" */}
            <h1>{product.title} Gallery</h1>
            <div className="gallery-grid">
                {product.images.map((image, index) => (
                    <div key={index} className="gallery-item">
                        <img
                            src={image}
                            alt={`${product.title} ${index + 1}`}
                            className="gallery-image"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
