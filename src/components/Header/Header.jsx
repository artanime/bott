import React from 'react';
import './Header.css';
import Button from "../Button/Button";
import { useTelegram } from "../../hooks/useTelegram";

const Header = () => {
    const {onClose } = useTelegram();

    return (
        <header className="header">
            {/* Левая часть: Логотип и выбор языка */}
            <div className="header-left">
                <img src="/Logo/logo.png" alt="App Logo" className="logo" /> {/* Логотип приложения */}
                <select className="language-selector">
                    <option value="ru">Русский</option>
                    <option value="en">English</option>
                    <option value="ua">Українська</option>
                </select>
            </div>
            {/* Правая часть: Кнопка закрытия */}
            <div className="header-right">
                <Button onClick={onClose} className="close-btn">Закрыть</Button>
            </div>
        </header>
    );
};

export default Header;
