import React from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";

const products = [
    {
        id: '1',
        title: 'Attack on Titan',
        price: 1500,
        image: 'Images/attack.jpg',
    }
];

const ProductList = ({ addToBag }) => {
    return (
        <div className="list">
            {products.map(item => (
                <ProductItem
                    key={item.id}
                    product={item}
                    onAdd={() => addToBag(item)} // Добавляем товар в корзину
                    className="item"
                />
            ))}
        </div>
    );
};

export default ProductList;
