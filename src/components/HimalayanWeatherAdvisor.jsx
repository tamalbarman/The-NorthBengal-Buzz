import React, { useState } from 'react';

const MOUNTAIN_WEATHER_DATA = {
  darjeeling: {
    name: 'Darjeeling Town',
    altitude: '6,710 ft (2,045 m)',
    region: 'North Bengal Hills',
    tempRange: '8°C - 17°C',
    weatherCondition: 'Pleasant & Crisp Pine Breeze',
    weatherIcon: 'fas fa-cloud-sun',
    peakVisibility: '90% Crystal Clear',
    airQuality: 'Pristine (AQI 18)',
    humidity: '62%',
    wind: '9 km/h (Gentle Hill Breeze)',
    seasonNote: 'Excellent sunrise clarity over Kanchenjunga at Tiger Hill.'
  },
  gangtok: {
    name: 'Gangtok Capital',
    altitude: '5,410 ft (1,650 m)',
    region: 'East Sikkim',
    tempRange: '11°C - 19°C',
    weatherCondition: 'Partly Sunny & Cool Valley Air',
    weatherIcon: 'fas fa-sun',
    peakVisibility: '85% Good Mountain Views',
    airQuality: 'Clean & Fresh (AQI 22)',
    humidity: '68%',
    wind: '7 km/h',
    seasonNote: 'Great weather for MG Marg strolls, cable car rides, and monastery visits.'
  },
  kalimpong: {
    name: 'Kalimpong Heritage',
    altitude: '4,100 ft (1,250 m)',
    region: 'Kalimpong District',
    tempRange: '13°C - 22°C',
    weatherCondition: 'Mild & Sunny Floral Valley',
    weatherIcon: 'fas fa-sun',
    peakVisibility: '88% Clear Horizon',
    airQuality: 'Excellent (AQI 15)',
    humidity: '58%',
    wind: '6 km/h',
    seasonNote: 'Mildest and most comfortable climate in the hills; ideal for paragliding.'
  },
  sandakphu: {
    name: 'Sandakphu Ridge',
    altitude: '11,930 ft (3,636 m)',
    region: 'Singalila National Park',
    tempRange: '-2°C - 9°C',
    weatherCondition: 'Cold Alpine Ridge & High Wind',
    weatherIcon: 'fas fa-wind',
    peakVisibility: '98% Panoramic (Everest & Kanchenjunga)',
    airQuality: 'Pure Virgin Alpine (AQI 5)',
    humidity: '45%',
    wind: '22 km/h (Cold Ridge Winds)',
    seasonNote: 'Sub-zero temperatures at night. Heavy windcheaters and thermal thermals mandatory.'
  },
  nathula: {
    name: 'Nathula Pass & Tsomgo',
    altitude: '14,140 ft (4,310 m)',
    region: 'Indo-China Border (East Sikkim)',
    tempRange: '-5°C - 4°C',
    weatherCondition: 'Freezing Alpine & Snowfield',
    weatherIcon: 'fas fa-snowflake',
    peakVisibility: 'Variable Mountain Weather',
    airQuality: 'High Altitude Glacial',
    humidity: '50%',
    wind: '26 km/h (Freezing Gusts)',
    seasonNote: 'Frozen lake conditions. Warm fleece gloves, woollen caps, and sun goggles essential.'
  },
  dooars: {
    name: 'Dooars & Gorumara',
    altitude: '450 ft (140 m)',
    region: 'North Bengal Plains & Jungle',
    tempRange: '18°C - 28°C',
    weatherCondition: 'Warm Tropical Forest Canopy',
    weatherIcon: 'fas fa-tree',
    peakVisibility: 'Forest Canopy Horizon',
    airQuality: 'Green Forest Air (AQI 28)',
    humidity: '72%',
    wind: '5 km/h',
    seasonNote: 'Ideal wildlife safari season. Morning jungle safaris yield rhino and elephant sightings.'
  }
};

