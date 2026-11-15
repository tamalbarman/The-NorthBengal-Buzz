import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PackageCard from '../components/PackageCard';
import { useCMS } from '../context/CMSContext';

const PackagesPage = () => {
  const { packages } = useCMS();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';
  const selectedBudget = searchParams.get('budget') || 'all';

  useEffect(() => {
    document.title = 'Tour Packages | The Northbengal Buzz - Darjeeling, Sikkim & Dooars';
  }, []);

  const updateFilters = (newCat, newSearch, newBudget) => {
    const params = new URLSearchParams();
    const cat = newCat !== undefined ? newCat : activeCategory;
    const srch = newSearch !== undefined ? newSearch : searchQuery;
    const bdgt = newBudget !== undefined ? newBudget : selectedBudget;

    if (cat && cat !== 'all') params.set('category', cat);
    if (srch) params.set('search', srch);
    if (bdgt && bdgt !== 'all') params.set('budget', bdgt);
    setSearchParams(params);
  };

  const filteredPackages = packages.filter((pkg) => {
    const matchesCategory = activeCategory === 'all' || pkg.category === activeCategory;
    const matchesSearch = !searchQuery || pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) || pkg.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesBudget = true;
    const priceNum = pkg.numericPrice || 10000;
    if (selectedBudget === 'budget') matchesBudget = priceNum < 10000;
    else if (selectedBudget === 'standard') matchesBudget = priceNum >= 10000 && priceNum <= 25000;
    else if (selectedBudget === 'luxury') matchesBudget = priceNum > 25000;

    return matchesCategory && matchesSearch && matchesBudget;
  });

  return (
    <div className="packages-page">
      {/* Page Header Banner */}
      <div
        className="heading"
        style={{
          background: "linear-gradient(135deg, rgba(15,23,42,0.7) 0%, rgba(2,128,144,0.6) 100%), url('/assets/images/home-slide-4.jpg') no-repeat center/cover"
        }}
      >
        <h1>tour packages</h1>
      </div>

      {/* Catalog Filter Controls */}
      <section className="catalog-filter-section">
        <div className="catalog-controls">
          <div className="search-input-wrap">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search by destination or landmark (e.g., Sandakphu, Darjeeling, Safari)..."
              value={searchQuery}
              onChange={(e) => updateFilters(undefined, e.target.value, undefined)}
            />
          </div>

          <div className="filter-pills">
            <button className={`pill ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => updateFilters('all')}>
              All Categories
            </button>
            <button className={`pill ${activeCategory === 'trekking' ? 'active' : ''}`} onClick={() => updateFilters('trekking')}>
              <i className="fas fa-hiking"></i> Trekking
            </button>
            <button className={`pill ${activeCategory === 'offbeat' ? 'active' : ''}`} onClick={() => updateFilters('offbeat')}>
              <i className="fas fa-leaf"></i> Offbeat Stays
            </button>
            <button className={`pill ${activeCategory === 'hillstation' ? 'active' : ''}`} onClick={() => updateFilters('hillstation')}>
              <i className="fas fa-mountain"></i> Hill Stations
            </button>
            <button className={`pill ${activeCategory === 'wildlife' ? 'active' : ''}`} onClick={() => updateFilters('wildlife')}>
              <i className="fas fa-paw"></i> Wildlife Safari
            </button>
            <button className={`pill ${activeCategory === 'sikkim' ? 'active' : ''}`} onClick={() => updateFilters('sikkim')}>
              <i className="fas fa-gopuram"></i> Sikkim
            </button>
          </div>

          <div className="filter-pills" style={{ marginTop: '1rem' }}>
            <span style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <i className="fas fa-wallet"></i> Budget:
            </span>
            <button className={`pill ${selectedBudget === 'all' ? 'active' : ''}`} onClick={() => updateFilters(undefined, undefined, 'all')}>
              Any Budget
            </button>
            <button className={`pill ${selectedBudget === 'budget' ? 'active' : ''}`} onClick={() => updateFilters(undefined, undefined, 'budget')}>
              Budget (&lt; ₹10k)
            </button>
            <button className={`pill ${selectedBudget === 'standard' ? 'active' : ''}`} onClick={() => updateFilters(undefined, undefined, 'standard')}>
              Standard (₹10k - ₹25k)
            </button>
            <button className={`pill ${selectedBudget === 'luxury' ? 'active' : ''}`} onClick={() => updateFilters(undefined, undefined, 'luxury')}>
              Luxury (₹25k+)
            </button>
          </div>
        </div>
      </section>

      {/* Package Grid */}
      <section className="packages">
        <div className="section-title">
          <span className="sub-heading">Explore Himalayan Itineraries</span>
          <h2 className="heading-title">Available Tour Packages ({filteredPackages.length})</h2>
        </div>

        {filteredPackages.length > 0 ? (
          <div className="box-container">
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--bg-card)', borderRadius: '20px', border: '1px solid var(--border-light)' }}>
            <i className="fas fa-compass-drafting text-teal" style={{ fontSize: '4rem', marginBottom: '1.5rem' }}></i>
            <h3>No packages match your search criteria.</h3>
            <p style={{ fontSize: '1.5rem', color: 'var(--text-muted)', marginTop: '0.8rem' }}>Try clearing your search query or selecting a different category filter.</p>
            <button className="btn btn-primary" style={{ marginTop: '2rem' }} onClick={() => updateFilters('all', '', 'all')}>
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default PackagesPage;
