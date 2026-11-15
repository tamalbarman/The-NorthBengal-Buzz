import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuickSearch from '../components/QuickSearch';
import PackageCard from '../components/PackageCard';
import TeaCard from '../components/TeaCard';
import RatingReviewSection from '../components/RatingReviewSection';
import VisitorGallerySection from '../components/VisitorGallerySection';
import CabEstimatorSection from '../components/CabEstimatorSection';
import PermitGuideSection from '../components/PermitGuideSection';
import AdventureAddonsSection from '../components/AdventureAddonsSection';
import HimalayanRouteMapSection from '../components/HimalayanRouteMapSection';
import HimalayanWeatherAdvisor from '../components/HimalayanWeatherAdvisor';
import CustomTripBudgetCalculator from '../components/CustomTripBudgetCalculator';
import TeaSommelierSection from '../components/TeaSommelierSection';
import HimalayanCulturalGuide from '../components/HimalayanCulturalGuide';
import { useCMS } from '../context/CMSContext';
import { useAntiBot } from '../context/AntiBotContext';
import { teaProductsData } from '../data/teaProductsData';
import { SITE_CONFIG } from '../config/siteConfig';

const HomePage = () => {
  const { packages } = useCMS();
  const { openVerifiedWhatsApp } = useAntiBot();
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    document.title = 'The Northbengal Buzz - Travel & Pure Himalayan Tea Store';
  }, []);

  const filteredPackages = activeFilter === 'all'
    ? packages.slice(0, 6)
    : packages.filter((p) => p.category === activeFilter);

  return (
    <div className="home-page">
      {/* Minimalist Hero */}
      <section
        className="home"
        style={{
          background: "linear-gradient(rgba(15,23,42,0.45), rgba(15,23,42,0.65)), url('/assets/images/home-slide-4.jpg') no-repeat center/cover"
        }}
      >
        <div className="slide">
          <div className="content">
            <span className="badge"><i className="fas fa-compass"></i> Authentic Himalayan Exploration</span>
            <h3>Explore North Bengal & Pure Darjeeling Teas</h3>
            <p>Traverse pristine tea estates, mist-covered valleys, and towering Himalayan heights with curations from local experts.</p>
            <div className="btn-group">
              <Link to="/package" className="btn btn-primary">Discover Packages <i className="fas fa-arrow-right"></i></Link>
              <a href="#cabs" className="btn btn-accent"><i className="fas fa-taxi"></i> Book Cab Rental</a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Search */}
      <QuickSearch />

      {/* Featured Packages */}
      <section className="packages">
        <div className="section-title">
          <span className="sub-heading">Handpicked Journeys</span>
          <h2 className="heading-title">Featured Tour Packages</h2>
          <p className="section-desc">Explore our top-rated Himalayan tours, offbeat village homestays, and wildlife jeep safaris.</p>
        </div>

        <div className="filter-tabs">
          <button className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>
            <i className="fas fa-border-all"></i> All
          </button>
          <button className={`filter-btn ${activeFilter === 'trekking' ? 'active' : ''}`} onClick={() => setActiveFilter('trekking')}>
            <i className="fas fa-hiking"></i> Trekking
          </button>
          <button className={`filter-btn ${activeFilter === 'offbeat' ? 'active' : ''}`} onClick={() => setActiveFilter('offbeat')}>
            <i className="fas fa-tree"></i> Offbeat
          </button>
          <button className={`filter-btn ${activeFilter === 'hillstation' ? 'active' : ''}`} onClick={() => setActiveFilter('hillstation')}>
            <i className="fas fa-mountain"></i> Hill Stations
          </button>
          <button className={`filter-btn ${activeFilter === 'wildlife' ? 'active' : ''}`} onClick={() => setActiveFilter('wildlife')}>
            <i className="fas fa-paw"></i> Wildlife
          </button>
        </div>

        <div className="box-container">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>

      {/* Interactive Stoppage & Destination Route Explorer (No Google Maps API needed) */}
      <HimalayanRouteMapSection />

      {/* Mountain Climate & Smart Seasonal Packing Advisor */}
      <HimalayanWeatherAdvisor />

      {/* Interactive Custom Trip & Homestay Budget Builder */}
      <CustomTripBudgetCalculator />

      {/* NEW SERVICE 1: NJP/Bagdogra Cab & Taxi Fare Estimator */}
      <CabEstimatorSection />

      {/* NEW SERVICE 2: Sikkim & Border Restricted Permit Assistance */}
      <PermitGuideSection />

      {/* NEW SERVICE 3: Outdoor Adventure & Activity Add-ons */}
      <AdventureAddonsSection />

      {/* Authentic Tea Store */}
      <section className="tea-store-section" id="tea-store">
        <div className="section-title">
          <span className="sub-heading"><i className="fas fa-leaf text-green"></i> Directly From Himalayan Gardens</span>
          <h2 className="heading-title">Pure Himalayan Tea Store</h2>
          <p className="section-desc">Buy 100% authentic Darjeeling loose leaf tea & strong CTC milk tea leaves sourced directly from North Bengal estates. Order on WhatsApp!</p>
        </div>

        <div className="tea-grid">
          {teaProductsData.map((tea) => (
            <TeaCard key={tea.id} tea={tea} />
          ))}
        </div>
      </section>

      {/* Tea Sommelier & Interactive Steeping Countdown Timer */}
      <TeaSommelierSection />

      {/* Visitor Photo & Experience Gallery Section */}
      <VisitorGallerySection />

      {/* Guest Ratings & Reviews Moderated Section */}
      <RatingReviewSection />

      {/* Himalayan Cultural Etiquette & Pocket Phrasebook */}
      <HimalayanCulturalGuide />

      {/* Direct WhatsApp Callout */}
      <section className="home-offer">
        <div className="content">
          <h3>Direct WhatsApp Booking & Inquiry</h3>
          <p>Have questions about homestays, custom travel packages, cab rentals, or buying pure Darjeeling tea? Message the owners directly on WhatsApp Business.</p>
          <button
            type="button"
            onClick={() => openVerifiedWhatsApp('Hello The Northbengal Buzz! I have an enquiry regarding travel or tea products.')}
            className="btn btn-whatsapp"
            title="Verify & Chat with Owners on WhatsApp"
          >
            <i className="fab fa-whatsapp"></i> Chat with Owners on WhatsApp
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
