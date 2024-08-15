import React, { useState } from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";

const products = [
    { id: '1', title: 'Аттака Титанов', price: 5000, description: 'Синего цвета, прямые', image: 'Photo/attack.jpg' },
    { id: '2', title: 'Наруто', price: 12000, description: 'Зеленого цвета, теплая', image: 'Photo/2.1.jpg' },
    { id: '3', title: 'Город', price: 5000, description: 'Синего цвета, прямые', image: 'Photo/3.1.jpg' },
    { id: '4', title: 'Аватар', price: 122, description: 'Зеленого цвета, теплая', image: 'Photo/4.1jpg' },
];

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => acc + item.price, 0);
};

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);

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

    return (
        <div className="list">
            {products.map(item => (
                <ProductItem
                    key={item.id} // Уникальный ключ для каждого элемента
                    product={item}
                    onAdd={onAdd}
                    className="item"
                />
            ))}
            <div className="total">
                <span>Total Price: <b>{getTotalPrice(addedItems)}₽</b></span>
            </div>
        </div>
    );
};

export default ProductList;
