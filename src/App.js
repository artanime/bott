import React, { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import Header from "./components/Header/Header";
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";
import Gallery from './components/Gallery/Gallery';
import Bag from './components/Bag/Bag'; // Импортируем компонент корзины
import BottomMenu from './components/BottomMenu/BottomMenu';
import './App.css';
import { useTelegram } from "./hooks/useTelegram";

function App() {
    const { tg } = useTelegram();
    const [bagItems, setBagItems] = useState([]); // Состояние для корзины

    useEffect(() => {
        tg.ready();
    }, [tg]);

    // Функция для добавления товара в корзину
    const addToBag = (product) => {
        setBagItems((prevItems) => [...prevItems, product]);
    };

    // Функция для удаления одного экземпляра товара из корзины
    const removeFromBag = (productId) => {
        const index = bagItems.findIndex(item => item.id === productId);
        if (index !== -1) {
            const newItems = [...bagItems];
            newItems.splice(index, 1); // Удаляем только один экземпляр
            setBagItems(newItems);
        }
    };

    return (
        <div className="App">
            <Header />
            <div className="content">
                <Routes>
                    <Route index element={<ProductList addToBag={addToBag} />} /> {/* Передаем функцию добавления в корзину */}
                    <Route path={'form'} element={<Form />} />
                    <Route path={'gallery/:id'} element={<Gallery />} /> {/* Маршрут для галереи */}
                    <Route path={'bag'} element={<Bag bagItems={bagItems} removeFromBag={removeFromBag} />} /> {/* Передаем функцию удаления */}
                </Routes>
            </div>
            <BottomMenu bagItems={bagItems} /> {/* Передаем товары в корзину для отображения количества */}
        </div>
    );
}

export default App;