const SEASONAL_PACKING_GUIDE = {
  autumn: {
    id: 'autumn',
    label: 'Sep – Nov (Autumn & Clear Peaks)',
    icon: 'fas fa-mountain-sun',
    summary: 'The best time for 360° Kanchenjunga views and clear blue skies. Days are pleasantly warm; nights get chilly.',
    items: [
      { text: 'Light to medium fleece jacket or pullover', priority: 'essential' },
      { text: 'Thermal inner layer (for high stops like Ghum/Tsomgo)', priority: 'recommended' },
      { text: 'Comfortable walking / trekking sneakers with good grip', priority: 'essential' },
      { text: 'Polarized sunglasses (UV rays are strong at high altitudes)', priority: 'recommended' },
      { text: 'High-capacity power bank (cold weather drains phone battery 30% faster)', priority: 'essential' },
      { text: 'Moisturizer & SPF 50 sunscreen + lip balm', priority: 'recommended' },
      { text: 'Original Voter ID / Passport + 4 passport photos (for Sikkim permits)', priority: 'essential' }
    ]
  },
  winter: {
    id: 'winter',
    label: 'Dec – Feb (Winter & Snow Window)',
    icon: 'fas fa-snowflake',
    summary: 'Freezing mountain mornings, occasional snow at Sandakphu and Nathula, and crisp sunny afternoons.',
    items: [
      { text: 'Heavy windproof down feather jacket or parka', priority: 'essential' },
      { text: 'Thermal top & bottom inner sets (2 pairs minimum)', priority: 'essential' },
      { text: 'Woollen beanie / monkey cap covering ears completely', priority: 'essential' },
      { text: 'Waterproof insulated gloves (especially for snow at Tsomgo lake)', priority: 'essential' },
      { text: 'Thick woollen socks (3-4 pairs) + sturdy trekking boots', priority: 'essential' },
      { text: 'Thermos flask for carrying hot ginger water during hill drives', priority: 'recommended' },
      { text: 'Cold cream & heavy body lotion for dry mountain air', priority: 'recommended' },
      { text: 'Permit ID documentation + passport photos', priority: 'essential' }
    ]
  },
  spring: {
    id: 'spring',
    label: 'Mar – May (Spring & Rhododendrons)',
    icon: 'fas fa-seedling',
    summary: 'Misty blooms of wild rhododendrons, magnolias, and fresh tea garden leaf plucking season.',
    items: [
      { text: 'Layerable light sweater or denim/cardigan jacket', priority: 'essential' },
      { text: 'Breathable cotton t-shirts for sunny afternoons', priority: 'recommended' },
      { text: 'Compact travel umbrella or windbreaker (spring showers occur)', priority: 'essential' },
      { text: 'Binoculars for bird watching in Neora Valley & Singalila', priority: 'recommended' },
      { text: 'Antihistamines / basic motion sickness tablets for hill hairpins', priority: 'recommended' },
      { text: 'Camera with zoom lens for tea garden & flower photography', priority: 'recommended' },
      { text: 'Original government photo ID copies for checkposts', priority: 'essential' }
    ]
  },
  monsoon: {
    id: 'monsoon',
    label: 'Jun – Aug (Monsoon Valleys & Waterfalls)',
    icon: 'fas fa-cloud-showers-heavy',
    summary: 'Dramatic rolling cloud fog, roaring mountain waterfalls, and lush emerald green tea slopes.',
    items: [
      { text: 'High-quality waterproof rain poncho or trench raincoat', priority: 'essential' },
      { text: 'Quick-dry synthetic clothing (avoid heavy denim that stays wet)', priority: 'essential' },
      { text: 'Waterproof covers for backpack and mobile phones', priority: 'essential' },
      { text: 'Leech guard socks / salt pouches for forest trails & Dooars', priority: 'essential' },
      { text: 'Anti-skid waterproof trekking shoes or gumboots', priority: 'essential' },
      { text: 'Mosquito / insect repellent spray for foothill homestays', priority: 'recommended' },
      { text: 'Laminated ziplock pouches for keeping identity documents dry', priority: 'essential' }
    ]
  }
};

