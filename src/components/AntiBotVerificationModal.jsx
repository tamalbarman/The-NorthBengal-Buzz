import React, { useEffect, useRef } from 'react';
import { useAntiBot } from '../context/AntiBotContext';
import { SITE_CONFIG } from '../config/siteConfig';

const AntiBotVerificationModal = () => {
  const {
    isModalOpen,
    closeModal,
    challenge,
    userAnswer,
    setUserAnswer,
    submitVerification,
    errorMsg,
    isSuccess,
    pendingMessage,
    refreshChallenge
  } = useAntiBot();

  const inputRef = useRef(null);

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeModal();
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isModalOpen, closeModal]);

  if (!isModalOpen) return null;

  return (
    <div className="antibot-modal-overlay" onClick={closeModal} role="dialog" aria-modal="true">
      <div
        className="antibot-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="antibot-close-btn"
          onClick={closeModal}
          aria-label="Close Verification"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="antibot-header">
          <div className="antibot-shield-icon">
            <i className="fas fa-shield-halved"></i>
          </div>
          <h3>Traveler Security Check</h3>
          <p className="antibot-subtitle">
            To protect our local travel team from automated spam & scraping bots, please verify you are a genuine human traveler before connecting to WhatsApp.
          </p>
        </div>

        <form onSubmit={submitVerification} className="antibot-form">
          <div className="antibot-challenge-box">
            <span className="antibot-label">Security Challenge:</span>
            <div className="antibot-expression-row">
              <span className="antibot-math-text">
                What is <strong>{challenge.q}</strong> = ?
              </span>
              <button
                type="button"
                className="antibot-refresh-btn"
                onClick={refreshChallenge}
                title="Get another question"
              >
                <i className="fas fa-arrows-rotate"></i>
              </button>
            </div>
          </div>

          <div className="antibot-input-wrap">
            <input
              ref={inputRef}
              type="number"
              className="antibot-number-input"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter your answer"
              required
              disabled={isSuccess}
            />
          </div>

          {errorMsg && (
            <div className="antibot-error-msg">
              <i className="fas fa-circle-exclamation"></i> {errorMsg}
            </div>
          )}

          {isSuccess && (
            <div className="antibot-success-msg">
              <i className="fas fa-circle-check"></i> Verification successful! Opening WhatsApp...
              <div style={{ marginTop: '0.8rem' }}>
                <a
                  href={SITE_CONFIG.getWhatsAppUrl(pendingMessage || 'Hello The Northbengal Buzz!')}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#25d366', fontWeight: '700', textDecoration: 'underline', fontSize: '1.3rem' }}
                >
                  Click here if WhatsApp didn't open automatically &rarr;
                </a>
              </div>
            </div>
          )}

          <button
            type="submit"
            className={`btn btn-primary antibot-submit-btn ${isSuccess ? 'btn-success' : ''}`}
            disabled={isSuccess}
          >
            {isSuccess ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Connecting...
              </>
            ) : (
              <>
                <i className="fab fa-whatsapp"></i> Verify & Open WhatsApp
              </>
            )}
          </button>
        </form>

        <div className="antibot-footer-notice">
          <i className="fas fa-lock"></i> Verification is remembered for this browsing session. No personal data collected.
        </div>
      </div>
    </div>
  );
};

export default AntiBotVerificationModal;
