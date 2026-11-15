import React, { useState, useEffect } from 'react';
import { useAntiBot } from '../context/AntiBotContext';

const TEA_GUIDES = [
  {
    id: 'first-flush',
    name: 'Darjeeling First Flush (Spring Picked)',
    season: 'Harvested Mid-March to April',
    idealTemp: '85°C (185°F)',
    steepSeconds: 180, // 3 mins
    leafRatio: '2.5g (1 heaping tsp) per 200ml',
    aromaNotes: ['Spring Meadow Blossom', 'Crisp White Peach', 'Delicate Citrus Zest'],
    caffeineLevel: 'Medium-High',
    withMilk: 'Strictly Pure Black (No Milk / Sugar)',
    description: 'The "Champagne of Teas" — harvested as the spring sunshine strikes Himalayan slopes after winter slumber. Pale amber liquor with an invigorating floral perfume.',
    colorTag: '#00a896'
  },
  {
    id: 'second-flush',
    name: 'Darjeeling Second Flush Muscatel',
    season: 'Harvested May to June',
    idealTemp: '90°C (195°F)',
    steepSeconds: 240, // 4 mins
    leafRatio: '2.5g per 200ml cup',
    aromaNotes: ['Muscatel Grape', 'Toasted Walnut', 'Warm Honey Finish'],
    caffeineLevel: 'Medium',
    withMilk: 'Best Pure Black (Splash of Milk optional)',
    description: 'Prized for its unmistakable full-bodied muscatel character created by mountain sun and tiny leafhopper bugs nibbling tea tips before harvest.',
    colorTag: '#f5a623'
  },
  {
    id: 'ctc-milk',
    name: 'Pure Himalayan CTC Royal Milk Tea',
    season: 'High-Elevation Dooars & Terai',
    idealTemp: '100°C (Rolling Boil)',
    steepSeconds: 300, // 5 mins
    leafRatio: '1 tsp per cup boiled with milk',
    aromaNotes: ['Rich Malty Body', 'Cardamom & Ginger friendly', 'Deep Golden Liquor'],
    caffeineLevel: 'High Kick',
    withMilk: 'Brewed directly with Whole Milk',
    description: 'Granular orthodox cut tea leaves that produce a rich, dark, robust cup designed for authentic North Bengal morning chai with ginger.',
    colorTag: '#b45309'
  },
  {
    id: 'green-tea',
    name: 'Organic Himalayan High-Grown Green Tea',
    season: 'Whole Leaf Spring Gardens',
    idealTemp: '80°C (175°F)',
    steepSeconds: 150, // 2.5 mins
    leafRatio: '2g per 200ml cup',
    aromaNotes: ['Sweet Clover', 'Toasted Pine Nuts', 'Zero Bitterness Grassy Finish'],
    caffeineLevel: 'Low-Medium (High EGCG)',
    withMilk: 'Strictly Pure (Never with Milk)',
    description: 'Non-fermented, hand-roasted green tea packed with natural Himalayan antioxidants. Refreshing, smooth, and naturally soothing.',
    colorTag: '#10b981'
  }
];

