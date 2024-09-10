import React from 'react';
import ProductItem from '../ProductItem/ProductItem';
import './ProductList.css';

const products = [
    { id: '1', title: 'Attack on Titan', category: 'Аниме', price: 1500, image: 'Images/attack.jpg' },
    { id: '2', title: 'T-Shirt', category: 'Одежда', price: 500, image: 'Images/shirt.jpg' },
    { id: '3', title: 'Mug', category: 'Кружки', price: 300, image: 'Images/mug.jpg' },
    { id: '4', title: 'Keychain', category: 'Брелки', price: 100, image: 'Images/keychain.jpg' },
    { id: '5', title: 'Painting', category: 'Картины', price: 2000, image: 'Images/painting.jpg' }
];

const ProductList = ({ addToBag, selectedCategory }) => {
    // Фильтруем товары по выбранной категории
    const filteredProducts = selectedCategory
        ? products.filter(product => product.category === selectedCategory)
        : products;

    return (
        <div className="product-list">
            {filteredProducts.map((product) => (
                <ProductItem
                    key={product.id}
                    product={product}
                    onAdd={addToBag}
                />
            ))}
        </div>
    );
};

export default ProductList;
