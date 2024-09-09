import React, { useState } from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import ProductModal from "../ProductModal/ProductModal"; // Импортируем модальное окно

const products = [
    { id: '1', title: 'Attack on Titan', price: 1500, image: 'Photo/attack.jpg', images: ['Photo/attack.jpg', 'Photo/6.jpg', 'Photo/5.jpg', 'Photo/4.1.jpg'] }
];

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null); // Для хранения выбранного продукта (открытой галереи)

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if (alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems);
    };

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
                    key={item.id} // Уникальный ключ для каждого элемента
                    product={item}
                    onAdd={onAdd}
                    onOpenGallery={openGallery} // Передаем функцию для открытия галереи
                    className="item"
                />
            ))}

            {/* Модальное окно с галереей, если продукт выбран */}
            {selectedProduct && (
                <ProductModal product={selectedProduct} onClose={closeGallery} />
            )}
        </div>
    );
};

export default ProductList;
