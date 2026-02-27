import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Initialize theme from localStorage or default to 'dark'
    const getInitialTheme = () => {
        if (typeof window === 'undefined') return 'dark';
        
        try {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'light' || savedTheme === 'dark') {
                return savedTheme;
            }
        } catch (error) {
            console.warn('Error reading theme from localStorage:', error);
        }
        return 'dark';
    };

    const [theme, setTheme] = useState(() => {
        const initialTheme = getInitialTheme();
        // Set immediately on initialization
        if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('data-theme', initialTheme);
        }
        return initialTheme;
    });

    // Set theme attribute on document element whenever theme changes
    useEffect(() => {
        if (typeof document === 'undefined') return;
        
        const root = document.documentElement;
        root.setAttribute('data-theme', theme);
        root.classList.remove('theme-dark', 'theme-light');
        root.classList.add(`theme-${theme}`);
        
        try {
            localStorage.setItem('theme', theme);
        } catch (error) {
            console.warn('Error saving theme to localStorage:', error);
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => {
            const newTheme = prev === 'dark' ? 'light' : 'dark';
            // Immediately update the DOM for instant feedback
            if (typeof document !== 'undefined') {
                const root = document.documentElement;
                root.setAttribute('data-theme', newTheme);
                root.classList.remove('theme-dark', 'theme-light');
                root.classList.add(`theme-${newTheme}`);
                try {
                    localStorage.setItem('theme', newTheme);
                } catch (error) {
                    console.warn('Error saving theme:', error);
                }
            }
            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
