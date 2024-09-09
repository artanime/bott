import React, { useState } from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import ProductModal from "../ProductModal/ProductModal"; // Если есть модальное окно

const products = [
    {
        id: '1',
        title: 'Attack on Titan',
        price: 1500,
        image: 'Images/attack.jpg',
        media: ['Images/attack.jpg', 'Images/6.jpg', 'Images/titan.mp4'] // Вставляем ссылки на видео и изображения
    }
];

const ProductList = ({ addToBag }) => {
    const [selectedProduct, setSelectedProduct] = useState(null); // Открытие галереи

    // Открываем галерею для выбранного продукта
    const openGallery = (product) => {
        setSelectedProduct(product);
    };

    // Закрываем галерею
    const closeGallery = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="list">
            {products.map(item => (
                <ProductItem
                    key={item.id}
                    product={item}
                    onAdd={addToBag}
                    onOpenGallery={() => openGallery(item)} // Передаем функцию открытия галереи
                    className="item"
                />
            ))}

            {/* Если выбран продукт, показываем модальное окно */}
            {selectedProduct && (
                <ProductModal product={selectedProduct} onClose={closeGallery} />
            )}
        </div>
    );
};

export default ProductList;
