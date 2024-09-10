import React from 'react';
import BagItem from '../BagItem/BagItem'; // Импортируем компонент для отображения карточек товаров

const Bag = ({ bagItems, removeFromBag }) => {
    return (
        <div className="bag-page">
            {bagItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="bag-items-list">
                    {bagItems.map((item, index) => (
                        <BagItem key={index} product={item} onRemove={() => removeFromBag(item.id)} /> // Передаем функцию удаления
                    ))}
                </div>
            )}
        </div>
    );
};

export default Bag;
