import React, { useState } from 'react';
import { useAntiBot } from '../context/AntiBotContext';

const HIMALAYAN_ROUTES = [
  {
    id: 'darjeeling-heritage',
    name: 'Darjeeling Toy Train Heritage Route',
    highway: 'NH 110 (Hill Cart Road)',
    icon: 'fas fa-train',
    color: '#00a896',
    distance: '70 km',
    duration: '3.0 - 3.5 hrs',
    altitudeRange: '400 ft ➔ 7,407 ft (Ghum)',
    summary: 'The classic ascent from the tropical plains of Siliguri up through mist-laden pine ridges, tea slopes, and the UNESCO Darjeeling Himalayan Railway.',
    stoppages: [
      {
        id: 'njp-bagdogra',
        name: 'NJP Station / Bagdogra (IXB)',
        nepaliName: 'सिलिगुड़ी',
        altitude: '400 ft',
        distance: '0 km (Starting Hub)',
        timeFromStart: '0 mins',
        roadType: '4-Lane Highway & Plain Corridor',
        highlights: [
          'Direct connectivity via Flights & Trains',
          'Pre-booked hill cab stands (Dzire, Bolero, Innova)',
          'Shared mountain jeep counters at Siliguri Junction'
        ],
        foodTip: 'Pack mineral water and have breakfast at Siliguri before the winding mountain climb.',
        travelTip: 'Book experienced hill drivers; mountain driving begins past Sukna forest checkpost.',
        image: '/assets/images/img-13.jpg'
      },
      {
        id: 'sukna-rohini',
        name: 'Sukna & Rohini Toll Gate',
        nepaliName: 'रोहिणी भ्यू',
        altitude: '1,200 ft',
        distance: '18 km from NJP',
        timeFromStart: '35 mins',
        roadType: 'Smooth mountain bypass with hairpin switchbacks',
        highlights: [
          'Entry to Mahananda Wildlife Sanctuary perimeter',
          'First panoramic overlook of the North Bengal tea plains',
          'Popular viewpoint for morning tea & sunrise photography'
        ],
        foodTip: 'Fresh mountain cucumber with rock salt and hot chai from roadside kiosks.',
        travelTip: 'Rohini road is wide and faster than old Hill Cart Road; ideal for motion-sensitive travelers.',
        image: '/assets/images/img-14.jpg'
      },
      {
        id: 'kurseong',
        name: 'Kurseong (The White Orchid Hill)',
        nepaliName: 'खरसाङ',
        altitude: '4,860 ft',
        distance: '47 km from NJP',
        timeFromStart: '1 hr 45 mins',
        roadType: 'Mountain town spine with Toy Train tracks along the road',
        highlights: [
          'Eagle’s Crag 360-degree Kanchenjunga viewpoint',
          'Dow Hill historic heritage schools and sacred pine forest',
          'DHR Heritage Railway station & engine shed'
        ],
        foodTip: 'Stop for authentic piping hot Darjeeling steamed momos & fresh Darjeeling First Flush.',
        travelTip: 'Ideal midway stoppage to stretch your legs and acclimatize to the cooling mountain air.',
        image: '/assets/images/img-15.jpg'
      },
      {
        id: 'sonada',
        name: 'Sonada & Margaret’s Hope Estate',
        nepaliName: 'सोनादा',
        altitude: '5,500 ft',
        distance: '58 km from NJP',
        timeFromStart: '2 hrs 15 mins',
        roadType: 'Winding tea valley with dramatic cloud inversion',
        highlights: [
          'World-famous Margaret’s Hope Tea Estate slopes',
          'Sonada Catholic Monastery & local woodcraft workshops',
          'Dense Himalayan bamboo groves and rolling fog'
        ],
        foodTip: 'Buy authentic estate-packaged black tea leaves directly from roadside farmer outlets.',
        travelTip: 'Dense fog frequently descends here; vehicles drive with yellow fog lamps.',
        image: '/assets/images/img-18.jpg'
      },
      {
        id: 'ghum',
        name: 'Ghum (India’s Highest Railway Station)',
        nepaliName: 'घुम',
        altitude: '7,407 ft (Highest Point)',
        distance: '64 km from NJP',
        timeFromStart: '2 hrs 45 mins',
        roadType: 'Alpine high-altitude ridge crest',
        highlights: [
          'Highest altitude railway station in India (7,407 ft)',
          'Historic 1875 Yiga Choeling Ghum Buddhist Monastery',
          'Darjeeling Himalayan Railway Heritage Museum'
        ],
        foodTip: 'Traditional Tibetan Thukpa (steaming noodle soup) to warm up in chilly weather.',
        travelTip: 'Temperature drops sharply here; keep heavy jackets or shawls ready.',
        image: '/assets/images/img-19.jpg'
      },
      {
        id: 'batasia',
        name: 'Batasia Loop & War Memorial',
        nepaliName: 'बतासिया लुप',
        altitude: '7,000 ft',
        distance: '67 km from NJP',
        timeFromStart: '3 hrs',
        roadType: 'Panoramic loop curve entering Darjeeling',
        highlights: [
          'Engineering marvel: 360° Toy Train spiral loop track',
          'Gorkha Soldier War Memorial & manicured flower gardens',
          'Unobstructed amphitheatre view of Mt. Kanchenjunga'
        ],
        foodTip: 'Local roasted spicy mountain corn (Bhutta) and ginger cardamon tea.',
        travelTip: 'Traditional dress photo stalls available; great spot for family photos.',
        image: '/assets/images/img-14.jpg'
      },
      {
        id: 'darjeeling-town',
        name: 'Darjeeling Town & Chowrasta Mall',
        nepaliName: 'दार्जिलिङ चौरस्ता',
        altitude: '6,710 ft',
        distance: '70 km (Final Destination)',
        timeFromStart: '3 hrs 15 mins',
        roadType: 'Heritage colonial hill station',
        highlights: [
          'Chowrasta Mall road (pedestrian-only zone)',
          'Tiger Hill early morning sunrise over Mt. Everest & Kanchenjunga',
          'Himalayan Mountaineering Institute & Padmaja Naidu Zoo',
          'Colonial tea rooms and Glenary’s bakery'
        ],
        foodTip: 'Bakery treats at Glenary’s & evening Darjeeling Muscatel tea overlooking the hills.',
        travelTip: 'Taxis drop at the Clubside / Chowk Bazaar stand; luggage porters guide you to Mall hotels.',
        image: '/assets/images/home-slide-1.jpg'
      }
    ]
  },
  {
    id: 'kalimpong-lava',
    name: 'Kalimpong & Lava Alpine Eco Trail',
    highway: 'NH 10 ➔ Rishi Road',
    icon: 'fas fa-mountain',
    color: '#f5a623',
    distance: '85 km',
    duration: '3.0 hrs',
    altitudeRange: '400 ft ➔ 7,200 ft (Lava)',
    summary: 'Travel along the turquoise Teesta River gorge past the British Coronation Bridge into serene flower nurseries and silent pine woods of Neora Valley.',
    stoppages: [
      {
        id: 'sevoke-bridge',
        name: 'Sevoke Coronation Bridge (Teesta Gorge)',
        nepaliName: 'सेभोक पुल',
        altitude: '750 ft',
        distance: '22 km from Siliguri',
        timeFromStart: '40 mins',
        roadType: 'Heritage arch bridge spanning deep river gorge',
        highlights: [
          'Iconic 1941 cantilever arch bridge over river Teesta',
          'Sevoke Kali Mandir atop rocky cliffside',
          'Scenic meeting point of Himalayan hills and Dooars plains'
        ],
        foodTip: 'Fresh green coconut water and local banana fritters.',
        travelTip: 'Heavy truck traffic at times; drive carefully across the single-lane bridge.',
        image: '/assets/images/img-13.jpg'
      },
      {
        id: 'melli-chitrey',
        name: 'Melli & Chitrey River Rafting Point',
        nepaliName: 'चित्रे',
        altitude: '900 ft',
        distance: '42 km from Siliguri',
        timeFromStart: '1 hr 15 mins',
        roadType: 'River valley roadway alongside roaring river',
        highlights: [
          'Teesta White Water Rafting boarding points',
          'Sikkim - West Bengal border bifurcation bridge',
          'Spectacular canyon rock formations and sandy river beaches'
        ],
        foodTip: 'Crispy river fish fry and hot tea with river view.',
        travelTip: 'Rafting tickets can be pre-booked; safety vests and trained rafters provided.',
        image: '/assets/images/home-slide-2.jpg'
      },
      {
        id: 'kalimpong-town',
        name: 'Kalimpong Heritage Town & Deolo Hill',
        nepaliName: 'कालिम्पोङ',
        altitude: '4,100 ft',
        distance: '70 km from Siliguri',
        timeFromStart: '2 hrs 15 mins',
        roadType: 'Gentle uphill climb through floral villages',
        highlights: [
          'Deolo Hill 360-degree viewpoint & Kalimpong Science Centre',
          'Tandem Paragliding take-off point over Teesta valley',
          'Durpin Monastery (Zang Dhok Palri Phodang)',
          'Exotic Cactus & Orchid botanical nurseries'
        ],
        foodTip: 'Authentic Kalimpong cheese and local lollipop confectionery.',
        travelTip: 'Less commercialized and more peaceful climate than Darjeeling.',
        image: '/assets/images/img-15.jpg'
      },
      {
        id: 'lava-forest',
        name: 'Lava Pine Forest (Neora Valley Gateway)',
        nepaliName: 'लाभा',
        altitude: '7,200 ft',
        distance: '100 km from Siliguri',
        timeFromStart: '3 hrs 15 mins',
        roadType: 'Dense alpine fir, birch, and pine canopy road',
        highlights: [
          'Kagyu Thekchen Ling Monastery with mountain backdrop',
          'Gateway to Neora Valley National Park (Red Panda habitat)',
          'Atmospheric wooden cottages in deep pine fog'
        ],
        foodTip: 'Warm ginger-lemon tea and Tibetan tingmo (steamed bread).',
        travelTip: 'Requires warm woollens even in summer; winter brings occasional snowfall.',
        image: '/assets/images/img-18.jpg'
      }
    ]
  },
  {
    id: 'sikkim-silk',
    name: 'Sikkim Alpine Silk Route & Nathula Circuit',
    highway: 'NH 10 ➔ Jawaharlal Nehru Marg',
    icon: 'fas fa-snowflake',
    color: '#028090',
    distance: '175 km',
    duration: '5.0 - 6.0 hrs',
    altitudeRange: '1,200 ft ➔ 14,140 ft (Nathula)',
    summary: 'A breathtaking high-altitude expedition past Sikkim checkposts, winding up through Gangtok to sacred glacial lakes and the Indo-China international border.',
    stoppages: [
      {
        id: 'rangpo-border',
        name: 'Rangpo (Sikkim Tourism Entry Hub)',
        nepaliName: 'राङ्पो',
        altitude: '1,200 ft',
        distance: '75 km from Siliguri',
        timeFromStart: '2 hrs',
        roadType: 'State gateway & tourism clearance gate',
        highlights: [
          'Official Sikkim Tourist Information Centre',
          'Vehicle inspection & Inner Line Permit (ILP) verification for foreigners',
          'Transition into Sikkim clean and organic green state'
        ],
        foodTip: 'Sample organic Sikkim fruits and freshly squeezed juices.',
        travelTip: 'Keep Voter ID / Passport copies handy for smooth tourism registration.',
        image: '/assets/images/img-13.jpg'
      },
      {
        id: 'gangtok-city',
        name: 'Gangtok Capital City & MG Marg',
        nepaliName: 'गान्तोक',
        altitude: '5,410 ft',
        distance: '125 km from Siliguri',
        timeFromStart: '4 hrs',
        roadType: 'Multi-tiered mountain city roads',
        highlights: [
          'MG Marg pedestrian promenade (spit-free, vehicle-free eco zone)',
          'Gangtok Ropeway cable car overlooking town',
          'Do Drul Chorten Stupa & Namgyal Institute of Tibetology',
          'Rumtek Monastery (Seat of the Karmapa)'
        ],
        foodTip: 'Authentic Sikkimese Shaphaley (crispy meat/veg pastry) and Gundruk soup.',
        travelTip: 'Only Sikkim registered commercial yellow-plate cabs can take you up to Tsomgo/Nathula.',
        image: '/assets/images/home-slide-3.jpg'
      },
      {
        id: 'tsomgo-lake',
        name: 'Tsomgo Glacial Lake (Changu Lake)',
        nepaliName: 'छङ्गु ताल',
        altitude: '12,400 ft (High Alpine)',
        distance: '160 km from Siliguri',
        timeFromStart: '5 hrs 15 mins',
        roadType: 'Steep zig-zag mountain highway cut into cliffside',
        highlights: [
          'Sacred alpine glacial lake with changing seasonal colors',
          'Decorated Yak rides and snow boots rental',
          'Highest altitude passenger ropeway in Asia'
        ],
        foodTip: 'Hot Maggi and boiled eggs at high-altitude mountain shacks.',
        travelTip: 'Protected Area Permit (PAP) mandatory 24h prior; carry warm gloves and caps.',
        image: '/assets/images/img-19.jpg'
      },
      {
        id: 'nathula-pass',
        name: 'Nathula Pass (Indo-China Border)',
        nepaliName: 'नाथुला',
        altitude: '14,140 ft (Glacial Peak)',
        distance: '175 km from Siliguri',
        timeFromStart: '6 hrs',
        roadType: 'Military-maintained border pass road',
        highlights: [
          'Ancient Silk Route trading pass connecting India & Tibet',
          'Indian Army checkpost & Baba Harbhajan Singh Memorial',
          'Unbelievable panoramic snowfield of the eastern Himalayas'
        ],
        foodTip: 'Army canteen hot tea & snacks at the world’s highest border checkpost.',
        travelTip: 'Open only for Indian citizens (Wed to Sun). Closed on Mondays & Tuesdays.',
        image: '/assets/images/home-slide-4.jpg'
      }
    ]
  },
  {
    id: 'dooars-safari',
    name: 'Dooars Wildlife & Tea Forest Corridor',
    highway: 'NH 17 & Asian Highway 48',
    icon: 'fas fa-paw',
    color: '#10b981',
    distance: '85 km',
    duration: '2.0 - 2.5 hrs',
    altitudeRange: '300 ft ➔ 1,800 ft (Low Plains & Foothills)',
    summary: 'Cruise along the flat lush green plains of North Bengal through endless tea garden horizons and deep Sal forests teeming with elephants and one-horned rhinos.',
    stoppages: [
      {
        id: 'chalsa-malbazar',
        name: 'Malbazar & Chalsa Tea Horizon',
        nepaliName: 'चालसा',
        altitude: '700 ft',
        distance: '60 km from Siliguri',
        timeFromStart: '1 hr 15 mins',
        roadType: 'Wide smooth highway flanked by tea estates',
        highlights: [
          'Endless green tea garden slopes under clear blue skies',
          'Chalsa roundabout gateway to South & North Dooars',
          'Scenic Kurti river stream bridges'
        ],
        foodTip: 'Local roasted cashew nuts and fresh Dooars CTC chai.',
        travelTip: 'Very easy and comfortable route with zero mountain hairpins; great for seniors.',
        image: '/assets/images/img-14.jpg'
      },
      {
        id: 'lataguri-gorumara',
        name: 'Lataguri & Gorumara National Park',
        nepaliName: 'लाटागुड़ी',
        altitude: '450 ft',
        distance: '75 km from Siliguri',
        timeFromStart: '1 hr 45 mins',
        roadType: 'Dense canopy forest corridor with animal crossings',
        highlights: [
          'Open Gypsy Jungle Safari into Gorumara National Park',
          'Jatraprasad and Rhino Watchtowers',
          'Spot Indian One-Horned Rhinoceros, Gaurs (Bison), and Hornbills'
        ],
        foodTip: 'Traditional Bengali forest resort fish thali with local river Boroli fish.',
        travelTip: 'Forest safaris run in 4 shifts daily; morning 6 AM and afternoon 3 PM are best.',
        image: '/assets/images/img-15.jpg'
      },
      {
        id: 'murti-samsing',
        name: 'Murti River & Samsing Tea Terraces',
        nepaliName: 'मुर्ति नदी',
        altitude: '1,200 ft',
        distance: '85 km from Siliguri',
        timeFromStart: '2 hrs',
        roadType: 'Pristine foothill roadway leading to river banks',
        highlights: [
          'Crystal-clear Murti river bed with white round stones',
          'Rocky Island and Suntalekhola hanging suspension bridge',
          'Organic cardamom and orange orchards'
        ],
        foodTip: 'Riverside evening barbecue and roasted local chicken.',
        travelTip: 'Camp and dip your feet in the clear mountain river water during winter and spring.',
        image: '/assets/images/img-18.jpg'
      }
    ]
  }
];

