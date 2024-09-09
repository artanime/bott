import React from 'react';
import Button from "../Button/Button";
import './ProductItem.css';

const ProductItem = ({ product, className, onAdd, onOpenGallery }) => { // Добавляем onOpenGallery пропс


    // Функция для открытия галереи
    const openGalleryHandler = () => {
        onOpenGallery(product); // Открываем галерею для текущего продукта
    };

    return (
        <div className={`product ${className}`}>
            <div className="title">{product.title}</div> {/* Заголовок */}
            <div className="img" onClick={openGalleryHandler}> {/* Открываем галерею по клику на изображение */}
                <img src={product.image} alt={product.title} />
            </div>
            <div className="description">{product.description}</div>
            <div className="bottom-section">
                <div className="price">
                    <span>Price: <b>${product.price}</b></span> {/* Цена */}
                </div>
                <Button className="add-btn" onClick={openGalleryHandler}> {/* Открываем галерею по клику на кнопку */}
                    Look
                </Button>
            </div>
        </div>
    );
};

export default ProductItem;
