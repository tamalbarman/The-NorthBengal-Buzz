import React, { useState } from 'react';
import { useAntiBot } from '../context/AntiBotContext';

const DESTINATION_RATES = {
  darjeeling: {
    id: 'darjeeling',
    name: 'Darjeeling Queen of Hills',
    cabBase: 3400,
    homestayRate: 1800,
    luxuryRate: 4800,
    tag: 'Classic Hill Station'
  },
  kalimpong: {
    id: 'kalimpong',
    name: 'Kalimpong & Lava Pine Trail',
    cabBase: 3200,
    homestayRate: 1600,
    luxuryRate: 4200,
    tag: 'Peaceful Eco Stay'
  },
  gangtok: {
    id: 'gangtok',
    name: 'Gangtok & East Sikkim',
    cabBase: 4400,
    homestayRate: 2200,
    luxuryRate: 5200,
    tag: 'Sikkim Capital'
  },
  sandakphu: {
    id: 'sandakphu',
    name: 'Sandakphu Singalila Trek / 4x4',
    cabBase: 5800,
    homestayRate: 2000,
    luxuryRate: 3800,
    tag: 'Highest Altitude Ridge'
  },
  dooars: {
    id: 'dooars',
    name: 'Dooars Wildlife & River Camp',
    cabBase: 3600,
    homestayRate: 1800,
    luxuryRate: 4500,
    tag: 'Jungle Safari & Plains'
  }
};

const EXPERIENCES = [
  { id: 'toytrain', label: 'UNESCO Toy Train Joyride (Steam Engine)', pricePerPerson: 1500, icon: 'fas fa-train' },
  { id: 'rafting', label: 'Teesta White Water River Rafting', pricePerPerson: 1200, icon: 'fas fa-water' },
  { id: 'sikkim_permit', label: 'Sikkim Nathula & Border Permit Token', pricePerPerson: 450, icon: 'fas fa-id-card' },
  { id: 'safari', label: 'Gorumara Open Gypsy Jungle Safari (per jeep)', fixedPrice: 2800, icon: 'fas fa-paw' }
];

