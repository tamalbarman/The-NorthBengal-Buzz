import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

const RatingReviewSection = () => {
  const { approvedReviews, submitReview, avgRating, totalApprovedReviewsCount } = useCMS();
  const [showModal, setShowModal] = useState(false);
  const [starFilter, setStarFilter] = useState('all'); // Star rating filter state
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: 5,
    comment: '',
    packageName: ''
  });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const filteredReviews = starFilter === 'all'
    ? approvedReviews
    : approvedReviews.filter((r) => r.rating === Number(starFilter));

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.comment.trim()) {
      setErrorMsg('Please enter your name and review message.');
      return;
    }

    try {
      submitReview(formData);
      setSuccessMsg('Thank you! Your rating and review has been submitted for Admin verification and will appear on the site once approved.');
      setFormData({ name: '', location: '', rating: 5, comment: '', packageName: '' });
      setTimeout(() => {
        setShowModal(false);
        setSuccessMsg('');
      }, 3500);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to submit review.');
    }
  };

  return (
    <section className="rating-review-section" id="reviews">
      <div className="section-title">
        <span className="sub-heading"><i className="fas fa-star text-yellow"></i> Verified Guest Feedback</span>
        <h2 className="heading-title">Visitor Ratings & Travel Experiences</h2>
        <p className="section-desc">See what fellow travelers have to say about their Himalayan adventures with The NorthBengal Buzz!</p>
      </div>

      {/* Aggregate Score Header */}
      <div className="rating-summary-card">
        <div className="rating-score-box">
          <span className="big-rating">{avgRating}</span>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <i
                key={star}
                className={`fas fa-star ${star <= Math.round(Number(avgRating)) ? 'text-yellow' : 'text-gray'}`}
              ></i>
            ))}
          </div>
          <span className="rating-count">Based on {totalApprovedReviewsCount} verified reviews</span>
        </div>
        <div className="rating-cta">
          <h4>Have you traveled with us recently?</h4>
          <p>Share your honest experience and help other travelers plan their dream North Bengal getaway.</p>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <i className="fas fa-pen"></i> Leave a Rating & Review
          </button>
        </div>
      </div>

      {/* Star Rating Filter Pills */}
      <div className="review-star-pills">
        <span className="filter-label"><i className="fas fa-filter text-teal"></i> Filter Reviews:</span>
        <button
          className={`star-pill ${starFilter === 'all' ? 'active' : ''}`}
          onClick={() => setStarFilter('all')}
        >
          All ({approvedReviews.length})
        </button>
        <button
          className={`star-pill ${starFilter === '5' ? 'active' : ''}`}
          onClick={() => setStarFilter('5')}
        >
          <i className="fas fa-star text-yellow"></i> 5 Stars ({approvedReviews.filter(r => r.rating === 5).length})
        </button>
        <button
          className={`star-pill ${starFilter === '4' ? 'active' : ''}`}
          onClick={() => setStarFilter('4')}
        >
          <i className="fas fa-star text-yellow"></i> 4 Stars ({approvedReviews.filter(r => r.rating === 4).length})
        </button>
        <button
          className={`star-pill ${starFilter === '3' ? 'active' : ''}`}
          onClick={() => setStarFilter('3')}
        >
          <i className="fas fa-star text-yellow"></i> 3 Stars ({approvedReviews.filter(r => r.rating === 3).length})
        </button>
      </div>

      {/* Reviews Cards Grid */}
      <div className="reviews-grid">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((rev) => (
            <div className="review-card" key={rev.id}>
              <div className="rev-header">
                <div className="user-avatar">
                  {rev.name.charAt(0).toUpperCase()}
                </div>
                <div className="user-info">
                  <h5>{rev.name}</h5>
                  <span className="user-location"><i className="fas fa-map-marker-alt"></i> {rev.location}</span>
                </div>
                <div className="rev-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={`fas fa-star ${star <= rev.rating ? 'text-yellow' : 'text-gray'}`}
                    ></i>
                  ))}
                </div>
              </div>
              <p className="rev-comment">"{rev.comment}"</p>
              <div className="rev-footer">
                {rev.packageName && <span className="rev-pkg-tag"><i className="fas fa-suitcase"></i> {rev.packageName}</span>}
                <span className="rev-date">{rev.date}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="no-reviews-card">
            <i className="fas fa-star-half-alt text-teal" style={{ fontSize: '3rem', marginBottom: '1rem' }}></i>
            <p>No reviews match this star rating filter.</p>
          </div>
        )}
      </div>

      {/* Write Review Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3><i className="fas fa-star text-yellow"></i> Write a Rating & Review</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            
            {successMsg ? (
              <div className="alert alert-success">
                <i className="fas fa-check-circle" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></i>
                <p>{successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="review-form">
                {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                
                <div className="form-group">
                  <label>Select Rating Stars *</label>
                  <div className="star-picker">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        className={`star-btn ${star <= formData.rating ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, rating: star })}
                      >
                        <i className="fas fa-star"></i>
                      </button>
                    ))}
                    <span className="star-rating-label">{formData.rating} / 5 Stars</span>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Your City / Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Kolkata, WB"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Tour Package / Destination (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Sandakphu Trek or Darjeeling Homestay"
                    value={formData.packageName}
                    onChange={(e) => setFormData({ ...formData, packageName: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Your Review Message *</label>
                  <textarea
                    rows="4"
                    placeholder="Tell us about your trip experience, hospitality, views, or driver service..."
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    required
                  ></textarea>
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit Review for Verification
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default RatingReviewSection;
