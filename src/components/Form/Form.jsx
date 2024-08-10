import React, { useCallback, useState } from 'react';
import './Form.css';

const Form = () => {
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('physical');

    const onSendData = useCallback(() => {
        const data = {
            country,
            street,
            subject
        };
        // Пример отправки данных на сервер
        fetch('http://example.com/submit', { // Замените на ваш URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, [country, street, subject]);

    const onChangeCountry = (e) => {
        setCountry(e.target.value);
    };

    const onChangeStreet = (e) => {
        setStreet(e.target.value);
    };

    const onChangeSubject = (e) => {
        setSubject(e.target.value);
    };

    // Определяем, отображать ли кнопку "Отправить"
    const showSubmitButton = country && street;

    return (
        <div className="form">
            <h3>Введите ваши данные</h3>
            <input
                className="input"
                type="text"
                placeholder="Страна"
                value={country}
                onChange={onChangeCountry}
            />
            <input
                className="input"
                type="text"
                placeholder="Улица"
                value={street}
                onChange={onChangeStreet}
            />
            <select value={subject} onChange={onChangeSubject} className="select">
                <option value="physical">Физ. лицо</option>
                <option value="legal">Юр. лицо</option>
            </select>
            {showSubmitButton && (
                <button onClick={onSendData} className="submit-button">
                    Отправить
                </button>
            )}
        </div>
    );
};

export default Form;
