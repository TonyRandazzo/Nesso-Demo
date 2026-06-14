import { useState, useEffect } from 'react';

export const useGeolocationConsent = () => {
  const [consentGiven, setConsentGiven] = useState(null);
  const [askForConsent, setAskForConsent] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('geolocationConsent');
    if (stored === 'true') {
      setConsentGiven(true);
    } else if (stored === 'false') {
      setConsentGiven(false);
    } else {
      setAskForConsent(true);
    }
  }, []);

  const grantConsent = () => {
    localStorage.setItem('geolocationConsent', 'true');
    setConsentGiven(true);
    setAskForConsent(false);
  };

  const denyConsent = () => {
    localStorage.setItem('geolocationConsent', 'false');
    setConsentGiven(false);
    setAskForConsent(false);
  };

  const resetConsent = () => {
    localStorage.removeItem('geolocationConsent');
    setConsentGiven(null);
    setAskForConsent(true);
  };

  return { consentGiven, askForConsent, grantConsent, denyConsent, resetConsent };
};