import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

const VisitorGallerySection = () => {
  const { approvedVisitorMedia, submitVisitorMedia } = useCMS();
  const [showModal, setShowModal] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null); // Lightbox preview state
  const [formData, setFormData] = useState({
    authorName: '',
    location: '',
    caption: '',
    photos: []
  });
  const [selectedPreviews, setSelectedPreviews] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Handle Photo Selection with strict 3 max check
  const handleFileChange = (e) => {
    setErrorMsg('');
    const files = Array.from(e.target.files);

    if (files.length > 3) {
      setErrorMsg('⚠️ Storage Limit Exceeded: You can upload a MAXIMUM of 3 photos/videos per submission.');
    }

    const validFiles = files.slice(0, 3);
    const filePromises = validFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(filePromises).then((dataUrls) => {
      setFormData((prev) => ({ ...prev, photos: dataUrls }));
      setSelectedPreviews(dataUrls);
    });
  };

  const removePhoto = (index) => {
    const updated = [...formData.photos];
    updated.splice(index, 1);
    setFormData({ ...formData, photos: updated });
    setSelectedPreviews(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.photos || formData.photos.length === 0) {
      setErrorMsg('Please select at least 1 photo to upload.');
      return;
    }

    if (formData.photos.length > 3) {
      setErrorMsg('Upload limit exceeded! Maximum 3 photos allowed.');
      return;
    }

    try {
      submitVisitorMedia(formData);
      setSuccessMsg('✨ Photo memories submitted successfully! Your photos have been sent to the Admin for approval and will appear on the gallery once verified.');
      setFormData({ authorName: '', location: '', caption: '', photos: [] });
      setSelectedPreviews([]);
      setTimeout(() => {
        setShowModal(false);
        setSuccessMsg('');
      }, 3500);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to submit photos.');
    }
  };

  return (
    <section className="visitor-gallery-section" id="visitor-gallery">
      <div className="section-title">
        <span className="sub-heading"><i className="fas fa-camera text-teal"></i> Traveler Memories</span>
        <h2 className="heading-title">Visitor Photo & Experience Gallery</h2>
        <p className="section-desc">Snapshots shared directly by our visitors across North Bengal & Sikkim. Click any photo to view in HD Lightbox!</p>
      </div>

      {/* Upload Callout Header */}
      <div className="upload-cta-banner">
        <div className="cta-info">
          <h3><i className="fas fa-cloud-upload-alt text-teal"></i> Have travel photos from your trip?</h3>
          <p>We provide <strong>3 Photo Storage slots</strong> per visitor! Share your best shots of mountain peaks, tea gardens, or forest safaris.</p>
        </div>
        <button className="btn btn-accent" onClick={() => setShowModal(true)}>
          <i className="fas fa-file-upload"></i> Share Your Photos (Max 3)
        </button>
      </div>

      {/* Approved Gallery Grid */}
      <div className="gallery-masonry">
        {approvedVisitorMedia.length > 0 ? (
          approvedVisitorMedia.map((item) => (
            <div className="gallery-card" key={item.id}>
              <div className="card-photos-grid" data-count={item.photos.length}>
                {item.photos.map((photoUrl, pIdx) => (
                  <div
                    className="photo-frame clickable"
                    key={pIdx}
                    onClick={() => setLightboxImg({ url: photoUrl, author: item.authorName, caption: item.caption })}
                    title="Click to expand full resolution image"
                  >
                    <img src={photoUrl} alt={`Uploaded by ${item.authorName}`} />
                    <div className="zoom-overlay"><i className="fas fa-search-plus"></i></div>
                  </div>
                ))}
              </div>
              <div className="gallery-card-info">
                <h4>{item.caption || 'Himalayan Explorer Snapshot'}</h4>
                <div className="author-row">
                  <span><i className="fas fa-user-circle"></i> {item.authorName}</span>
                  <span><i className="fas fa-map-marker-alt text-teal"></i> {item.location}</span>
                  <span className="photo-count-badge"><i className="fas fa-images"></i> {item.photos.length}/3 photos</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-photos-box">
            <i className="fas fa-camera-retro text-teal" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}></i>
            <p>No visitor photos approved yet. Be the first traveler to share your trip photos!</p>
          </div>
        )}
      </div>

      {/* LIGHTBOX FULL-SCREEN MODAL PREVIEW */}
      {lightboxImg && (
        <div className="lightbox-backdrop" onClick={() => setLightboxImg(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightboxImg(null)}>&times;</button>
            <img src={lightboxImg.url} alt="Full resolution visitor travel memory" />
            <div className="lightbox-caption">
              <h4>{lightboxImg.caption || 'Himalayan Travel Snapshot'}</h4>
              <p><i className="fas fa-camera"></i> Photo shared by <strong>{lightboxImg.author}</strong></p>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal (Strict 3 Photo Storage limit) */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3><i className="fas fa-images text-teal"></i> Share Visitor Photos (Max 3)</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
            </div>

            {successMsg ? (
              <div className="alert alert-success">
                <i className="fas fa-check-circle" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></i>
                <p>{successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="upload-form">
                {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

                <div className="storage-info-badge">
                  <i className="fas fa-info-circle text-teal"></i> Free visitor storage allowance: <strong>Strictly 3 photos or videos</strong> per upload submission.
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Sourav & Friends"
                      value={formData.authorName}
                      onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Trip Location / Destination *</label>
                    <input
                      type="text"
                      placeholder="e.g. Kalimpong or Gorumara Forest"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Photo Caption / Short Experience</label>
                  <input
                    type="text"
                    placeholder="e.g. Watching sunset at Deolo Hill..."
                    value={formData.caption}
                    onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Select Photos (Max 3 files allowed) *</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="file-input"
                  />
                </div>

                {/* Live Photo Previews */}
                {selectedPreviews.length > 0 && (
                  <div className="preview-container">
                    <label>Selected Photos ({selectedPreviews.length}/3 storage used):</label>
                    <div className="preview-thumbnails">
                      {selectedPreviews.map((preview, index) => (
                        <div className="thumb-item" key={index}>
                          <img src={preview} alt={`Preview ${index + 1}`} />
                          <button
                            type="button"
                            className="thumb-remove"
                            onClick={() => removePhoto(index)}
                            title="Remove photo"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={formData.photos.length === 0}>
                    <i className="fas fa-upload"></i> Submit for Admin Moderation
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

export default VisitorGallerySection;
