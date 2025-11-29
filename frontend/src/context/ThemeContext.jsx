import React, { createContext, useContext, useState, useEffect } from 'react';
import { settings } from '../mockData';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    // Initialize theme from settings or default to 'black-blue'
    const [theme, setTheme] = useState(settings.theme || 'black-blue');

    useEffect(() => {
        // Apply theme to document body
        document.body.setAttribute('data-theme', theme);

        // Also update local storage or persist if needed (mocked here via settings)
        // In a real app, we might save to localStorage here
    }, [theme]);

    const switchTheme = (newTheme) => {
        setTheme(newTheme);
        // Update mock settings for consistency
        settings.theme = newTheme;
    };

    return (
        <ThemeContext.Provider value={{ theme, switchTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
