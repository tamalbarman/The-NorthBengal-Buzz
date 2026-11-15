import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCMS } from '../context/CMSContext';
import { SITE_CONFIG } from '../config/siteConfig';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isAdminLoggedIn } = useCMS();
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

  const scrollToSection = (sectionId) => (e) => {
    e.preventDefault();
    closeMenu();
    if (location.pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
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
        <a href="#route-map" onClick={scrollToSection('route-map')}>
          <i className="fas fa-map-location-dot text-gold"></i> route map
        </a>
        <a href="#weather-guide" onClick={scrollToSection('weather-guide')}>
          <i className="fas fa-cloud-sun text-yellow"></i> weather
        </a>
        <a href="#trip-planner" onClick={scrollToSection('trip-planner')}>
          <i className="fas fa-calculator text-teal"></i> trip planner
        </a>
        <a href="#cabs" onClick={scrollToSection('cabs')}>
          <i className="fas fa-taxi text-yellow"></i> cabs
        </a>
        <a href="#permits" onClick={scrollToSection('permits')}>
          <i className="fas fa-file-contract text-teal"></i> permits
        </a>
        <a href="#activities" onClick={scrollToSection('activities')}>
          <i className="fas fa-hiking text-green"></i> adventure
        </a>
        <a href="#tea-store" className="nav-tea-link" onClick={scrollToSection('tea-store')}>
          <i className="fas fa-leaf text-green"></i> tea store
        </a>
        <Link to="/book" className={isActive('/book') ? 'active' : ''} onClick={closeMenu}>
          book
        </Link>
        <Link to="/admin" className={`nav-admin-link ${isActive('/admin') ? 'active' : ''}`} onClick={closeMenu}>
          <i className="fas fa-user-shield"></i> {isAdminLoggedIn ? 'Admin CMS' : 'Admin'}
        </Link>
      </nav>

      <div className="nav-right">
        {/* Sunset / Sunrise Celestial Theme Toggle */}
        <ThemeToggle />

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
