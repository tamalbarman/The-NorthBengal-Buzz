import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAntiBot } from '../context/AntiBotContext';

const PackageCard = ({ pkg }) => {
  const cardRef = useRef(null);
  const { openVerifiedWhatsApp } = useAntiBot();

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  const hasDiscount = (pkg.discountPercent || 0) > 0;
  const originalPriceFormatted = pkg.originalPrice
    ? `₹${Number(pkg.originalPrice).toLocaleString('en-IN')}`
    : null;

  const whatsappMessage = `Hi! I want to inquire about the ${pkg.title} package (${pkg.price}).`;

  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    openVerifiedWhatsApp(whatsappMessage);
  };

  return (
    <div
      ref={cardRef}
      className="box tilt-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-category={pkg.category || pkg.region}
    >
      <div className="image">
        <img src={pkg.image} alt={pkg.title} />
        {pkg.tag && (
          <span className="tag">
            <i className={pkg.tagIcon || 'fas fa-tag'}></i> {pkg.tag}
          </span>
        )}
        {hasDiscount && (
          <span className="discount-tag-badge">
            <i className="fas fa-bolt"></i> {pkg.discountPercent}% OFF
          </span>
        )}
      </div>

      <div className="content">
        <div className="card-top-meta">
          <span className="duration">
            <i className="fas fa-clock"></i> {pkg.duration}
          </span>
          <span className="rating">
            <i className="fas fa-star text-yellow"></i> {pkg.rating || '4.9 (12)'}
          </span>
        </div>

        <h3 className="card-title">{pkg.title}</h3>
        <p className="card-desc">{pkg.description}</p>

        <div className="pricing-container">
          {hasDiscount ? (
            <div className="price-row">
              <span className="original-strike-price">
                <del>{originalPriceFormatted}</del>
              </span>
              <span className="final-price-tag">{pkg.price}</span>
              <span className="price-sub">/ person</span>
            </div>
          ) : (
            <div className="price-row">
              <span className="final-price-tag">{pkg.price}</span>
              <span className="price-sub">/ person</span>
            </div>
          )}
        </div>

        <div className="card-btn-row">
          <Link to={`/book?package=${pkg.id}`} className="btn btn-primary">Book Now</Link>
          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="btn-whatsapp-icon"
            title="Verify & Ask Owner on WhatsApp"
            aria-label="Ask Owner on WhatsApp"
          >
            <i className="fab fa-whatsapp"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
