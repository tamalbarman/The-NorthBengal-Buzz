import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';

const ADVENTURES = [
  {
    id: 'rafting',
    title: 'Teesta White Water Rafting',
    location: 'Melli & Chitrey (Kalimpong - Sikkim Border)',
    price: '₹1,200 / person',
    numericPrice: 1200,
    duration: '1.5 Hours (7 km / 12 km)',
    difficulty: 'Moderate (Grade 2 - 4 Rapids)',
    image: '/assets/images/img-15.jpg',
    icon: 'fas fa-water',
    description: 'Thrill of turbulent foam rapids along emerald Teesta river with certified safety raft guides and gear.'
  },
  {
    id: 'paragliding',
    title: 'Kalimpong Deolo Paragliding',
    location: 'Deolo Hill (Kalimpong - 5,500 ft)',
    price: '₹3,500 / flight',
    numericPrice: 3500,
    duration: '15 - 25 Mins Aerial Flight',
    difficulty: 'Easy (Tandem Pilot Included)',
    image: '/assets/images/img-16.jpg',
    icon: 'fas fa-wind',
    description: 'Soar high like a Himalayan eagle over misty alpine valleys, orchid nurseries, and Kanchenjunga peaks.'
  },
  {
    id: 'toytrain',
    title: 'Darjeeling Toy Train Heritage Ride',
    location: 'Darjeeling to Ghoom Monastery (Loop)',
    price: '₹1,500 / ticket',
    numericPrice: 1500,
    duration: '2 Hours (Steam Locomotive)',
    difficulty: 'Family Heritage Ride',
    image: '/assets/images/img-18.jpg',
    icon: 'fas fa-train',
    description: 'Ride UNESCO World Heritage steam locomotive through famous Batasia Loop over spectacular mountain cliffs.'
  },
  {
    id: 'landrover',
    title: 'Sandakphu 4x4 Land Rover Safari',
    location: 'Manebhanjan to Sandakphu & Phalut (11,929 ft)',
    price: '₹6,500 / jeep',
    numericPrice: 6500,
    duration: 'Full Day High-Altitude Drive',
    difficulty: 'Extreme Off-Road Trail',
    image: '/assets/images/img-13.jpg',
    icon: 'fas fa-truck-monster',
    description: 'Ride vintage British 4x4 Land Rovers along Singalila ridge line offering views of 4 of world’s 5 highest peaks.'
  }
];

const AdventureAddonsSection = () => {
  const handleInquiry = (adventure) => {
    const msg = `Hi! I want to inquire & book the adventure activity:
🏔️ Activity: ${adventure.title}
📍 Location: ${adventure.location}
💰 Rate: ${adventure.price}
⏱️ Duration: ${adventure.duration}
Please check availability for my trip dates!`;

    const whatsappUrl = SITE_CONFIG.getWhatsAppUrl(msg);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="adventure-addons-section" id="activities">
      <div className="section-title">
        <span className="sub-heading"><i className="fas fa-hiking text-green"></i> Himalayan Thrills & Activities</span>
        <h2 className="heading-title">Outdoor Adventure & Heritage Add-Ons</h2>
        <p className="section-desc">Enhance your Himalayan journey with river rafting, paragliding, UNESCO steam train rides, or Land Rover safaris.</p>
      </div>

      <div className="adventure-grid">
        {ADVENTURES.map((item) => (
          <div className="adventure-card" key={item.id}>
            <div className="adv-img-box">
              <img src={item.image} alt={item.title} />
              <span className="adv-badge"><i className={item.icon}></i> {item.difficulty}</span>
              <span className="adv-price">{item.price}</span>
            </div>

            <div className="adv-content">
              <h3>{item.title}</h3>
              <span className="adv-loc"><i className="fas fa-map-marker-alt text-teal"></i> {item.location}</span>
              <p>{item.description}</p>
              
              <div className="adv-meta">
                <span><i className="far fa-clock"></i> {item.duration}</span>
                <span><i className="fas fa-shield-alt text-green"></i> Safety Gear Included</span>
              </div>

              <button onClick={() => handleInquiry(item)} className="btn btn-accent btn-block">
                <i className="fab fa-whatsapp"></i> Inquire & Reserve Activity
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdventureAddonsSection;
