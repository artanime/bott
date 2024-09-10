import React from 'react';
import './Filters.css';

const categories = [
    { name: 'Аниме', icon: '🎌' },
    { name: 'Одежда', icon: '👕' },
    { name: 'Кружки', icon: '☕' },
    { name: 'Брелки', icon: '🔑' },
    { name: 'Картины', icon: '🖼️' }
];

const Filters = ({ onSelectCategory, selectedCategory }) => {
    return (
        <div className="filters-container">
            {categories.map((category) => (
                <button
                    key={category.name}
                    className={`filter-button ${selectedCategory === category.name ? 'active' : ''}`}
                    onClick={() => onSelectCategory(category.name)}
                >
                    <span className="filter-icon">{category.icon}</span>
                    <span className="filter-name">{category.name}</span>
                </button>
            ))}
        </div>
    );
};

export default Filters;
