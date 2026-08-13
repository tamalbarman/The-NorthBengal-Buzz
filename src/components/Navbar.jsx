import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { SITE_CONFIG } from '../config/siteConfig';

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const closeMenu = () => {
    setMenuActive(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (menuActive) {
        setMenuActive(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuActive]);

  const isActive = (path) => location.pathname === path;

  const handleHomeClick = (e) => {
    closeMenu();
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleTeaStoreClick = (e) => {
    e.preventDefault();
    closeMenu();
    if (location.pathname === '/') {
      const el = document.getElementById('tea-store');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('tea-store');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  };

  return (
    <header className="header">
      <Link to="/" className="brand-logo-wrap" onClick={handleHomeClick}>
        <div className="logo-emblem-ring">
          <img src="/assets/images/logo.png" alt="The Northbengal Buzz Logo" />
        </div>
        <div className="brand-text-block">
          <span className="brand-title">{SITE_CONFIG.name}</span>
          <span className="brand-tagline">
            <i className="fas fa-leaf text-green"></i> Travel & Himalayan Teas
          </span>
        </div>
      </Link>

      <nav className={`navbar ${menuActive ? 'active' : ''}`} aria-label="Main Navigation">
        <Link to="/" className={isActive('/') ? 'active' : ''} onClick={handleHomeClick}>
          home
        </Link>
        <Link to="/about" className={isActive('/about') ? 'active' : ''} onClick={closeMenu}>
          about
        </Link>
        <Link to="/package" className={isActive('/package') ? 'active' : ''} onClick={closeMenu}>
          package
        </Link>
        <a href="#tea-store" className="nav-tea-link" onClick={handleTeaStoreClick}>
          <i className="fas fa-leaf text-green"></i> tea store
        </a>
        <Link to="/book" className={isActive('/book') ? 'active' : ''} onClick={closeMenu}>
          book
        </Link>
      </nav>

      <div className="nav-right">
        {/* Theme Toggle Button */}
        <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label="Toggle dark and light mode theme"
          title={theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
        >
          <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
        </button>

        <button
          type="button"
          id="menu-btn"
          className={`fas ${menuActive ? 'fa-times' : 'fa-bars'}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={menuActive}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        ></button>
      </div>
    </header>
  );
};

export default Navbar;
