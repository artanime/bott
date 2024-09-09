import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Обработчик для переключения темы
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Эффект для установки темы при изменении isDarkMode
    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    return (
        <header className="header">
            <div className="header-left">
                <img src="/Logo/logo.png" alt="App Logo" className="logo" />
            </div>
            <div className="header-right">
                <button onClick={toggleTheme} className="theme-switcher">
                    {isDarkMode ? '🌙 Dark' : '☀️ Light'}
                </button>
            </div>
        </header>
    );
};

export default Header;
