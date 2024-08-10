import React from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";

const products = [
    { id: '1', title: 'Аттака Титанов', price: 5000, description: 'Синего цвета, прямые', image: 'Photo/attack.jpg' },
    { id: '2', title: 'Наруто', price: 12000, description: 'Зеленого цвета, теплая', image: 'Photo/2.1.jpg' },
    { id: '3', title: 'Город', price: 5000, description: 'Синего цвета, прямые', image: 'Photo/3.1.jpg' },
    { id: '4', title: 'Аватар', price: 122, description: 'Зеленого цвета, теплая', image: 'Photo/4.1.jpg' },
    { id: '5', title: 'Легенда о Коре', price: 5000, description: 'Синего цвета, прямые', image: 'Photo/5.jpg' },
    { id: '6', title: 'Легенда о Коре', price: 5000, description: 'Синего цвета, прямые', image: 'Photo/6.jpg' },
];

const ProductList = () => {
    const onAdd = (product) => {
        // Обработка добавления товара
    };

    return (
        <div className="product-list">
            {products.map(item => (
                <ProductItem
                    key={item.id} // Уникальный ключ для каждого элемента
                    product={item}
                    onAdd={onAdd}
                    className="item"
                />
            ))}
        </div>
    );
};

export default ProductList;
