import React, { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import { Route, Routes } from 'react-router-dom';
import Header from "./components/Header/Header";
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";
import BottomMenu from './components/BottomMenu/BottomMenu'; // Импортируем компонент нижнего меню
import './App.css'; // Не забываем про общий файл стилей

function App() {
    const { tg } = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [tg]);

    return (
        <div className="App">
            <Header />
            {/* Основной контент приложения */}
            <div className="content">
                <Routes>
                    <Route index element={<ProductList />} />
                    <Route path={'form'} element={<Form />} />
                </Routes>
            </div>
            {/* Фиксированное нижнее меню */}
            <BottomMenu />
        </div>
    );
}

export default App;