const TeaSommelierSection = () => {
  const [selectedTeaId, setSelectedTeaId] = useState('first-flush');
  const [timeLeft, setTimeLeft] = useState(180);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerComplete, setTimerComplete] = useState(false);

  const { openVerifiedWhatsApp } = useAntiBot();

  const currentTea = TEA_GUIDES.find((t) => t.id === selectedTeaId) || TEA_GUIDES[0];

  // Handle tea switch
  const handleSelectTea = (id) => {
    const tea = TEA_GUIDES.find((t) => t.id === id);
    setSelectedTeaId(id);
    setTimeLeft(tea ? tea.steepSeconds : 180);
    setTimerRunning(false);
    setTimerComplete(false);
  };

  // Timer countdown effect
  useEffect(() => {
    let interval = null;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerRunning) {
      setTimerRunning(false);
      setTimerComplete(true);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  const toggleTimer = () => {
    if (timeLeft === 0) {
      setTimeLeft(currentTea.steepSeconds);
      setTimerComplete(false);
      setTimerRunning(true);
    } else {
      setTimerRunning(!timerRunning);
    }
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setTimeLeft(currentTea.steepSeconds);
    setTimerComplete(false);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = Math.round(
    ((currentTea.steepSeconds - timeLeft) / currentTea.steepSeconds) * 100
  );

  const handleOrderTea = () => {
    const msg = `Hello The Northbengal Buzz!\nI want to order authentic *${currentTea.name}*.\nPlease share available weight packs and payment details!`;
    openVerifiedWhatsApp(msg);
  };

  return (
    <section className="tea-sommelier-section" id="tea-guide">
      <div className="section-title">
        <span className="sub-heading">
          <i className="fas fa-mug-hot text-green"></i> Connoisseur Knowledge
        </span>
        <h2 className="heading-title">Himalayan Tea Sommelier & Brewing Timer</h2>
        <p className="section-desc">
          Authentic Darjeeling loose leaf tea is delicate. Brewing at the exact water temperature and time unlocks exquisite aromas without bitterness.
        </p>
      </div>

      <div className="sommelier-card-wrap">
        {/* Tea Selector Tabs */}
        <div className="tea-tabs-row">
          {TEA_GUIDES.map((tea) => {
            const isActive = tea.id === selectedTeaId;
            return (
              <button
                key={tea.id}
                type="button"
                className={`tea-sommelier-tab ${isActive ? 'active' : ''}`}
                onClick={() => handleSelectTea(tea.id)}
              >
                <i className="fas fa-leaf" style={{ color: isActive ? '#fff' : tea.colorTag }}></i>
                <span>{tea.name}</span>
              </button>
            );
          })}
        </div>

        <div className="sommelier-content-grid">
          {/* Left Column: Tea Guide & Tasting Profile */}
          <div className="tea-profile-dossier">
            <div className="tea-headline-row">
              <div>
                <span className="tea-season-badge"><i className="fas fa-calendar-alt"></i> {currentTea.season}</span>
                <h3 className="tea-profile-title">{currentTea.name}</h3>
              </div>
            </div>

            <p className="tea-bio-desc">{currentTea.description}</p>

            <div className="brewing-params-row">
              <div className="param-item">
                <i className="fas fa-temperature-high text-red"></i>
                <div>
                  <small>Water Temperature</small>
                  <strong>{currentTea.idealTemp}</strong>
                </div>
              </div>

              <div className="param-item">
                <i className="fas fa-spoon text-teal"></i>
                <div>
                  <small>Leaf to Water Ratio</small>
                  <strong>{currentTea.leafRatio}</strong>
                </div>
              </div>

              <div className="param-item">
                <i className="fas fa-wine-glass text-gold"></i>
                <div>
                  <small>How to Serve</small>
                  <strong>{currentTea.withMilk}</strong>
                </div>
              </div>
            </div>

            <div className="tasting-notes-box">
              <h4><i className="fas fa-certificate text-green"></i> Flavor & Aroma Notes:</h4>
              <div className="aroma-pills-row">
                {currentTea.aromaNotes.map((note, idx) => (
                  <span key={idx} className="aroma-pill">
                    <i className="fas fa-sparkles"></i> {note}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="btn btn-whatsapp order-sommelier-btn"
              onClick={handleOrderTea}
              title="Order this tea on WhatsApp"
            >
              <i className="fab fa-whatsapp"></i> Order {currentTea.name} on WhatsApp
            </button>
          </div>

          {/* Right Column: Interactive Live Steeping Timer */}
          <div className="steeping-timer-card">
            <div className="timer-header">
              <i className="fas fa-stopwatch text-teal"></i>
              <h4>Live Steeping Countdown</h4>
              <p>Place tea leaves in hot water and click Start</p>
            </div>

            {/* Circular Timer Display */}
            <div className="timer-dial-circle">
              <svg className="timer-svg" viewBox="0 0 100 100">
                <circle className="timer-circle-bg" cx="50" cy="50" r="42" />
                <circle
                  className="timer-circle-progress"
                  cx="50"
                  cy="50"
                  r="42"
                  style={{
                    strokeDasharray: '264',
                    strokeDashoffset: `${264 - (264 * progressPercent) / 100}`
                  }}
                />
              </svg>

              <div className="timer-center-text">
                <span className="time-display">{formatTime(timeLeft)}</span>
                <span className="time-sub">
                  {timerComplete ? '🎉 Steep Complete!' : timerRunning ? 'Steeping...' : 'Ready to Brew'}
                </span>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="timer-btn-row">
              <button
                type="button"
                className={`btn ${timerRunning ? 'btn-secondary' : 'btn-primary'} timer-ctrl-btn`}
                onClick={toggleTimer}
              >
                {timerComplete ? (
                  <>
                    <i className="fas fa-redo"></i> Brew Again
                  </>
                ) : timerRunning ? (
                  <>
                    <i className="fas fa-pause"></i> Pause
                  </>
                ) : (
                  <>
                    <i className="fas fa-play"></i> Start Steeping
                  </>
                )}
              </button>

              <button
                type="button"
                className="btn btn-outline-danger timer-reset-btn"
                onClick={resetTimer}
                title="Reset timer"
              >
                <i className="fas fa-rotate-left"></i> Reset
              </button>
            </div>

            {timerComplete && (
              <div className="timer-completion-alert">
                <i className="fas fa-check-circle text-green"></i>
                <span>Your tea is perfectly brewed! Strain leaves immediately to prevent over-steeping.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeaSommelierSection;
