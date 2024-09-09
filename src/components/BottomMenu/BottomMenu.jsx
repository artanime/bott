import React from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link для маршрутизации
import './BottomMenu.css';

const BottomMenu = () => {
    return (
        <div className="bottom-menu">
            <Link to="/" className="menu-btn"> {/* Домашняя страница */}
                <i className="menu-btn-icon">🏠</i>
                <span className="menu-btn-label">Home</span>
            </Link>
            <Link to="/bag" className="menu-btn"> {/* Корзина */}
                <i className="menu-btn-icon">🛒</i>
                <span className="menu-btn-label">Bag</span>
            </Link>
            <Link to="/delivery" className="menu-btn"> {/* Доставка */}
                <i className="menu-btn-icon">🚚</i>
                <span className="menu-btn-label">Delivery</span>
            </Link>
        </div>
    );
};

export default BottomMenu;
