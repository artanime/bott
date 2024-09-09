import React from 'react';
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css';

const Header = () => {
    const {user, onClose} = useTelegram();

    return (
        <div className="header">
            <div className="header-left">
                <img src="/Logo/logo.png" alt="App Logo" className="logo" /> {/* Логотип приложения */}
                <select className="language-selector">
                    <option value="ru">Русский</option>
                    <option value="en">English</option>
                    <option value="ua">Українська</option>
                </select>
            </div>
            <div className="header-right">
                <Button onClick={onClose}>Закрыть</Button>
            </div>
        </div>
    );
};

export default Header;
