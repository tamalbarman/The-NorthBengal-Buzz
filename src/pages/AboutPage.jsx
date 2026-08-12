import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';

const testimonials = [
  {
    name: 'Rohan Sharma',
    location: 'Kolkata, WB',
    initials: 'RS',
    avatarBg: 'linear-gradient(135deg, #00a896, #028090)',
    rating: 5,
    tag: 'Sandakphu Trek',
    review: 'Booking our Sandakphu trek directly via WhatsApp with The Northbengal Buzz was super easy! The owner was extremely polite and arranged everything perfectly.'
  },
  {
    name: 'Ananya Roy',
    location: 'Siliguri, WB',
    initials: 'AR',
    avatarBg: 'linear-gradient(135deg, #f5a623, #d9822b)',
    rating: 5,
    tag: 'Tinchuley Stay & Tea',
    review: 'Tinchuley and Takdah were breathtaking. Also ordered 500g of Original Darjeeling Loose Leaf Tea on WhatsApp — pure aroma and fast delivery!'
  },
  {
    name: 'Vikram Patel',
    location: 'Ahmedabad, Gujarat',
    initials: 'VP',
    avatarBg: 'linear-gradient(135deg, #0f172a, #1e293b)',
    rating: 5,
    tag: 'Dooars Safari',
    review: 'Our Dooars jungle safari was smooth and memorable. Saw wild elephants and rhinos up close! Direct owner response on WhatsApp made booking effortless.'
  },
  {
    name: 'Meera Chawla',
    location: 'Delhi NCR',
    initials: 'MC',
    avatarBg: 'linear-gradient(135deg, #10b981, #059669)',
    rating: 5,
    tag: 'Darjeeling & Mirik',
    review: 'The Tiger Hill sunrise and tea garden stay exceeded all expectations. Exceptional hospitality and genuine local guidance throughout our family trip!'
  }
];

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Page Header Banner */}
      <div
        className="heading"
        style={{
          background: "linear-gradient(135deg, rgba(15,23,42,0.7) 0%, rgba(2,128,144,0.6) 100%), url('/assets/images/home-slide-4.jpg') no-repeat center/cover"
        }}
      >
        <h1>about us</h1>
      </div>

      {/* About Section */}
      <section className="about">
        <div className="about-grid">
          <div className="content-col">
            <div className="section-title text-left">
              <span className="sub-heading"><i className="fas fa-compass text-teal"></i> Why Choose Us</span>
              <h2 className="heading-title">Your Dedicated Companion in North Bengal Exploration</h2>
            </div>
            <p className="about-desc">
              At <strong>The Northbengal Buzz</strong>, we curate authentic Himalayan travel experiences. From handpicked local homestays and mountain treks to 100% pure organic Darjeeling tea delivered directly from Himalayan gardens to your doorstep.
            </p>

            <div className="features-grid">
              <div className="feature-card tilt-card">
                <div className="feature-icon"><i className="fas fa-award"></i></div>
                <h4>Local Expertise</h4>
                <p>Native storytellers and verified trek masters living in North Bengal.</p>
              </div>

              <div className="feature-card tilt-card">
                <div className="feature-icon"><i className="fas fa-map-marked-alt"></i></div>
                <h4>Complete Coverage</h4>
                <p>Exploration across hidden mountain roads, tea estates, and wildlife corridors.</p>
              </div>

              <div className="feature-card tilt-card">
                <div className="feature-icon"><i className="fas fa-user-shield"></i></div>
                <h4>Trusted Guidance</h4>
                <p>Verified homestay reviews, transparent pricing, and zero hidden charges.</p>
              </div>

              <div className="feature-card tilt-card">
                <div className="feature-icon"><i className="fas fa-leaf text-green"></i></div>
                <h4>Authentic Himalayan Teas</h4>
                <p>100% pure organic loose leaf Darjeeling & strong CTC milk tea leaves.</p>
              </div>
            </div>

            <div className="btn-group" style={{ marginTop: '3.5rem' }}>
              <a
                href={SITE_CONFIG.getWhatsAppUrl('Hello The Northbengal Buzz! I want to chat with the owners.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp-large"
              >
                <i className="fab fa-whatsapp"></i> Chat with Owners on WhatsApp
              </a>
            </div>
          </div>

          <div className="image-col">
            <div className="about-visual-card tilt-card">
              <img src="/assets/images/about-img1.png" alt="North Bengal Landscapes & Tea Gardens" />
              <div className="floating-verified-badge">
                <i className="fas fa-shield-check"></i> 100% Verified Local
              </div>
              <div className="floating-stat-badge">
                <i className="fas fa-heart text-red"></i>
                <div>
                  <strong>12,000+</strong>
                  <span>Happy Travelers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews" style={{ background: '#f1f5f9' }}>
        <div className="section-title">
          <span className="sub-heading"><i className="fas fa-star text-yellow"></i> Verified Guest Feedback</span>
          <h2 className="heading-title">What Our Guests Say</h2>
          <p className="section-desc">Read real reviews from travelers who booked tour packages and purchased pure Darjeeling tea with us.</p>
        </div>

        <div className="box-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="testimonial-card tilt-card"
              style={{
                background: 'var(--white)',
                padding: '3rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              {/* Header with Avatar Initials & Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: item.avatarBg,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem',
                    fontWeight: '800',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                >
                  {item.initials}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.8rem', color: 'var(--dark-navy)', fontWeight: '700', lineHeight: '1.2' }}>{item.name}</h3>
                  <span style={{ fontSize: '1.3rem', color: 'var(--text-muted)' }}>{item.location}</span>
                </div>
              </div>

              {/* Star Rating & Trip Tag */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ color: 'var(--accent-gold)', fontSize: '1.4rem' }}>
                  {[...Array(item.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star" style={{ marginRight: '2px' }}></i>
                  ))}
                </div>
                <span style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary-teal)', background: 'rgba(0,168,150,0.1)', padding: '0.4rem 1rem', borderRadius: '20px' }}>
                  {item.tag}
                </span>
              </div>

              {/* Review Text */}
              <p style={{ fontSize: '1.4rem', color: 'var(--dark-navy)', lineHeight: '1.7', flex: 1, marginBottom: '2rem', fontStyle: 'italic' }}>
                "{item.review}"
              </p>

              {/* Footer Verification Badge */}
              <div style={{ paddingTop: '1.5rem', borderTop: '1px dashed var(--border-light)', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '1.2rem', color: 'var(--green)', fontWeight: '700' }}>
                <i className="fas fa-circle-check"></i> Verified WhatsApp Booking
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
