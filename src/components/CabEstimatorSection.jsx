import React, { useState } from 'react';
import { useAntiBot } from '../context/AntiBotContext';

const CAB_RATES = {
  darjeeling: { name: 'Darjeeling Queen of Hills', dist: '70 km', dzire: 3200, sumo: 3800, innova: 4800, landrover: 5500 },
  kalimpong: { name: 'Kalimpong Heritage Town', dist: '75 km', dzire: 3000, sumo: 3600, innova: 4600, landrover: 5200 },
  gangtok: { name: 'Gangtok Capital City (Sikkim)', dist: '125 km', dzire: 4200, sumo: 4800, innova: 6200, landrover: 6800 },
  pelling: { name: 'Pelling Kanchenjunga View', dist: '135 km', dzire: 4800, sumo: 5500, innova: 7200, landrover: 7800 },
  mirik: { name: 'Mirik Lake & Tea Valleys', dist: '55 km', dzire: 2600, sumo: 3200, innova: 4200, landrover: 4800 },
  dooars: { name: 'Dooars Wildlife Forest (Lataguri)', dist: '85 km', dzire: 3400, sumo: 4000, innova: 5200, landrover: 5800 },
  jaigaon: { name: 'Jaigaon (Bhutan Border Gate)', dist: '150 km', dzire: 4200, sumo: 5000, innova: 6400, landrover: 7000 },
  sandakphu_base: { name: 'Manebhanjan (Sandakphu Base)', dist: '85 km', dzire: 3600, sumo: 4200, innova: 5400, landrover: 6000 }
};

const CabEstimatorSection = () => {
  const todayStr = new Date().toISOString().split('T')[0];
  const { openVerifiedWhatsApp } = useAntiBot();

  const [pickup, setPickup] = useState('Bagdogra Airport (IXB)');
  const [destination, setDestination] = useState('darjeeling');
  const [vehicle, setVehicle] = useState('innova');
  const [passengers, setPassengers] = useState(4);
  const [travelDate, setTravelDate] = useState('');

  const destData = CAB_RATES[destination] || CAB_RATES.darjeeling;
  const estimatedFare = destData[vehicle] || 4500;

  const handleBooking = (e) => {
    e.preventDefault();
    const vehicleNames = {
      dzire: 'Sedan Dzire / Etios (4 Seats)',
      sumo: 'Bolero / Sumo / Xylo (6-7 Seats)',
      innova: 'Luxury Innova Crysta (7 Seats)',
      landrover: '4x4 Mountain Land Rover / Jeep'
    };

    const msg = `Hi! I want to book a Cab Pickup:
🚕 Pickup Location: ${pickup}
📍 Drop Destination: ${destData.name} (${destData.dist})
🚘 Vehicle Type: ${vehicleNames[vehicle]}
👥 Passengers: ${passengers}
📅 Travel Date: ${travelDate || 'As soon as possible'}
💰 Estimated Fare Quote: ₹${estimatedFare.toLocaleString('en-IN')}`;

    openVerifiedWhatsApp(msg);
  };

  return (
    <section className="cab-estimator-section" id="cabs">
      <div className="section-title">
        <span className="sub-heading"><i className="fas fa-taxi text-yellow"></i> NJP & Bagdogra Cab Service</span>
        <h2 className="heading-title">Himalayan Taxi & Car Rental Fare Calculator</h2>
        <p className="section-desc">Get instant transparent cab quotes from Bagdogra Airport (IXB) or NJP Railway Station with experienced hill drivers.</p>
      </div>

      <div className="cab-calculator-card">
        <form onSubmit={handleBooking} className="cab-form-layout">
          <div className="form-inputs-grid">
            <div className="input-group-box">
              <label><i className="fas fa-plane-arrival text-teal"></i> Select Pickup Point</label>
              <select value={pickup} onChange={(e) => setPickup(e.target.value)}>
                <option value="Bagdogra Airport (IXB)">Bagdogra Airport (IXB)</option>
                <option value="NJP Railway Station (Siliguri)">NJP Railway Station (Siliguri)</option>
                <option value="Siliguri Junction / Town">Siliguri Junction / Bus Stand</option>
                <option value="Darjeeling Town Center">Darjeeling Town Center</option>
                <option value="Gangtok MG Marg (Sikkim)">Gangtok MG Marg (Sikkim)</option>
              </select>
            </div>

            <div className="input-group-box">
              <label><i className="fas fa-map-pin text-red"></i> Drop Destination</label>
              <select value={destination} onChange={(e) => setDestination(e.target.value)}>
                <option value="darjeeling">Darjeeling (Queen of Hills - 70 km)</option>
                <option value="kalimpong">Kalimpong Heritage Town (75 km)</option>
                <option value="gangtok">Gangtok Capital City, Sikkim (125 km)</option>
                <option value="pelling">Pelling & Glass Skywalk, West Sikkim (135 km)</option>
                <option value="mirik">Mirik Lake & Orange Orchards (55 km)</option>
                <option value="dooars">Dooars Wildlife Forest, Lataguri (85 km)</option>
                <option value="jaigaon">Jaigaon, Bhutan Border Gate (150 km)</option>
                <option value="sandakphu_base">Manebhanjan, Sandakphu Trek Base (85 km)</option>
              </select>
            </div>

            <div className="input-group-box">
              <label><i className="fas fa-car text-teal"></i> Choose Vehicle Type</label>
              <select value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
                <option value="dzire">Sedan Dzire / Etios (Up to 4 Passengers)</option>
                <option value="sumo">Bolero / Sumo / Xylo (Up to 7 Passengers)</option>
                <option value="innova">Luxury Innova Crysta (7 Passengers)</option>
                <option value="landrover">4x4 Mountain Jeep / Land Rover</option>
              </select>
            </div>

            <div className="input-group-box">
              <label><i className="fas fa-users text-teal"></i> Passengers & Date</label>
              <div className="split-inputs">
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  placeholder="Passengers"
                  required
                />
                <input
                  type="date"
                  min={todayStr}
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Fare Summary & WhatsApp Booking Action */}
          <div className="cab-fare-result-card">
            <div className="fare-badge">
              <span>Estimated All-Inclusive Fare</span>
              <h3 className="fare-amount">₹{estimatedFare.toLocaleString('en-IN')}</h3>
              <small className="fare-inclusions"><i className="fas fa-check-circle text-teal"></i> Includes Fuel, Toll Taxes, & Hill Driver Charges</small>
            </div>

            <div className="cab-perks-list">
              <span><i className="fas fa-shield-alt text-teal"></i> Verified Himalayan Mountain Drivers</span>
              <span><i className="fas fa-clock text-teal"></i> 24x7 Airport & NJP Pickup Guarantee</span>
              <span><i className="fas fa-luggage-cart text-teal"></i> Luggage Carrier Installed</span>
            </div>

            <button type="submit" className="btn btn-whatsapp btn-block">
              <i className="fab fa-whatsapp"></i> Book Cab Instantly on WhatsApp
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CabEstimatorSection;
