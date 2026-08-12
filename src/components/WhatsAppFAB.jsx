import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';

const WhatsAppFAB = () => {
  return (
    <a
      href={SITE_CONFIG.getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      title="Direct WhatsApp Chat with Owner"
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
};

export default WhatsAppFAB;
