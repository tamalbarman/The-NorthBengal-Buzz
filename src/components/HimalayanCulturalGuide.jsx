import React, { useState } from 'react';

const PHRASES = [
  {
    nepali: 'नमस्ते / कस्तो छ ? (Namaste / Kasto chha?)',
    bengali: 'কেমন আছেন? (Kemon achen?)',
    meaning: 'Hello! How are you?',
    pronunciation: 'Kahs-toh chah?',
    tip: 'The universal warm greeting across all North Bengal and Sikkim homestays.'
  },
  {
    nepali: 'धेरै राम्रो छ ! (Dherai ramro chha!)',
    bengali: 'অনেক সুন্দর! (Onek shundor!)',
    meaning: 'It is very beautiful!',
    pronunciation: 'Dhay-rye rahm-roh chah!',
    tip: 'Say this to your host when admiring the Kanchenjunga view or garden flowers.'
  },
  {
    nepali: 'खाना धेरै मिठो छ ! (Khana dherai mitho chha!)',
    bengali: 'খাবার খুব সুস্বাদু! (Khabar khub shushwadu!)',
    meaning: 'The food is very delicious!',
    pronunciation: 'Kah-nah dhay-rye mee-thoh chah!',
    tip: 'Praising home-cooked momos or organic dal-bhaat will light up your host’s face.'
  },
  {
    nepali: 'यसको कति पर्छ ? (Yasko kati parchha?)',
    bengali: 'এটার দাম কত? (Etar daam koto?)',
    meaning: 'How much does this cost?',
    pronunciation: 'Yahs-koh kah-tee pahr-chah?',
    tip: 'Use when buying handcrafted souvenirs, woollens, or Darjeeling tea packs.'
  },
  {
    nepali: 'धन्यवाद ! (Dhanyabad!)',
    bengali: 'ধন্যবাদ! (Dhonnobad!)',
    meaning: 'Thank you very much!',
    pronunciation: 'Dhan-yah-bahd!',
    tip: 'A polite way to show gratitude to drivers, porters, and tea shop owners.'
  },
  {
    nepali: 'एक कप तातो चिया दिनुहोस् ! (Ek cup tato chiya dinuhos!)',
    bengali: 'এক কাপ গরম চা দিন! (Ek cup gorom cha din!)',
    meaning: 'Please give me a cup of hot tea!',
    pronunciation: 'Ayk cup tah-toh chee-yah dee-noo-hohs!',
    tip: 'Essential phrase at roadside misty mountain stalls during chilly drives.'
  }
];

const ETIQUETTE_RULES = [
  {
    icon: 'fas fa-arrows-spin text-gold',
    title: 'Clockwise Around Stupas & Prayer Wheels',
    desc: 'In Himalayan Buddhist culture, always walk clockwise (sunwise) around monasteries, chortens, and stupas. Rotate prayer wheels clockwise with your right hand.'
  },
  {
    icon: 'fas fa-shoe-prints text-teal',
    title: 'Remove Shoes & Headwear in Prayer Halls',
    desc: 'Before entering monastery sanctums, remove footwear and hats. Speak in gentle hushed tones and avoid pointing fingers or feet directly toward Buddha statues.'
  },
  {
    icon: 'fas fa-camera-slash text-red',
    title: 'No Photography at Army Checkposts',
    desc: 'Photography, videography, and drone flying are strictly prohibited at Sevoke bridge, border checkposts (Rangpo, Melli), and all army installations near Nathula Pass.'
  },
  {
    icon: 'fas fa-recycle text-green',
    title: '100% Organic & Plastic-Free Hills',
    desc: 'Sikkim is a completely organic state with strict anti-littering laws. MG Marg in Gangtok is a vehicle-free and smoke-free zone. Carry your trash back to your hotel.'
  }
];

const HimalayanCulturalGuide = () => {
  const [activeTab, setActiveTab] = useState('phrasebook');

  return (
    <section className="cultural-guide-section" id="culture-guide">
      <div className="section-title">
        <span className="sub-heading">
          <i className="fas fa-heart text-red"></i> Respect & Connect
        </span>
        <h2 className="heading-title">Himalayan Cultural Etiquette & Pocket Phrasebook</h2>
        <p className="section-desc">
          Travel like a local and connect with warm Himalayan communities. Learn basic hill phrases and discover mindful monastery etiquette.
        </p>
      </div>

      <div className="culture-tabs-bar">
        <button
          type="button"
          className={`culture-tab-btn ${activeTab === 'phrasebook' ? 'active' : ''}`}
          onClick={() => setActiveTab('phrasebook')}
        >
          <i className="fas fa-book-open"></i> Pocket Hill Phrasebook (Nepali & Bengali)
        </button>

        <button
          type="button"
          className={`culture-tab-btn ${activeTab === 'etiquette' ? 'active' : ''}`}
          onClick={() => setActiveTab('etiquette')}
        >
          <i className="fas fa-hands-praying"></i> Sacred Mountain & Monastery Etiquette
        </button>
      </div>

      {activeTab === 'phrasebook' && (
        <div className="phrasebook-cards-grid">
          {PHRASES.map((item, idx) => (
            <div key={idx} className="phrase-card">
              <div className="phrase-badge">Phrase {idx + 1}</div>
              <h4 className="phrase-meaning">"{item.meaning}"</h4>
              
              <div className="phrase-lang-row">
                <span className="lang-label">Nepali:</span>
                <strong className="lang-text text-teal">{item.nepali}</strong>
              </div>

              <div className="phrase-lang-row">
                <span className="lang-label">Bengali:</span>
                <strong className="lang-text">{item.bengali}</strong>
              </div>

              <div className="phrase-pronounce-box">
                <i className="fas fa-volume-high text-yellow"></i>
                <span>Say: <em>{item.pronunciation}</em></span>
              </div>

              <p className="phrase-tip-text">
                <i className="fas fa-lightbulb text-gold"></i> {item.tip}
              </p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'etiquette' && (
        <div className="etiquette-cards-grid">
          {ETIQUETTE_RULES.map((rule, idx) => (
            <div key={idx} className="etiquette-card">
              <div className="etiquette-icon-wrap">
                <i className={rule.icon}></i>
              </div>
              <h4>{rule.title}</h4>
              <p>{rule.desc}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default HimalayanCulturalGuide;
