import React from 'react';
import { useAntiBot } from '../context/AntiBotContext';

const WhatsAppFAB = () => {
  const { openVerifiedWhatsApp } = useAntiBot();

  const handleClick = (e) => {
    e.preventDefault();
    openVerifiedWhatsApp('Hello The Northbengal Buzz! I would like to inquire about a tour package or tea products.');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="floating-whatsapp"
      title="Direct WhatsApp Chat with Owner (Anti-Bot Protected)"
      aria-label="Direct WhatsApp Chat with Owner"
    >
      <i className="fab fa-whatsapp"></i>
    </button>
  );
};

export default WhatsAppFAB;
