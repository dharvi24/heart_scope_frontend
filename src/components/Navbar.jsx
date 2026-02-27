import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaSun, FaMoon, FaBars, FaTimes, FaHome, FaDatabase, FaChartPie, FaHeartbeat, FaInfoCircle } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import Container from './Container';
import './Navbar.css';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav className="navbar">
            <Container>
                <div className="navbar-glass">
                    <Link to="/" className="nav-logo" onClick={closeMenu}>
                        {/* HeartScope icon: heart with ECG pulse line */}
                        <svg width="34" height="28" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="nav-logo-icon">
                            <defs>
                                <linearGradient id="hs-grad" x1="0" y1="0" x2="34" y2="28" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#818cf8" />
                                    <stop offset="100%" stopColor="#f472b6" />
                                </linearGradient>
                            </defs>
                            {/* Heart */}
                            <path d="M17 25S3 16.5 3 8.5a6.5 6.5 0 0 1 14-1.8A6.5 6.5 0 0 1 31 8.5C31 16.5 17 25 17 25z" fill="url(#hs-grad)" opacity="0.9" />
                            {/* ECG pulse line */}
                            <polyline points="5,14 9,14 11,8 13,20 15,11 17,14 19,14 21,9 23,19 25,14 29,14" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.92" />
                        </svg>
                        <span className="nav-logo-text">HeartScope</span>
                    </Link>


                    {/* Overlay for closing menu */}
                    <div className={`nav-overlay ${isOpen ? 'open' : ''}`} onClick={closeMenu}></div>

                    <div className={`nav-links ${isOpen ? 'open' : ''}`}>
                        <div className="mobile-only sidebar-header">
                            <span className="sidebar-title">Menu</span>
                            <button className="sidebar-close" onClick={closeMenu} aria-label="Close Menu">
                                <FaTimes size={20} />
                            </button>
                        </div>

                        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                            <FaHome /> Home
                        </NavLink>

                        <NavLink to="/dataset" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                            <FaDatabase /> Dataset
                        </NavLink>

                        <NavLink to="/performance" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                            <FaChartPie /> Metrics
                        </NavLink>

                        <NavLink to="/predict" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                            <FaHeartbeat /> Predict
                        </NavLink>

                        <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                            <FaInfoCircle /> About
                        </NavLink>
                    </div>

                    {/* Desktop & Mobile Actions (Theme + Menu) */}
                    <div className="nav-actions">
                        <button
                            onClick={toggleTheme}
                            className="theme-toggle"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
                        </button>

                        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </Container>
        </nav>
    );
};

export default Navbar;
