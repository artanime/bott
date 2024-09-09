import React from 'react';
import BagItem from '../BagItem/BagItem'; // Импортируем компонент для отображения карточек товаров

const Bag = ({ bagItems }) => {
    return (
        <div className="bag-page">
            <h1>Your Bag</h1>
            {bagItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="bag-items-list">
                    {bagItems.map((item, index) => (
                        <BagItem key={index} product={item} /> // Отображаем уменьшенные карточки товаров
                    ))}
                </div>
            )}
        </div>
    );
};

export default Bag;
