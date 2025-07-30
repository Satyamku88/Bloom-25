import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './EmergencySOS.css';

const EmergencySOS = () => {
  const [status, setStatus] = useState('idle'); // idle, confirming, sending, sent, error
  const [countdown, setCountdown] = useState(5);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let timer;
    if (status === 'confirming' && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (status === 'confirming' && countdown === 0) {
      sendAlert();
    }
    return () => clearTimeout(timer);
  }, [status, countdown]);

  const startSOS = () => {
    setStatus('locating');
    setError('');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setStatus('confirming');
      },
      (err) => {
        setError('Could not get location. Please enable location services in your browser and try again.');
        setStatus('error');
      }
    );
  };

  const cancelSOS = () => {
    setStatus('idle');
    setCountdown(5);
  };

  const sendAlert = async () => {
    setStatus('sending');
    try {
      const response = await fetch('/api/emergency-sos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(location),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to send alert.');
      }
      setStatus('sent');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'locating':
        return (
          <>
            <div className="sos-loader"></div>
            <h2>Getting your location...</h2>
            <p>Please wait while we pinpoint your position.</p>
          </>
        );
      case 'confirming':
        return (
          <>
            <div className="sos-countdown">{countdown}</div>
            <h2>Alerting contacts in...</h2>
            <p>Press cancel to stop the emergency alert.</p>
            <button className="sos-cancel-button" onClick={cancelSOS}>Cancel</button>
          </>
        );
      case 'sending':
        return (
          <>
            <div className="sos-loader"></div>
            <h2>Sending Alert...</h2>
            <p>Contacting your emergency numbers now.</p>
          </>
        );
      case 'sent':
        return (
          <>
            <div className="sos-icon success">✓</div>
            <h2>Alert Sent Successfully</h2>
            <p>Your emergency contacts have been notified with your location.</p>
            <button className="sos-reset-button" onClick={cancelSOS}>Done</button>
          </>
        );
      case 'error':
        return (
          <>
            <div className="sos-icon error">!</div>
            <h2>Error</h2>
            <p className="error-message">{error}</p>
            <button className="sos-reset-button" onClick={cancelSOS}>Try Again</button>
          </>
        );
      case 'idle':
      default:
        return (
          <>
            <button className="sos-button" onClick={startSOS}>
              <div className="sos-button-icon">SOS</div>
            </button>
            <h2>Press button in an emergency</h2>
            <p>This will send your current location to your emergency contacts.</p>
          </>
        );
    }
  };

  return (
    <div className="sos-page-container">
      <div className="sos-window">
        <Link to="/" className="sos-home-link">← Go to Home</Link>
        <div className="sos-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default EmergencySOS;
