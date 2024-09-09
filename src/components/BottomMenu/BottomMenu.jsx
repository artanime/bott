import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Импортируем Link и useLocation для маршрутизации
import './BottomMenu.css';

const BottomMenu = ({ bagItems }) => {
    const location = useLocation(); // Получаем текущий маршрут

    // Функция для подсчета товаров в корзине
    const getBagCount = () => {
        return bagItems.length; // Возвращаем количество товаров в корзине
    };

    return (
        <div className="bottom-menu">
            {/* Домашняя страница */}
            <Link to="/" className={`menu-btn ${location.pathname === '/' ? 'active' : ''}`}>
                <i className="menu-btn-icon">🏠</i>
                <span className="menu-btn-label">Home</span>
            </Link>

            {/* Корзина */}
            <Link to="/bag" className={`menu-btn ${location.pathname === '/bag' ? 'active' : ''}`}>
                <i className="menu-btn-icon">🛒</i>
                <span className="menu-btn-label">Bag</span>
                {getBagCount() > 0 && ( // Показываем количество, если товаров больше 0
                    <span className="bag-count">{getBagCount()}</span>
                )}
            </Link>

            {/* Доставка */}
            <Link to="/delivery" className={`menu-btn ${location.pathname === '/delivery' ? 'active' : ''}`}>
                <i className="menu-btn-icon">🚚</i>
                <span className="menu-btn-label">Delivery</span>
            </Link>
        </div>
    );
};

export default BottomMenu;
