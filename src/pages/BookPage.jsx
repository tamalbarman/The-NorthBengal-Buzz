import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';
import { useAntiBot } from '../context/AntiBotContext';

const BookPage = () => {
  const { packages } = useCMS();
  const { openVerifiedWhatsApp } = useAntiBot();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const todayStr = new Date().toISOString().split('T')[0];

  const packagePricesMap = packages.reduce((acc, p) => {
    acc[p.id] = p;
    return acc;
  }, {});

  const initialPkgId = searchParams.get('package') || (packages[0] ? packages[0].id : 'sandakphu');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    destination: initialPkgId,
    guests: 2,
    arrival: '',
    leaving: ''
  });

  const [dateError, setDateError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDateError('');
    if (name === 'phone') setPhoneError('');

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      if (updated.arrival && updated.leaving) {
        if (new Date(updated.leaving) < new Date(updated.arrival)) {
          setDateError('Departure date cannot be before arrival date.');
        }
      }

      return updated;
    });
  };

  const validatePhone = (phoneStr) => {
    const cleanPhone = phoneStr.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      return 'Please enter a valid 10-digit mobile number.';
    }
    return '';
  };

  const selectedPkg = packagePricesMap[formData.destination] || packages[0] || {};
  const basePrice = selectedPkg.numericPrice || 14999;
  const numGuests = Math.max(1, parseInt(formData.guests, 10) || 1);
  const totalCost = basePrice * numGuests;

  const calculateNights = () => {
    if (!formData.arrival || !formData.leaving) return 'Flexible';
    const arr = new Date(formData.arrival);
    const lev = new Date(formData.leaving);
    const diffTime = lev - arr;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays} Nights` : 'Flexible';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pErr = validatePhone(formData.phone);
    if (pErr) {
      setPhoneError(pErr);
      return;
    }
    if (formData.arrival && formData.leaving && new Date(formData.leaving) < new Date(formData.arrival)) {
      setDateError('Departure date cannot be before arrival date.');
      return;
    }
    setModalOpen(true);
  };

  const handleWhatsAppDirect = () => {
    const msg = `Hello The Northbengal Buzz!\nI want to book a trip with you.\n\n*Name:* ${formData.name || 'Guest'}\n*Phone:* ${formData.phone || 'N/A'}\n*Destination:* ${selectedPkg.title || 'Tour Package'}\n*Guests:* ${numGuests}\n*Dates:* ${formData.arrival || 'TBD'} to ${formData.leaving || 'TBD'}\n*Est. Total:* ₹${totalCost.toLocaleString('en-IN')}`;
    openVerifiedWhatsApp(msg);
  };

  return (
    <div className="book-page">
      {/* Page Header Banner */}
      <div
        className="heading"
        style={{
          background: "linear-gradient(135deg, rgba(15,23,42,0.65) 0%, rgba(2,128,144,0.55) 100%), url('/assets/images/home-slide-4.jpg') no-repeat center/cover"
        }}
      >
        <h1>book now</h1>
      </div>

      {/* Booking Section */}
      <section className="booking">
        <div className="section-title">
          <span className="sub-heading">Reserve Your Experience</span>
          <h2 className="heading-title">Plan & Book Your Trip</h2>
        </div>

        <div className="booking-layout">
          {/* Form Container */}
          <div className="form-card tilt-card">
            <form className="book-form" onSubmit={handleSubmit}>
              <div className="flex">
                <div className="inputBox">
                  <span><i className="fas fa-user"></i> Full Name :</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="inputBox">
                  <span><i className="fas fa-envelope"></i> Email Address :</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="enter your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="inputBox">
                  <span><i className="fas fa-phone"></i> Phone / WhatsApp Number :</span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="enter 10-digit mobile number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  {phoneError && (
                    <span style={{ color: 'var(--red)', fontSize: '1.2rem', marginTop: '0.4rem', display: 'block' }}>
                      <i className="fas fa-circle-exclamation"></i> {phoneError}
                    </span>
                  )}
                </div>

                <div className="inputBox">
                  <span><i className="fas fa-map-pin"></i> Your Address :</span>
                  <input
                    type="text"
                    name="address"
                    placeholder="enter your current city / address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="inputBox">
                  <span><i className="fas fa-compass"></i> Select Destination :</span>
                  <select name="destination" value={formData.destination} onChange={handleInputChange} required>
                    {packages.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title} (₹{(p.numericPrice || 10000).toLocaleString('en-IN')} / person)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="inputBox">
                  <span><i className="fas fa-users"></i> Number of Travelers :</span>
                  <input
                    type="number"
                    name="guests"
                    min="1"
                    max="50"
                    value={formData.guests}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="inputBox">
                  <span><i className="fas fa-calendar-alt"></i> Arrival Date :</span>
                  <input
                    type="date"
                    name="arrival"
                    min={todayStr}
                    value={formData.arrival}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="inputBox">
                  <span><i className="fas fa-calendar-check"></i> Departure Date :</span>
                  <input
                    type="date"
                    name="leaving"
                    min={formData.arrival || todayStr}
                    value={formData.leaving}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {dateError && (
                <div style={{ color: 'var(--red)', fontSize: '1.4rem', fontWeight: '600', marginTop: '1.5rem' }}>
                  <i className="fas fa-circle-exclamation"></i> {dateError}
                </div>
              )}

              <div className="form-action-row">
                <button type="submit" className="btn btn-primary btn-submit-booking">
                  Confirm & Submit Booking <i className="fas fa-paper-plane"></i>
                </button>
                <button type="button" className="btn btn-whatsapp btn-whatsapp-direct" onClick={handleWhatsAppDirect}>
                  <i className="fab fa-whatsapp"></i> Book via WhatsApp Instead
                </button>
              </div>
            </form>
          </div>

          {/* Live Cost Calculator & Summary Box */}
          <aside className="booking-summary-card tilt-card">
            <h3><i className="fas fa-calculator"></i> Trip Estimation Summary</h3>
            <div className="summary-divider"></div>

            {/* Selected Package Visual Preview Thumbnail */}
            {selectedPkg && selectedPkg.title && (
              <div className="selected-pkg-preview" style={{ marginBottom: '2rem' }}>
                <div style={{ position: 'relative', height: '170px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', marginBottom: '1.2rem', boxShadow: 'var(--shadow-sm)' }}>
                  <img src={selectedPkg.image} alt={selectedPkg.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(6px)', color: '#ffffff', fontSize: '1.1rem', fontWeight: '700', padding: '0.4rem 1rem', borderRadius: '15px' }}>
                    <i className={selectedPkg.tagIcon || 'fas fa-tag'}></i> {selectedPkg.tag || 'Package'}
                  </span>
                  <span style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'var(--accent-gold)', color: '#ffffff', fontSize: '1.3rem', fontWeight: '800', padding: '0.4rem 1.2rem', borderRadius: '20px' }}>
                    {selectedPkg.price}
                  </span>
                </div>
                <h4 style={{ fontSize: '1.8rem', color: '#ffffff', fontWeight: '800', lineHeight: '1.3', marginBottom: '0.6rem' }}>{selectedPkg.title}</h4>
                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '1.3rem', color: 'rgba(255,255,255,0.7)' }}>
                  <span><i className="far fa-clock"></i> {selectedPkg.duration}</span>
                  <span><i className="fas fa-star text-yellow"></i> {selectedPkg.rating}</span>
                </div>
              </div>
            )}

            <div className="summary-divider"></div>

            <div className="summary-row">
              <span>Selected Package:</span>
              <strong>{selectedPkg.title}</strong>
            </div>

            <div className="summary-row">
              <span>Base Price / Person:</span>
              <span>₹{basePrice.toLocaleString('en-IN')}</span>
            </div>

            <div className="summary-row">
              <span>Travelers:</span>
              <span>{numGuests} Guests</span>
            </div>

            <div className="summary-row">
              <span>Est. Duration:</span>
              <span>{calculateNights()}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Estimated Total:</span>
              <h2>₹{totalCost.toLocaleString('en-IN')}</h2>
            </div>

            <div className="summary-perks">
              <p><i className="fab fa-whatsapp text-green"></i> Instant WhatsApp Confirmation with Owner</p>
              <p><i className="fas fa-shield-halved text-blue"></i> Free Cancellation up to 72 hours</p>
              <p><i className="fas fa-tags text-orange"></i> No Hidden Taxes or Booking Fees</p>
            </div>
          </aside>
        </div>
      </section>

      {/* Modal Notification Overlay */}
      {modalOpen && (
        <div className="modal-overlay active" style={{ display: 'flex' }}>
          <div className="modal-card">
            <div className="modal-icon text-green"><i className="fas fa-circle-check"></i></div>
            <h3>Booking Request Received!</h3>
            <p>Thank you for choosing <strong>The Northbengal Buzz</strong>. Our travel specialist will contact you on your registered WhatsApp / Phone number within 2 hours to confirm itinerary details and logistics.</p>
            <div className="modal-btn-group">
              <button className="btn btn-primary" onClick={() => { setModalOpen(false); navigate('/'); }}>
                Done & Back to Home
              </button>
              <button className="btn btn-whatsapp" onClick={handleWhatsAppDirect}>
                <i className="fab fa-whatsapp"></i> Chat on WhatsApp Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookPage;
