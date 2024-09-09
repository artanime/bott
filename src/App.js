import React, { useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import Header from "./components/Header/Header";
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";
import Gallery from './components/Gallery/Gallery'; // Импортируем компонент галереи
import BottomMenu from './components/BottomMenu/BottomMenu'; // Импортируем компонент нижнего меню
import './App.css'; // Не забываем про общий файл стилей
import { useTelegram } from "./hooks/useTelegram";

function App() {
    const { tg } = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [tg]);

    return (
        <div className="App">
            <Header />
            <div className="content">
                <Routes>
                    <Route index element={<ProductList />} />
                    <Route path={'form'} element={<Form />} />
                    <Route path={'gallery/:id'} element={<Gallery />} /> {/* Маршрут для галереи */}
                </Routes>
            </div>
            <BottomMenu />
        </div>
    );
}

export default App;
