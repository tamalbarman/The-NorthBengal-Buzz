import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AntiBotContext = createContext();

// Protected phone fragment assembly (obscured from static scraping bots)
const getProtectedPhone = () => {
  const parts = ['91', '74782', '86972'];
  return parts.join('');
};

const SESSION_KEY = 'nbb_human_verified_ts';
const VERIFICATION_TTL_MS = 20 * 60 * 1000; // 20 minutes

export const AntiBotProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingMessage, setPendingMessage] = useState('');
  const [challenge, setChallenge] = useState({ q: '', a: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Check if session has a valid, non-expired human verification
  const isHumanVerified = useCallback(() => {
    try {
      const storedTs = sessionStorage.getItem(SESSION_KEY);
      if (!storedTs) return false;
      const ts = parseInt(storedTs, 10);
      return Date.now() - ts < VERIFICATION_TTL_MS;
    } catch {
      return false;
    }
  }, []);

  // Generate a randomized math challenge
  const generateChallenge = useCallback(() => {
    const num1 = Math.floor(Math.random() * 12) + 3; // 3 to 14
    const num2 = Math.floor(Math.random() * 9) + 2;  // 2 to 10
    const isAddition = Math.random() > 0.3; // 70% addition, 30% subtraction

    if (isAddition) {
      setChallenge({
        q: `${num1} + ${num2}`,
        a: num1 + num2
      });
    } else {
      const high = Math.max(num1, num2);
      const low = Math.min(num1, num2);
      const safeHigh = high === low ? high + 3 : high;
      setChallenge({
        q: `${safeHigh} - ${low}`,
        a: safeHigh - low
      });
    }
    setUserAnswer('');
    setErrorMsg('');
  }, []);

  // Safely execute WhatsApp redirection with verified human check
  const executeWhatsAppRedirect = useCallback((message) => {
    const phone = getProtectedPhone();
    const finalMsg = message || 'Hello The Northbengal Buzz! I would like to inquire about a tour package or tea products.';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(finalMsg)}`;
    
    // Check if on mobile/tablet or desktop
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = url;
    } else {
      const newWin = window.open(url, '_blank', 'noopener,noreferrer');
      // If popup blocker blocked the new tab, redirect in current window
      if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
        window.location.href = url;
      }
    }
  }, []);

  // Public trigger to open WhatsApp with human verification gate
  const openVerifiedWhatsApp = useCallback((message = '') => {
    if (isHumanVerified()) {
      executeWhatsAppRedirect(message);
      return;
    }

    // Require human verification
    setPendingMessage(message);
    setIsSuccess(false);
    generateChallenge();
    setIsModalOpen(true);
  }, [isHumanVerified, executeWhatsAppRedirect, generateChallenge]);

  // Submit challenge answer
  const submitVerification = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const parsed = parseInt(userAnswer.trim(), 10);

    if (isNaN(parsed)) {
      setErrorMsg('Please enter a valid numeric answer.');
      return;
    }

    if (parsed === challenge.a) {
      setIsSuccess(true);
      setErrorMsg('');

      // Mark session as verified with timestamp
      try {
        sessionStorage.setItem(SESSION_KEY, Date.now().toString());
      } catch (err) {
        console.warn('SessionStorage unavailable:', err);
      }

      // Execute redirect SYNCHRONOUSLY within the user's submit event so popups are allowed
      const targetMessage = pendingMessage;
      executeWhatsAppRedirect(targetMessage);

      // Close modal cleanly after brief visual confirmation
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSuccess(false);
        setPendingMessage('');
        setUserAnswer('');
      }, 400);
    } else {
      setErrorMsg('Incorrect answer. Please try this new verification question.');
      generateChallenge();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrorMsg('');
    setUserAnswer('');
    setPendingMessage('');
    setIsSuccess(false);
  };

  return (
    <AntiBotContext.Provider
      value={{
        isModalOpen,
        openVerifiedWhatsApp,
        closeModal,
        challenge,
        userAnswer,
        setUserAnswer,
        submitVerification,
        errorMsg,
        isSuccess,
        pendingMessage,
        refreshChallenge: generateChallenge,
        isHumanVerified
      }}
    >
      {children}
    </AntiBotContext.Provider>
  );
};

export const useAntiBot = () => {
  const context = useContext(AntiBotContext);
  if (!context) {
    throw new Error('useAntiBot must be used within an AntiBotProvider');
  }
  return context;
};
