export const SITE_CONFIG = {
  name: 'The Northbengal Buzz',
  tagline: 'Travel & Pure Himalayan Tea Store',
  // Phone numbers are hidden from public scrapers per security policy
  phone: 'WhatsApp Support (Anti-Bot Protected)',
  displayPhone: '+91 74782-••••• (Click to Verify)',
  email: 'thenorthbengalbuzz@gmail.com', // Publicly available email
  address: 'Siliguri, West Bengal - 734001',
  social: {
    facebook: 'https://www.facebook.com/thenorthbengalbuzz',
    twitter: 'https://twitter.com/northbengalbuzz',
    instagram: 'https://www.instagram.com/thenorthbengalbuzz',
    youtube: 'https://www.youtube.com/thenorthbengalbuzz'
  },
  // Obfuscated helper for direct fallback if ever needed
  getWhatsAppUrl: (message = 'Hello The Northbengal Buzz! I would like to inquire about a tour package or tea products.') => {
    const p = ['91', '74782', '86972'].join('');
    return `https://wa.me/${p}?text=${encodeURIComponent(message)}`;
  }
};
