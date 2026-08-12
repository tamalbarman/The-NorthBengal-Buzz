import React, { useState, useRef } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';

const packOptionsMap = {
  'darjeeling-leaf': [
    { label: '250g Pack', price: '₹499', val: '250g' },
    { label: '500g Pack', price: '₹949', val: '500g' },
    { label: '1kg Family Pack', price: '₹1,799', val: '1kg' }
  ],
  'milk-tea-ctc': [
    { label: '500g Pack', price: '₹299', val: '500g' },
    { label: '1kg Pack', price: '₹549', val: '1kg' },
    { label: '2kg Bulk Pack', price: '₹999', val: '2kg' }
  ],
  'green-tea': [
    { label: '200g Pack', price: '₹399', val: '200g' },
    { label: '400g Pack', price: '₹749', val: '400g' },
    { label: '1kg Pack', price: '₹1,699', val: '1kg' }
  ]
};

const TeaCard = ({ tea }) => {
  const cardRef = useRef(null);
  const options = packOptionsMap[tea.id] || [
    { label: tea.weight, price: tea.price, val: tea.weight }
  ];
  const [selectedPack, setSelectedPack] = useState(options[0]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  const whatsappMessage = `Hello The Northbengal Buzz!\nI want to buy *${tea.title}*\n*Selected Weight Pack:* ${selectedPack.label} (${selectedPack.price})\nPlease send payment & delivery details.`;
  const whatsappUrl = SITE_CONFIG.getWhatsAppUrl(whatsappMessage);

  return (
    <div
      ref={cardRef}
      className="tea-card tilt-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`tea-badge-floating ${tea.badgeClass || ''}`}>
        <i className={tea.badgeIcon}></i> {tea.badgeText}
      </div>

      <div className="tea-image-wrap">
        <div className="brand-watermark-overlay">
          <i className="fas fa-leaf text-green"></i> THE NORTHBENGAL BUZZ
        </div>
        <img src={tea.image} alt={tea.title} />
        <div className="price-pill">
          {selectedPack.price} <small>/ {selectedPack.val}</small>
        </div>
      </div>

      <div className="tea-info">
        <div className="tea-category"><i className={tea.categoryIcon}></i> {tea.category}</div>
        <h3>{tea.title}</h3>
        <p>{tea.description}</p>

        {/* Weight Pack Selector */}
        <div className="pack-selector-wrap" style={{ margin: '1.5rem 0' }}>
          <label style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '0.6rem' }}>
            SELECT PACK SIZE:
          </label>
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            {options.map((opt, idx) => (
              <button
                key={idx}
                type="button"
                className={`pill ${selectedPack.label === opt.label ? 'active' : ''}`}
                style={{ fontSize: '1.2rem', padding: '0.6rem 1.4rem' }}
                onClick={() => setSelectedPack(opt)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="tea-highlights">
          {tea.highlights.map((h, i) => (
            <span key={i}><i className="fas fa-check-circle text-green"></i> {h}</span>
          ))}
        </div>

        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp tea-order-btn">
          <i className="fab fa-whatsapp"></i> Order {selectedPack.label} on WhatsApp
        </a>
      </div>
    </div>
  );
};

export default TeaCard;
