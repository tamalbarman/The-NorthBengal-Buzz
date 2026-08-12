export const SITE_CONFIG = {
  name: 'The Northbengal Buzz',
  tagline: 'Travel & Pure Himalayan Tea Store',
  phone: '+91-74782-86972',
  rawPhone: '917478286972',
  tollFree: '1800-333-333',
  email: 'thenorthbengalbuzz@gmail.com',
  address: 'Siliguri, West Bengal - 734001',
  social: {
    facebook: 'https://www.facebook.com/thenorthbengalbuzz',
    twitter: 'https://twitter.com/northbengalbuzz',
    instagram: 'https://www.instagram.com/thenorthbengalbuzz',
    youtube: 'https://www.youtube.com/thenorthbengalbuzz'
  },
  getWhatsAppUrl: (message = 'Hello The Northbengal Buzz! I would like to inquire about a tour package or tea products.') => {
    return `https://wa.me/917478286972?text=${encodeURIComponent(message)}`;
  }
};
