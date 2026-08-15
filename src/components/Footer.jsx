import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../config/siteConfig';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="box-container">
        <div className="box brand-box">
          <div className="footer-brand-header">
            <div className="logo-emblem-ring">
              <img src="/assets/images/logo.png" alt="The Northbengal Buzz Logo" />
            </div>
            <div className="brand-text-block">
              <h3 className="footer-brand-title">{SITE_CONFIG.name}</h3>
              <span className="footer-brand-tagline">
                <i className="fas fa-leaf text-green"></i> {SITE_CONFIG.tagline}
              </span>
            </div>
          </div>

          <p className="footer-brand-desc">
            Your trusted local guide to North Bengal & Sikkim exploration, homestays, and authentic Darjeeling Himalayan teas.
          </p>

          <div className="footer-rating-badge">
            <i className="fab fa-google text-yellow"></i>
            <span className="rating-score">4.9 ★★★★★</span>
            <span className="rating-count">(350+ Reviews)</span>
          </div>
        </div>

        <div className="box">
          <h3>Quick Links</h3>
          <Link to="/"><i className="fas fa-angle-right"></i> Home</Link>
          <Link to="/about"><i className="fas fa-angle-right"></i> About Us</Link>
          <Link to="/package"><i className="fas fa-angle-right"></i> Tour Packages</Link>
          <a href="/#tea-store"><i className="fas fa-angle-right"></i> Pure Tea Store</a>
          <Link to="/book"><i className="fas fa-angle-right"></i> Book Trip</Link>
          <Link to="/admin"><i className="fas fa-user-shield"></i> Admin CMS Portal</Link>
        </div>

        <div className="box">
          <h3>Contact & WhatsApp</h3>
          <a href={SITE_CONFIG.getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-whatsapp text-green"></i> {SITE_CONFIG.phone} (WhatsApp Owner)
          </a>
          <a href={`tel:${SITE_CONFIG.tollFree.replace(/[^0-9]/g, '')}`}><i className="fas fa-headset"></i> {SITE_CONFIG.tollFree} (Toll Free)</a>
          <a href={`mailto:${SITE_CONFIG.email}`}><i className="fas fa-envelope"></i> {SITE_CONFIG.email}</a>
          <a href="#"><i className="fas fa-location-dot"></i> {SITE_CONFIG.address}</a>
        </div>

        <div className="box">
          <h3>Follow Us</h3>
          <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i> Facebook</a>
          <a href={SITE_CONFIG.social.twitter} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i> Twitter</a>
          <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i> Instagram</a>
          <a href={SITE_CONFIG.social.youtube} target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i> YouTube</a>
        </div>
      </div>

      <div className="credit">
        © 2026 <span>{SITE_CONFIG.name}</span> | All rights reserved | Developed with <i className="fas fa-heart text-red"></i> by <span>Tamal Barman</span>
      </div>
    </footer>
  );
};

export default Footer;