const HimalayanWeatherAdvisor = () => {
  const [activeSpotKey, setActiveSpotKey] = useState('darjeeling');
  const [activeSeasonKey, setActiveSeasonKey] = useState('autumn');
  const [priorityFilter, setPriorityFilter] = useState('all'); // 'all', 'essential', 'recommended'
  const [checkedItems, setCheckedItems] = useState({});
  const [copyFeedback, setCopyFeedback] = useState(false);

  const spot = MOUNTAIN_WEATHER_DATA[activeSpotKey];
  const season = SEASONAL_PACKING_GUIDE[activeSeasonKey];

  const toggleCheck = (idx) => {
    setCheckedItems((prev) => ({
      ...prev,
      [`${activeSeasonKey}-${idx}`]: !prev[`${activeSeasonKey}-${idx}`]
    }));
  };

  const selectAllMustHave = () => {
    setCheckedItems((prev) => {
      const updated = { ...prev };
      season.items.forEach((item, idx) => {
        if (item.priority === 'essential') {
          updated[`${activeSeasonKey}-${idx}`] = true;
        }
      });
      return updated;
    });
  };

  const clearAllInSeason = () => {
    setCheckedItems((prev) => {
      const updated = { ...prev };
      season.items.forEach((_, idx) => {
        delete updated[`${activeSeasonKey}-${idx}`];
      });
      return updated;
    });
  };

  const packedCount = season.items.filter((_, i) => checkedItems[`${activeSeasonKey}-${i}`]).length;
  const progressPercent = Math.round((packedCount / season.items.length) * 100);

  const essentialCount = season.items.filter((it) => it.priority === 'essential').length;
  const recommendedCount = season.items.filter((it) => it.priority === 'recommended').length;

  const indexedItems = season.items.map((item, originalIdx) => ({ item, originalIdx }));
  const filteredItems = indexedItems.filter(({ item }) => {
    if (priorityFilter === 'all') return true;
    return item.priority === priorityFilter;
  });

  const handleCopyChecklist = () => {
    const text = `🏔️ The Northbengal Buzz - Packing Checklist (${season.label})\n\n` +
      season.items.map((it, i) => `${checkedItems[`${activeSeasonKey}-${i}`] ? '✅' : '⬜'} ${it.text} [${it.priority.toUpperCase()}]`).join('\n') +
      `\n\nPlan your trip with https://thenorthbengalbuzz.com`;

    navigator.clipboard.writeText(text).then(() => {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2500);
    });
  };

  return (
    <section className="weather-advisor-section" id="weather-guide">
      <div className="section-title">
        <span className="sub-heading">
          <i className="fas fa-cloud-sun text-yellow"></i> Live Mountain Conditions
        </span>
        <h2 className="heading-title">Himalayan Climate & Smart Packing Advisor</h2>
        <p className="section-desc">
          Mountain temperatures shift rapidly from the plains into high alpine ridges. Check live spot conditions and generate your seasonal packing checklist.
        </p>
      </div>

      {/* Spot Selector Bar */}
      <div className="weather-spot-tabs">
        {Object.entries(MOUNTAIN_WEATHER_DATA).map(([key, data]) => (
          <button
            key={key}
            type="button"
            className={`weather-spot-btn ${key === activeSpotKey ? 'active' : ''}`}
            onClick={() => setActiveSpotKey(key)}
          >
            <i className={data.weatherIcon}></i>
            <div>
              <strong>{data.name}</strong>
              <small>{data.altitude}</small>
            </div>
          </button>
        ))}
      </div>

      {/* Main Climate Showcase Card */}
      <div className="weather-showcase-card">
        <div className="weather-overview-left">
          <div className="weather-spot-meta">
            <span className="badge-region"><i className="fas fa-location-dot"></i> {spot.region}</span>
            <span className="badge-altitude"><i className="fas fa-mountain"></i> {spot.altitude}</span>
          </div>

          <h3 className="spot-title-heading">{spot.name}</h3>
          <p className="spot-condition-badge">
            <i className={spot.weatherIcon}></i> {spot.weatherCondition}
          </p>

          <div className="temp-hero-display">
            <span className="temp-numbers">{spot.tempRange}</span>
            <span className="temp-label">Typical Day / Night Range</span>
          </div>

          <p className="spot-season-note">
            <i className="fas fa-circle-info text-teal"></i> {spot.seasonNote}
          </p>
        </div>

        <div className="weather-metrics-grid">
          <div className="weather-metric-box">
            <i className="fas fa-eye text-yellow"></i>
            <div>
              <small>Kanchenjunga Peak Visibility</small>
              <strong>{spot.peakVisibility}</strong>
            </div>
          </div>

          <div className="weather-metric-box">
            <i className="fas fa-wind text-teal"></i>
            <div>
              <small>Wind Velocity</small>
              <strong>{spot.wind}</strong>
            </div>
          </div>

          <div className="weather-metric-box">
            <i className="fas fa-droplet text-blue"></i>
            <div>
              <small>Mountain Humidity</small>
              <strong>{spot.humidity}</strong>
            </div>
          </div>

          <div className="weather-metric-box">
            <i className="fas fa-leaf text-green"></i>
            <div>
              <small>Air Purity Index</small>
              <strong>{spot.airQuality}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Seasonal Packing Advisor Section */}
      <div className="packing-advisor-container">
        <div className="packing-header">
          <div className="packing-lead">
            <i className="fas fa-suitcase-rolling text-gold"></i>
            <div>
              <h3>Interactive Seasonal Packing Checklist</h3>
              <p>Select your travel month to generate your personalized gear & clothing checklist:</p>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-sm btn-outline copy-checklist-btn"
            onClick={handleCopyChecklist}
            title="Copy checklist to clipboard"
          >
            {copyFeedback ? (
              <>
                <i className="fas fa-check text-green"></i> Copied to Clipboard!
              </>
            ) : (
              <>
                <i className="fas fa-copy"></i> Copy / Share Checklist
              </>
            )}
          </button>
        </div>

        {/* Season Switcher Pills */}
        <div className="season-pills-row">
          {Object.entries(SEASONAL_PACKING_GUIDE).map(([key, item]) => (
            <button
              key={key}
              type="button"
              className={`season-pill ${key === activeSeasonKey ? 'active' : ''}`}
              onClick={() => setActiveSeasonKey(key)}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Checklist Body & Interactive Progress */}
        <div className="packing-checklist-card">
          <div className="packing-progress-bar-wrap">
            <div className="progress-info-row">
              <span className="season-summary-text">{season.summary}</span>
              <span className="packed-counter-badge">
                {packedCount} of {season.items.length} Packed ({progressPercent}%)
              </span>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Interactive Priority Filter Toolbar: All, Must Have, Recommended */}
          <div className="checklist-filter-toolbar">
            <div className="priority-filter-tabs">
              <button
                type="button"
                className={`priority-filter-btn ${priorityFilter === 'all' ? 'active' : ''}`}
                onClick={() => setPriorityFilter('all')}
              >
                All Gear ({season.items.length})
              </button>
              <button
                type="button"
                className={`priority-filter-btn essential ${priorityFilter === 'essential' ? 'active' : ''}`}
                onClick={() => setPriorityFilter('essential')}
              >
                <i className="fas fa-star text-gold"></i> Must Have ({essentialCount})
              </button>
              <button
                type="button"
                className={`priority-filter-btn recommended ${priorityFilter === 'recommended' ? 'active' : ''}`}
                onClick={() => setPriorityFilter('recommended')}
              >
                <i className="fas fa-lightbulb text-teal"></i> Recommended ({recommendedCount})
              </button>
            </div>

            <div className="checklist-quick-actions">
              <button
                type="button"
                className="checklist-action-btn"
                onClick={selectAllMustHave}
                title="Mark all essential Must-Have items as packed"
              >
                <i className="fas fa-check-double text-green"></i> Pack All Must-Have
              </button>
              {packedCount > 0 && (
                <button
                  type="button"
                  className="checklist-action-btn clear"
                  onClick={clearAllInSeason}
                  title="Uncheck all items"
                >
                  <i className="fas fa-rotate-left"></i> Reset
                </button>
              )}
            </div>
          </div>

          <div className="checklist-items-grid">
            {filteredItems.map(({ item, originalIdx }) => {
              const isChecked = !!checkedItems[`${activeSeasonKey}-${originalIdx}`];
              return (
                <div
                  key={`${activeSeasonKey}-${originalIdx}`}
                  role="checkbox"
                  aria-checked={isChecked}
                  tabIndex={0}
                  className={`checklist-item-row ${isChecked ? 'checked' : ''}`}
                  onClick={() => toggleCheck(originalIdx)}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      toggleCheck(originalIdx);
                    }
                  }}
                >
                  <div className="check-indicator">
                    {isChecked && <i className="fas fa-check"></i>}
                  </div>
                  <span className="item-text">{item.text}</span>
                  <span
                    className={`priority-tag ${item.priority}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPriorityFilter(item.priority);
                    }}
                    title={`Click to filter by ${item.priority === 'essential' ? 'Must Have' : 'Recommended'}`}
                  >
                    {item.priority === 'essential' ? '★ Must Have' : 'Recommended'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HimalayanWeatherAdvisor;
