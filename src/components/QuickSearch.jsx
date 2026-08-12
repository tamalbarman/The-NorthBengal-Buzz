import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuickSearch = () => {
  const [destination, setDestination] = useState('');
  const [category, setCategory] = useState('all');
  const [budget, setBudget] = useState('all');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.append('search', destination);
    if (category !== 'all') params.append('category', category);
    if (budget !== 'all') params.append('budget', budget);
    navigate(`/package?${params.toString()}`);
  };

  return (
    <section className="quick-search-section">
      <form className="search-bar-card" onSubmit={handleSearch}>
        <div className="search-field">
          <i className="fas fa-location-dot"></i>
          <div className="input-wrap">
            <label>Destination</label>
            <input
              type="text"
              placeholder="Where do you want to explore? (e.g. Darjeeling, Kalimpong)"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
        </div>
        <div className="search-field">
          <i className="fas fa-mountain-sun"></i>
          <div className="input-wrap">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="all">All Experiences</option>
              <option value="trekking">Trekking & Hiking</option>
              <option value="offbeat">Offbeat & Nature</option>
              <option value="wildlife">Wildlife & Safari</option>
              <option value="hillstation">Hill Stations</option>
            </select>
          </div>
        </div>
        <div className="search-field">
          <i className="fas fa-wallet"></i>
          <div className="input-wrap">
            <label>Budget Range</label>
            <select value={budget} onChange={(e) => setBudget(e.target.value)}>
              <option value="all">Any Budget</option>
              <option value="budget">Budget (Under ₹10,000)</option>
              <option value="standard">Standard (₹10,000 - ₹25,000)</option>
              <option value="luxury">Luxury (₹25,000+)</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn-search">
          <i className="fas fa-search"></i> Search
        </button>
      </form>
    </section>
  );
};

export default QuickSearch;