const CustomTripBudgetCalculator = () => {
  const [selectedDest, setSelectedDest] = useState('darjeeling');
  const [travelers, setTravelers] = useState(4);
  const [nights, setNights] = useState(3);
  const [stayTier, setStayTier] = useState('homestay'); // 'homestay' or 'luxury'
  const [selectedExperiences, setSelectedExperiences] = useState(['toytrain']);

  const { openVerifiedWhatsApp } = useAntiBot();

  const dest = DESTINATION_RATES[selectedDest] || DESTINATION_RATES.darjeeling;

  // Calculation logic
  const roomsNeeded = Math.ceil(travelers / 2);
  const roomRatePerNight = stayTier === 'homestay' ? dest.homestayRate : dest.luxuryRate;
  const totalStayCost = roomsNeeded * roomRatePerNight * nights;

  // Cab rentals: 1 cab per 4-6 people
  const cabsNeeded = Math.ceil(travelers / 6);
  // Cab cost: base pickup/drop + daily local sightseeing
  const totalCabCost = cabsNeeded * (dest.cabBase * 2 + (nights - 1) * 2200);

  // Activities cost
  let totalExperienceCost = 0;
  selectedExperiences.forEach((expId) => {
    const exp = EXPERIENCES.find((e) => e.id === expId);
    if (exp) {
      if (exp.pricePerPerson) {
        totalExperienceCost += exp.pricePerPerson * travelers;
      } else if (exp.fixedPrice) {
        const jeepsNeeded = Math.ceil(travelers / 6);
        totalExperienceCost += exp.fixedPrice * jeepsNeeded;
      }
    }
  });

  const grandTotal = totalStayCost + totalCabCost + totalExperienceCost;
  const perPersonCost = Math.round(grandTotal / (travelers || 1));

  const toggleExperience = (id) => {
    setSelectedExperiences((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleWhatsAppQuote = () => {
    const expNames = selectedExperiences
      .map((id) => EXPERIENCES.find((e) => e.id === id)?.label)
      .filter(Boolean)
      .join(', ');

    const msg = `Hello The Northbengal Buzz!\nI configured a Custom Himalayan Trip Estimate on your website:
📍 Destination: ${dest.name}
👥 Travelers: ${travelers} Persons (${roomsNeeded} Rooms)
🌙 Duration: ${nights} Nights / ${nights + 1} Days
🏡 Stay Type: ${stayTier === 'homestay' ? 'Authentic Mountain Homestay' : 'Heritage Colonial Estate'}
🚖 Transport: Dedicated Hill Cab Included
🎒 Activities Chosen: ${expNames || 'None'}
💰 Estimated Budget: ₹${grandTotal.toLocaleString('en-IN')} total (~₹${perPersonCost.toLocaleString('en-IN')}/person)

Please check homestay availability and share finalized itinerary!`;

    openVerifiedWhatsApp(msg);
  };

  return (
    <section className="trip-planner-section" id="trip-planner">
      <div className="section-title">
        <span className="sub-heading">
          <i className="fas fa-calculator text-teal"></i> Transparent Group Estimator
        </span>
        <h2 className="heading-title">Custom Trip & Homestay Budget Builder</h2>
        <p className="section-desc">
          Planning a family holiday, romantic getaway, or friend group expedition? Select your route, stay style, and add-on thrills to see instant transparent costs.
        </p>
      </div>

      <div className="planner-workspace-card">
        {/* Left Column: Form Controls */}
        <div className="planner-controls-col">
          {/* Step 1: Destination Selection */}
          <div className="planner-step-box">
            <label className="step-label">
              <span className="step-num">1</span> Select Mountain Destination
            </label>
            <div className="dest-pills-grid">
              {Object.entries(DESTINATION_RATES).map(([key, item]) => (
                <button
                  key={key}
                  type="button"
                  className={`dest-select-btn ${key === selectedDest ? 'active' : ''}`}
                  onClick={() => setSelectedDest(key)}
                >
                  <strong>{item.name}</strong>
                  <small>{item.tag}</small>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Trip Parameters Grid */}
          <div className="planner-step-box">
            <label className="step-label">
              <span className="step-num">2</span> Duration & Group Size
            </label>
            <div className="param-sliders-grid">
              <div className="param-field">
                <div className="param-title-row">
                  <span>Number of Travelers:</span>
                  <strong>{travelers} Guests</strong>
                </div>
                <input
                  type="range"
                  min="1"
                  max="16"
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="custom-range-slider"
                />
                <span className="param-hint">
                  {roomsNeeded} double-sharing rooms ({cabsNeeded} vehicle)
                </span>
              </div>

              <div className="param-field">
                <div className="param-title-row">
                  <span>Trip Duration:</span>
                  <strong>{nights} Nights ({nights + 1} Days)</strong>
                </div>
                <input
                  type="range"
                  min="2"
                  max="8"
                  value={nights}
                  onChange={(e) => setNights(Number(e.target.value))}
                  className="custom-range-slider"
                />
                <span className="param-hint">Optimal pace for North Bengal exploration</span>
              </div>
            </div>
          </div>

          {/* Step 3: Stay Tier */}
          <div className="planner-step-box">
            <label className="step-label">
              <span className="step-num">3</span> Accommodation Style
            </label>
            <div className="stay-tiers-row">
              <label
                className={`stay-tier-card ${stayTier === 'homestay' ? 'active' : ''}`}
                onClick={() => setStayTier('homestay')}
              >
                <input
                  type="radio"
                  name="stayTier"
                  checked={stayTier === 'homestay'}
                  onChange={() => setStayTier('homestay')}
                />
                <div>
                  <span className="tier-title"><i className="fas fa-home text-green"></i> Authentic Homestay</span>
                  <p>Warm local host family, organic garden-fresh meals, wooden hillside cottages.</p>
                  <strong>₹{dest.homestayRate.toLocaleString('en-IN')} / room night</strong>
                </div>
              </label>

              <label
                className={`stay-tier-card ${stayTier === 'luxury' ? 'active' : ''}`}
                onClick={() => setStayTier('luxury')}
              >
                <input
                  type="radio"
                  name="stayTier"
                  checked={stayTier === 'luxury'}
                  onChange={() => setStayTier('luxury')}
                />
                <div>
                  <span className="tier-title"><i className="fas fa-hotel text-gold"></i> Heritage & Tea Estate</span>
                  <p>Colonial architecture, panoramic Kanchenjunga balconies, premium amenities.</p>
                  <strong>₹{dest.luxuryRate.toLocaleString('en-IN')} / room night</strong>
                </div>
              </label>
            </div>
          </div>

          {/* Step 4: Experiences & Add-ons */}
          <div className="planner-step-box">
            <label className="step-label">
              <span className="step-num">4</span> Add-On Mountain Experiences
            </label>
            <div className="experiences-check-grid">
              {EXPERIENCES.map((exp) => {
                const isChecked = selectedExperiences.includes(exp.id);
                return (
                  <label
                    key={exp.id}
                    className={`exp-checkbox-pill ${isChecked ? 'active' : ''}`}
                    onClick={() => toggleExperience(exp.id)}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                    />
                    <i className={exp.icon}></i>
                    <span>{exp.label}</span>
                    <strong className="exp-price-badge">
                      +{exp.pricePerPerson ? `₹${exp.pricePerPerson}/person` : `₹${exp.fixedPrice}/jeep`}
                    </strong>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Live Price Card & WhatsApp Inquire */}
        <div className="planner-summary-col">
          <div className="planner-bill-card">
            <div className="bill-header">
              <span className="bill-tag"><i className="fas fa-shield-alt text-teal"></i> Transparent Quote</span>
              <h3>Estimated Trip Budget</h3>
              <p>{dest.name} • {nights}N / {nights + 1}D</p>
            </div>

            <div className="bill-breakdown-list">
              <div className="bill-row">
                <span>
                  <i className="fas fa-bed text-teal"></i> {roomsNeeded} Rooms × {nights} Nights
                </span>
                <strong>₹{totalStayCost.toLocaleString('en-IN')}</strong>
              </div>

              <div className="bill-row">
                <span>
                  <i className="fas fa-taxi text-yellow"></i> Hill Cab ({cabsNeeded} vehicle + Sightseeing)
                </span>
                <strong>₹{totalCabCost.toLocaleString('en-IN')}</strong>
              </div>

              {totalExperienceCost > 0 && (
                <div className="bill-row">
                  <span>
                    <i className="fas fa-ticket text-green"></i> Activity Passes & Permits
                  </span>
                  <strong>₹{totalExperienceCost.toLocaleString('en-IN')}</strong>
                </div>
              )}

              <div className="bill-row included">
                <span>
                  <i className="fas fa-utensils text-green"></i> Daily Breakfast & Organic Tea
                </span>
                <strong className="text-green">INCLUDED</strong>
              </div>
            </div>

            <div className="bill-total-highlight">
              <div className="total-top">
                <span>Estimated Total for {travelers} Guests:</span>
                <h2>₹{grandTotal.toLocaleString('en-IN')}</h2>
              </div>
              <div className="per-person-tag">
                <span>Cost Per Person:</span>
                <strong>₹{perPersonCost.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div className="bill-actions">
              <button
                type="button"
                className="btn btn-primary btn-quote-whatsapp"
                onClick={handleWhatsAppQuote}
                title="Send customized plan to WhatsApp"
              >
                <i className="fab fa-whatsapp"></i> Book This Plan on WhatsApp
              </button>
              <small className="quote-disclaimer">
                <i className="fas fa-info-circle"></i> Exact rates may vary slightly during peak Durga Puja & Christmas weeks.
              </small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomTripBudgetCalculator;
