import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

const AdminPage = () => {
  const {
    packages,
    addPackage,
    updatePackage,
    deletePackage,
    reviews,
    approveReview,
    rejectReview,
    visitorMedia,
    approveVisitorMedia,
    rejectVisitorMedia,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin
  } = useCMS();

  // Auth State
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab State
  const [activeTab, setActiveTab] = useState('packages');

  // Change Admin Password State
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [securitySuccess, setSecuritySuccess] = useState('');
  const [securityError, setSecurityError] = useState('');

  // Package Modal State
  const [showPkgModal, setShowPkgModal] = useState(false);
  const [editingPkgId, setEditingPkgId] = useState(null);
  const [pkgFormData, setPkgFormData] = useState({
    title: '',
    category: 'offbeat',
    originalPrice: '',
    discountPercent: 0,
    duration: '3 Days / 2 Nights',
    tag: 'Popular',
    tagIcon: 'fas fa-leaf',
    image: '/assets/images/img-13.jpg',
    description: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    const success = await loginAdmin(passwordInput);
    if (!success) {
      setAuthError('Invalid Admin Password. (Default password: admin123)');
    } else {
      setPasswordInput('');
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setSecurityError('');
    setSecuritySuccess('');

    if (currentPwd !== 'admin123' && currentPwd !== 'admin') {
      setSecurityError('Current password entered is incorrect.');
      return;
    }
    if (newPwd.length < 6) {
      setSecurityError('New password must be at least 6 characters long.');
      return;
    }

    setSecuritySuccess('Admin Security Credentials Updated Successfully!');
    setCurrentPwd('');
    setNewPwd('');
    setTimeout(() => {
      setShowSecurityModal(false);
      setSecuritySuccess('');
    }, 2500);
  };

  // Package Form handlers
  const openNewPkgModal = () => {
    setEditingPkgId(null);
    setPkgFormData({
      title: '',
      category: 'offbeat',
      originalPrice: '12000',
      discountPercent: 15,
      duration: '3 Days / 2 Nights',
      tag: 'Offbeat',
      tagIcon: 'fas fa-leaf',
      image: '/assets/images/img-14.jpg',
      description: ''
    });
    setShowPkgModal(true);
  };

  const openEditPkgModal = (pkg) => {
    setEditingPkgId(pkg.id);
    setPkgFormData({
      title: pkg.title,
      category: pkg.category || 'offbeat',
      originalPrice: pkg.originalPrice || pkg.numericPrice || 10000,
      discountPercent: pkg.discountPercent || 0,
      duration: pkg.duration || '3 Days / 2 Nights',
      tag: pkg.tag || 'Featured',
      tagIcon: pkg.tagIcon || 'fas fa-star',
      image: pkg.image || '/assets/images/img-13.jpg',
      description: pkg.description || ''
    });
    setShowPkgModal(true);
  };

  const handlePkgSubmit = (e) => {
    e.preventDefault();
    if (!pkgFormData.title.trim() || !pkgFormData.originalPrice) {
      alert('Please fill out all required fields.');
      return;
    }

    if (editingPkgId) {
      updatePackage(editingPkgId, pkgFormData);
    } else {
      addPackage(pkgFormData);
    }
    setShowPkgModal(false);
  };

  // If not logged in, render Admin Login view
  if (!isAdminLoggedIn) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-box">
          <div className="login-header">
            <div className="admin-icon-ring">
              <i className="fas fa-user-shield"></i>
            </div>
            <h2>The NorthBengal Buzz</h2>
            <p>Admin CMS Control Portal Login</p>
          </div>
          
          <form onSubmit={handleLogin} className="admin-login-form">
            {authError && <div className="alert alert-danger">{authError}</div>}
            <div className="form-group">
              <label><i className="fas fa-lock"></i> Admin Password</label>
              <input
                type="password"
                placeholder="Enter password (default: admin123)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required
                autoFocus
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              <i className="fas fa-sign-in-alt"></i> Login to Admin Panel
            </button>
            <div className="login-hint">
              <span>Demo Login Password: <code>admin123</code></span>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const pendingReviewsCount = reviews.filter((r) => r.status === 'pending').length;
  const pendingMediaCount = visitorMedia.filter((m) => m.status === 'pending').length;
  const discountedPkgCount = packages.filter((p) => (p.discountPercent || 0) > 0).length;

  return (
    <div className="admin-dashboard-page">
      {/* Top Bar Header */}
      <header className="admin-navbar">
        <div className="brand">
          <i className="fas fa-sliders-h text-teal"></i>
          <span>The NorthBengal Buzz <strong>CMS Admin</strong></span>
        </div>
        <div className="user-profile">
          <span className="admin-badge"><i className="fas fa-shield-alt"></i> Administrator</span>
          <button
            onClick={() => setShowSecurityModal(true)}
            className="btn btn-sm btn-outline-light"
            style={{ marginRight: '1rem' }}
          >
            <i className="fas fa-key"></i> Security
          </button>
          <button onClick={logoutAdmin} className="btn btn-sm btn-outline-danger">
            <i className="fas fa-power-off"></i> Logout
          </button>
        </div>
      </header>

      <div className="admin-content-container">
        {/* KPI Dashboard Summary Cards */}
        <div className="admin-stats-grid">
          <div className="stat-card blue">
            <div className="stat-icon"><i className="fas fa-box-open"></i></div>
            <div className="stat-details">
              <h3>{packages.length}</h3>
              <p>Total Tour Packages</p>
              <span className="sub-stat">{discountedPkgCount} Packages with Discount</span>
            </div>
          </div>

          <div className="stat-card yellow">
            <div className="stat-icon"><i className="fas fa-star"></i></div>
            <div className="stat-details">
              <h3>{reviews.length}</h3>
              <p>Total Ratings & Reviews</p>
              <span className="sub-stat text-warning">{pendingReviewsCount} Pending Moderation</span>
            </div>
          </div>

          <div className="stat-card green">
            <div className="stat-icon"><i className="fas fa-images"></i></div>
            <div className="stat-details">
              <h3>{visitorMedia.length}</h3>
              <p>Visitor Upload Entries</p>
              <span className="sub-stat text-warning">{pendingMediaCount} Pending Moderation</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'packages' ? 'active' : ''}`}
            onClick={() => setActiveTab('packages')}
          >
            <i className="fas fa-map-marked-alt"></i> Packages CMS & Discounts ({packages.length})
          </button>

          <button
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            <i className="fas fa-comments"></i> Ratings Moderation {pendingReviewsCount > 0 && <span className="badge-pending">{pendingReviewsCount}</span>}
          </button>

          <button
            className={`tab-btn ${activeTab === 'media' ? 'active' : ''}`}
            onClick={() => setActiveTab('media')}
          >
            <i className="fas fa-photo-video"></i> Visitor Media (Max 3) {pendingMediaCount > 0 && <span className="badge-pending">{pendingMediaCount}</span>}
          </button>
        </div>

        {/* TAB 1: PACKAGES CRUD & DISCOUNTS */}
        {activeTab === 'packages' && (
          <div className="admin-tab-pane">
            <div className="pane-header">
              <div>
                <h3>Manage Tour Packages & Pricing</h3>
                <p>Add new travel packages, set original prices and special percentage discounts.</p>
              </div>
              <button className="btn btn-primary" onClick={openNewPkgModal}>
                <i className="fas fa-plus-circle"></i> Add New Package
              </button>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Package Image</th>
                    <th>Package Title</th>
                    <th>Category</th>
                    <th>Original Price</th>
                    <th>Discount %</th>
                    <th>Final Sale Price</th>
                    <th>Duration</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {packages.map((pkg) => {
                    const orig = pkg.originalPrice || pkg.numericPrice;
                    const discount = pkg.discountPercent || 0;
                    const salePrice = pkg.numericPrice;
                    return (
                      <tr key={pkg.id}>
                        <td>
                          <img src={pkg.image} alt={pkg.title} className="table-thumb" />
                        </td>
                        <td>
                          <strong>{pkg.title}</strong>
                          <br />
                          <small className="text-muted">{pkg.tag}</small>
                        </td>
                        <td><span className="category-pill">{pkg.category}</span></td>
                        <td>₹{Number(orig).toLocaleString('en-IN')}</td>
                        <td>
                          {discount > 0 ? (
                            <span className="discount-badge">{discount}% OFF</span>
                          ) : (
                            <span className="text-muted">No Discount</span>
                          )}
                        </td>
                        <td><strong className="text-teal">₹{salePrice.toLocaleString('en-IN')}</strong></td>
                        <td>{pkg.duration}</td>
                        <td>
                          <div className="table-btn-group">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => openEditPkgModal(pkg)}
                              title="Edit package price and details"
                            >
                              <i className="fas fa-edit"></i> Edit
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to delete "${pkg.title}"?`)) {
                                  deletePackage(pkg.id);
                                }
                              }}
                              title="Delete package"
                            >
                              <i className="fas fa-trash-alt"></i> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: RATINGS & REVIEWS MODERATION */}
        {activeTab === 'reviews' && (
          <div className="admin-tab-pane">
            <div className="pane-header">
              <div>
                <h3>Visitor Ratings & Reviews Moderation</h3>
                <p>Approve or reject visitor ratings before they appear publicly on the website.</p>
              </div>
            </div>

            <div className="admin-reviews-list">
              {reviews.length > 0 ? (
                reviews.map((rev) => (
                  <div className={`admin-review-item ${rev.status}`} key={rev.id}>
                    <div className="rev-left">
                      <div className="rev-title-row">
                        <h4>{rev.name}</h4>
                        <span className="user-loc"><i className="fas fa-map-marker-alt text-teal"></i> {rev.location}</span>
                        <span className={`status-pill ${rev.status}`}>
                          {rev.status === 'approved' ? '✓ Approved' : '⏳ Pending Approval'}
                        </span>
                      </div>

                      <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <i
                            key={star}
                            className={`fas fa-star ${star <= rev.rating ? 'text-yellow' : 'text-gray'}`}
                          ></i>
                        ))}
                        <span className="rating-num">({rev.rating}/5)</span>
                      </div>

                      <p className="rev-body">"{rev.comment}"</p>
                      
                      <div className="rev-meta">
                        {rev.packageName && <span>Package: <strong>{rev.packageName}</strong></span>}
                        <span>Submitted on: {rev.date}</span>
                      </div>
                    </div>

                    <div className="rev-actions">
                      {rev.status === 'pending' && (
                        <button
                          className="btn btn-success"
                          onClick={() => approveReview(rev.id)}
                        >
                          <i className="fas fa-check-circle"></i> Approve Review
                        </button>
                      )}
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => {
                          if (window.confirm('Delete this review?')) {
                            rejectReview(rev.id);
                          }
                        }}
                      >
                        <i className="fas fa-trash-alt"></i> Reject / Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted">No reviews submitted yet.</p>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: VISITOR MEDIA MODERATION (STRICT 3 PHOTO STORAGE ENFORCED) */}
        {activeTab === 'media' && (
          <div className="admin-tab-pane">
            <div className="pane-header">
              <div>
                <h3>Visitor Photo Gallery Submissions (Max 3 Photos Limit)</h3>
                <p>Review visitor uploaded travel photos before featuring them in the public website gallery.</p>
              </div>
            </div>

            <div className="admin-media-grid">
              {visitorMedia.length > 0 ? (
                visitorMedia.map((item) => (
                  <div className={`admin-media-card ${item.status}`} key={item.id}>
                    <div className="media-header">
                      <div>
                        <h4>{item.authorName}</h4>
                        <span className="loc"><i className="fas fa-map-marker-alt text-teal"></i> {item.location}</span>
                      </div>
                      <span className={`status-pill ${item.status}`}>
                        {item.status === 'approved' ? '✓ Approved' : '⏳ Pending Approval'}
                      </span>
                    </div>

                    <p className="caption">{item.caption || 'No caption provided'}</p>

                    {/* Render up to 3 thumbnails */}
                    <div className="media-thumbs-grid">
                      {item.photos.map((photoUrl, pIdx) => (
                        <div className="thumb-box" key={pIdx}>
                          <img src={photoUrl} alt={`Upload ${pIdx + 1}`} />
                        </div>
                      ))}
                    </div>

                    <div className="media-meta-row">
                      <span className="photo-count-pill"><i className="fas fa-images"></i> {item.photos.length}/3 Storage Slots Used</span>
                      <span className="date">{item.uploadDate}</span>
                    </div>

                    <div className="media-actions">
                      {item.status === 'pending' && (
                        <button
                          className="btn btn-success btn-block"
                          onClick={() => approveVisitorMedia(item.id)}
                        >
                          <i className="fas fa-check-circle"></i> Approve & Publish to Website
                        </button>
                      )}
                      <button
                        className="btn btn-outline-danger btn-block"
                        onClick={() => {
                          if (window.confirm('Delete this visitor photo submission?')) {
                            rejectVisitorMedia(item.id);
                          }
                        }}
                      >
                        <i className="fas fa-trash-alt"></i> Reject / Remove Photos
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted">No visitor photos uploaded yet.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* SECURITY SETTINGS MODAL */}
      {showSecurityModal && (
        <div className="modal-backdrop" onClick={() => setShowSecurityModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3><i className="fas fa-key text-teal"></i> Admin Password Security</h3>
              <button className="close-btn" onClick={() => setShowSecurityModal(false)}>&times;</button>
            </div>

            {securitySuccess ? (
              <div className="alert alert-success">
                <i className="fas fa-check-circle" style={{ fontSize: '2rem' }}></i>
                <p>{securitySuccess}</p>
              </div>
            ) : (
              <form onSubmit={handlePasswordChange}>
                {securityError && <div className="alert alert-danger">{securityError}</div>}
                
                <div className="form-group">
                  <label>Current Admin Password *</label>
                  <input
                    type="password"
                    placeholder="Current password (admin123)"
                    value={currentPwd}
                    onChange={(e) => setCurrentPwd(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>New Admin Password *</label>
                  <input
                    type="password"
                    placeholder="Enter new strong password"
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                    required
                  />
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowSecurityModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update Password
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ADD / EDIT PACKAGE MODAL */}
      {showPkgModal && (
        <div className="modal-backdrop" onClick={() => setShowPkgModal(false)}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingPkgId ? '✏️ Edit Tour Package & Discount' : '➕ Add New Tour Package'}</h3>
              <button className="close-btn" onClick={() => setShowPkgModal(false)}>&times;</button>
            </div>

            <form onSubmit={handlePkgSubmit} className="package-admin-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Package Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. Mirik Lake & Orange Valley Homestay"
                    value={pkgFormData.title}
                    onChange={(e) => setPkgFormData({ ...pkgFormData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    value={pkgFormData.category}
                    onChange={(e) => setPkgFormData({ ...pkgFormData, category: e.target.value })}
                  >
                    <option value="trekking">Trekking</option>
                    <option value="offbeat">Offbeat Homestay</option>
                    <option value="hillstation">Hill Station</option>
                    <option value="wildlife">Wildlife Safari</option>
                    <option value="sikkim">Sikkim Tour</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Original Price (₹) *</label>
                  <input
                    type="number"
                    placeholder="15000"
                    value={pkgFormData.originalPrice}
                    onChange={(e) => setPkgFormData({ ...pkgFormData, originalPrice: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Discount Percentage (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="90"
                    placeholder="e.g. 15"
                    value={pkgFormData.discountPercent}
                    onChange={(e) => setPkgFormData({ ...pkgFormData, discountPercent: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Calculated Final Sale Price</label>
                  <div className="calculated-price-box">
                    ₹{pkgFormData.discountPercent > 0
                      ? Math.round(Number(pkgFormData.originalPrice || 0) * (1 - Number(pkgFormData.discountPercent) / 100)).toLocaleString('en-IN')
                      : Number(pkgFormData.originalPrice || 0).toLocaleString('en-IN')
                    }
                    {pkgFormData.discountPercent > 0 && <span className="discount-tag">({pkgFormData.discountPercent}% OFF)</span>}
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Duration *</label>
                  <input
                    type="text"
                    placeholder="e.g. 4 Days / 3 Nights"
                    value={pkgFormData.duration}
                    onChange={(e) => setPkgFormData({ ...pkgFormData, duration: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Highlight Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. Eco Stay, Best Seller"
                    value={pkgFormData.tag}
                    onChange={(e) => setPkgFormData({ ...pkgFormData, tag: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  placeholder="/assets/images/img-13.jpg or https://..."
                  value={pkgFormData.image}
                  onChange={(e) => setPkgFormData({ ...pkgFormData, image: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Package Description</label>
                <textarea
                  rows="3"
                  placeholder="Detailed package description, highlights, inclusion details..."
                  value={pkgFormData.description}
                  onChange={(e) => setPkgFormData({ ...pkgFormData, description: e.target.value })}
                ></textarea>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowPkgModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <i className="fas fa-save"></i> Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
