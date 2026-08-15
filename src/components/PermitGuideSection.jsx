import React, { useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';

const PERMIT_DATA = {
  nathula: {
    title: 'Nathula Pass (Indo-China Border - 14,140 ft)',
    requiredFor: 'Indian Citizens Only (Closed for Foreign Tourists)',
    documents: ['Valid Voter ID Card or Original Passport', '2 Recent Passport Size Photographs', 'Vehicle Army Permit Token'],
    notice: 'Permits must be applied 24 hours prior to travel. Closed on Mondays.',
    permitFee: '₹250 - ₹450 / person'
  },
  tsomgo: {
    title: 'Tsomgo Glacial Lake & Baba Mandir (12,400 ft)',
    requiredFor: 'Indian & Foreign Tourists (Foreigners require group of min 2)',
    documents: ['Voter ID Card or Passport', '2 Passport Size Photographs'],
    notice: 'Permits issued at Gangtok Police Check Post.',
    permitFee: '₹150 - ₹300 / person'
  },
  north_sikkim: {
    title: 'North Sikkim (Lachen, Lachung, Yumthang & Gurudongmar)',
    requiredFor: 'Indian & Foreign Tourists (PAP Protected Area Permit)',
    documents: ['Voter ID Card or Passport', '4 Passport Size Photographs', 'Medical Fitness Certificate for Gurudongmar (17,800 ft)'],
    notice: 'Requires registered Gangtok tour operator booking.',
    permitFee: 'Included in Tour Package'
  },
  zuluk: {
    title: 'Zuluk Silk Route & Gnathang Valley (13,000 ft)',
    requiredFor: 'Indian Citizens (Restricted Border Belt)',
    documents: ['Voter ID Card or Passport', '2 Passport Size Photographs'],
    notice: 'Permits issued at Rongli Checkpost.',
    permitFee: '₹200 / person'
  },
  sandakphu: {
    title: 'Sandakphu & Singalila National Park Entry',
    requiredFor: 'All Trekkers & Land Rover Travelers',
    documents: ['Govt ID Proof (Aadhaar / Voter ID / Passport)', 'Forest Department Entry Ticket'],
    notice: 'Issued at Manebhanjan Forest Checkpost.',
    permitFee: '₹200 / person + Camera Fee'
  }
};

const PermitGuideSection = () => {
  const [selectedDest, setSelectedDest] = useState('nathula');
  const info = PERMIT_DATA[selectedDest];

  const handlePermitInquiry = () => {
    const msg = `Hi! I need help with Sikkim/Border Travel Permits for:
📍 Destination: ${info.title}
❓ Eligibility: ${info.requiredFor}
📋 Documents I have: Voter ID / Passport & Photos
Please guide me on permit processing and booking.`;

    const whatsappUrl = SITE_CONFIG.getWhatsAppUrl(msg);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="permit-guide-section" id="permits">
      <div className="section-title">
        <span className="sub-heading"><i className="fas fa-file-contract text-teal"></i> Official Travel Logistics</span>
        <h2 className="heading-title">Sikkim & Restricted Border Permit Assistance</h2>
        <p className="section-desc">Traveling to Nathula Pass, Yumthang, or Zuluk? Check exact permit rules and get hassle-free permit processing.</p>
      </div>

      <div className="permit-container-card">
        {/* Navigation Tabs */}
        <div className="permit-tabs">
          <button className={`p-tab ${selectedDest === 'nathula' ? 'active' : ''}`} onClick={() => setSelectedDest('nathula')}>
            <i className="fas fa-flag"></i> Nathula Pass
          </button>
          <button className={`p-tab ${selectedDest === 'tsomgo' ? 'active' : ''}`} onClick={() => setSelectedDest('tsomgo')}>
            <i className="fas fa-water"></i> Tsomgo Lake
          </button>
          <button className={`p-tab ${selectedDest === 'north_sikkim' ? 'active' : ''}`} onClick={() => setSelectedDest('north_sikkim')}>
            <i className="fas fa-mountain"></i> North Sikkim
          </button>
          <button className={`p-tab ${selectedDest === 'zuluk' ? 'active' : ''}`} onClick={() => setSelectedDest('zuluk')}>
            <i className="fas fa-route"></i> Zuluk Silk Route
          </button>
          <button className={`p-tab ${selectedDest === 'sandakphu' ? 'active' : ''}`} onClick={() => setSelectedDest('sandakphu')}>
            <i className="fas fa-hiking"></i> Sandakphu Park
          </button>
        </div>

        {/* Selected Permit Details View */}
        <div className="permit-details-body">
          <div className="permit-main-info">
            <h3>{info.title}</h3>
            <div className="eligibility-tag"><i className="fas fa-user-check"></i> {info.requiredFor}</div>

            <div className="doc-checklist-box">
              <h4><i className="fas fa-clipboard-list text-teal"></i> Mandatory Document Checklist:</h4>
              <ul>
                {info.documents.map((doc, idx) => (
                  <li key={idx}><i className="fas fa-check-circle text-green"></i> {doc}</li>
                ))}
              </ul>
            </div>

            <div className="permit-notice-alert">
              <i className="fas fa-exclamation-triangle text-warning"></i> <strong>Important Note:</strong> {info.notice}
            </div>
          </div>

          <div className="permit-action-card">
            <div className="fee-box">
              <span>Estimated Permit Fee</span>
              <strong>{info.permitFee}</strong>
            </div>

            <p>Don't want to stand in long police queues in Gangtok? We handle complete document verification & Army permit processing for our guests!</p>

            <button onClick={handlePermitInquiry} className="btn btn-primary btn-block">
              <i className="fab fa-whatsapp"></i> Apply for Permit Assistance
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PermitGuideSection;
