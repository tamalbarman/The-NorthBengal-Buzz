import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../config/siteConfig';

const PackageCard = ({ pkg }) => {
  const cardRef = useRef(null);

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
  const whatsappUrl = SITE_CONFIG.getWhatsAppUrl(whatsappMessage);

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
        <h3>{pkg.title}</h3>
        <p>{pkg.description}</p>
        
        <div className="meta-info">
          <span><i className="far fa-clock"></i> {pkg.duration}</span>
          <span><i className={pkg.ratingIcon || "fas fa-star text-yellow"}></i> {pkg.rating}</span>
        </div>

        {/* Clean Single Pricing Block */}
        <div className="price-container">
          {hasDiscount && originalPriceFormatted ? (
            <div className="price-row">
              <span className="orig-price-strike"><del>{originalPriceFormatted}</del></span>
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
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp-icon"
            title="Ask Owner on WhatsApp"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
