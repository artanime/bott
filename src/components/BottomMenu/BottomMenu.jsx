import React from 'react';
import './BottomMenu.css';

const BottomMenu = () => {
    return (
        <div className="bottom-menu">
            <button className="menu-btn">
                <i className="menu-btn-icon">🏠</i> {/* Домашняя страница */}
            </button>
            <button className="menu-btn">
                <i className="menu-btn-icon">🛒</i> {/* Корзина */}
            </button>
            <button className="menu-btn">
                <i className="menu-btn-icon">🚚</i> {/* Доставка */}
            </button>
        </div>
    );
};

export default BottomMenu;