const HimalayanRouteMapSection = () => {
  const [activeRouteId, setActiveRouteId] = useState('darjeeling-heritage');
  const [selectedStoppageIdx, setSelectedStoppageIdx] = useState(2); // Default to Kurseong
  const { openVerifiedWhatsApp } = useAntiBot();

  const currentRoute = HIMALAYAN_ROUTES.find((r) => r.id === activeRouteId) || HIMALAYAN_ROUTES[0];
  const activeStoppage = currentRoute.stoppages[selectedStoppageIdx] || currentRoute.stoppages[0];

  const handleRouteChange = (id) => {
    setActiveRouteId(id);
    setSelectedStoppageIdx(0);
  };

  const handleInquireStoppage = () => {
    const msg = `Hello The Northbengal Buzz!\nI am planning a trip along the *${currentRoute.name}*.\nI want to explore/stay at: *${activeStoppage.name}* (${activeStoppage.altitude}).\nPlease provide cab rental and custom itinerary options!`;
    openVerifiedWhatsApp(msg);
  };

  return (
    <section className="route-map-section" id="route-map">
      <div className="section-title">
        <span className="sub-heading">
          <i className="fas fa-map-location-dot text-gold"></i> Spot-by-Spot Transit Guide
        </span>
        <h2 className="heading-title">Himalayan Route & Stoppage Explorer</h2>
        <p className="section-desc">
          Discover exactly how to travel from NJP Station & Bagdogra Airport into the hills. Explore major stopovers, altitudes, viewpoints, food recommendations, and road conditions without needing Google Maps.
        </p>
      </div>

      {/* Route Switcher Tabs */}
      <div className="route-tabs-container">
        {HIMALAYAN_ROUTES.map((route) => {
          const isActive = route.id === activeRouteId;
          return (
            <button
              key={route.id}
              type="button"
              className={`route-tab-pill ${isActive ? 'active' : ''}`}
              onClick={() => handleRouteChange(route.id)}
            >
              <i className={route.icon} style={{ color: isActive ? '#fff' : route.color }}></i>
              <span>{route.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Route Explorer Workspace */}
      <div className="route-workspace-grid">
        {/* Left Column: Interactive Visual Waypoint Map & Elevation Track */}
        <div className="route-map-visual-card">
          <div className="route-meta-header">
            <div className="route-badge-row">
              <span className="route-code-badge">
                <i className="fas fa-road"></i> {currentRoute.highway}
              </span>
              <span className="route-stat-badge">
                <i className="fas fa-arrows-left-right"></i> {currentRoute.distance}
              </span>
              <span className="route-stat-badge">
                <i className="fas fa-clock"></i> {currentRoute.duration}
              </span>
            </div>
            <h3 className="route-title-lead">{currentRoute.name}</h3>
            <p className="route-summary-text">{currentRoute.summary}</p>
          </div>

          {/* Interactive Stoppage Elevation Flow */}
          <div className="stoppage-interactive-track">
            <div className="track-instruction-banner">
              <i className="fas fa-hand-pointer text-gold"></i> Click any stoppage node below to view altitude & local tips:
            </div>

            <div className="stoppage-nodes-flow">
              {currentRoute.stoppages.map((stop, idx) => {
                const isSelected = idx === selectedStoppageIdx;
                return (
                  <div
                    key={stop.id}
                    className={`stoppage-step-node ${isSelected ? 'active-step' : ''}`}
                    onClick={() => setSelectedStoppageIdx(idx)}
                  >
                    <div className="node-marker-wrap">
                      <div className="node-marker-circle">
                        {isSelected ? <i className="fas fa-location-dot"></i> : <span>{idx + 1}</span>}
                      </div>
                      {idx < currentRoute.stoppages.length - 1 && <div className="node-connector-line"></div>}
                    </div>

                    <div className="node-text-summary">
                      <div className="node-title-row">
                        <span className="node-name">{stop.name}</span>
                        <span className="node-altitude-pill">
                          <i className="fas fa-mountain"></i> {stop.altitude}
                        </span>
                      </div>
                      <span className="node-distance-sub">
                        <i className="fas fa-gauge"></i> {stop.distance}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Deep Stoppage Profile Details Card */}
        <div className="stoppage-profile-card">
          <div className="profile-header-banner">
            <div className="profile-badge-row">
              <span className="altitude-flag">
                <i className="fas fa-mountain text-yellow"></i> Altitude: <strong>{activeStoppage.altitude}</strong>
              </span>
              <span className="stop-counter-flag">
                Stop {selectedStoppageIdx + 1} of {currentRoute.stoppages.length}
              </span>
            </div>
            <h3 className="stoppage-lead-name">{activeStoppage.name}</h3>
            <span className="stoppage-nepali-tag">{activeStoppage.nepaliName}</span>
          </div>

          <div className="profile-stats-grid">
            <div className="p-stat-box">
              <i className="fas fa-route text-teal"></i>
              <div>
                <small>Distance</small>
                <strong>{activeStoppage.distance}</strong>
              </div>
            </div>
            <div className="p-stat-box">
              <i className="fas fa-hourglass-half text-gold"></i>
              <div>
                <small>Driving Time</small>
                <strong>~{activeStoppage.timeFromStart}</strong>
              </div>
            </div>
            <div className="p-stat-box full-span">
              <i className="fas fa-road text-green"></i>
              <div>
                <small>Terrain & Road Character</small>
                <strong>{activeStoppage.roadType}</strong>
              </div>
            </div>
          </div>

          {/* Highlights & Sightseeing */}
          <div className="profile-section-block">
            <h4 className="profile-subheading">
              <i className="fas fa-camera text-teal"></i> Key Sightseeing & Highlights
            </h4>
            <ul className="profile-highlights-list">
              {activeStoppage.highlights.map((h, i) => (
                <li key={i}>
                  <i className="fas fa-check-circle text-green"></i>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Local Food Tip */}
          <div className="profile-tip-box food-tip">
            <div className="tip-icon">
              <i className="fas fa-utensils"></i>
            </div>
            <div className="tip-content">
              <strong>Local Stoppage Food & Tea Tip:</strong>
              <p>{activeStoppage.foodTip}</p>
            </div>
          </div>

          {/* Travel & Cab Logistics Tip */}
          <div className="profile-tip-box travel-tip">
            <div className="tip-icon">
              <i className="fas fa-compass"></i>
            </div>
            <div className="tip-content">
              <strong>Transit & Logistics Note:</strong>
              <p>{activeStoppage.travelTip}</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="profile-actions-row">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleInquireStoppage}
              title="Inquire about this spot on WhatsApp"
            >
              <i className="fab fa-whatsapp"></i> Inquire Stoppage on WhatsApp
            </button>
            <a
              href="#cabs"
              className="btn btn-outline"
              title="Estimate taxi fare for this spot"
            >
              <i className="fas fa-taxi"></i> Check Cab Fare Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HimalayanRouteMapSection;
