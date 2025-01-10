import React, { useEffect, useState } from 'react';

const DarkMode = () => {
    // Initialize state from localStorage
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    // Set the theme on page load
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // Toggle the theme between dark and light
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <button onClick={toggleTheme} id="theme-toggle">
            Toggle Dark Mode
        </button>
    );
};

export default DarkMode;
