import React, { useState } from 'react';
import './EmergencySOS.css';

const EmergencySOS = () => {
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [completedSteps, setCompletedSteps] = useState({
    location: false,
    alerts: false,
    calls: false,
  });

  // Twilio configuration (replace with your actual credentials)
  const TWILIO = {
    ACCOUNT_SID: 'your sid ',
    AUTH_TOKEN: 'you tocken',
    PHONE_NUMBER: '+phone numberr'
  };

  // Verified emergency contacts
  const CONTACTS = {
    FAMILY: ['phone number 3', 'phone number 2'],
    AMBULANCE: '+phone number'
  };

  const handleEmergency = async () => {
    setIsLoading(true);
    setStatus('Initializing emergency protocol...');
    
    try {
      // Step 1: Get location
      setStatus('Getting your location...');
      const position = await getLocation();
      setCompletedSteps(prev => ({ ...prev, location: true }));

      // Step 2: Send alerts
      setStatus('Sending emergency alerts...');
      await sendEmergencyAlerts(position);
      setCompletedSteps(prev => ({ ...prev, alerts: true }));

      // Step 3: Initiate calls
      setStatus('Initiating emergency calls...');
      await initiateEmergencyCalls();
      setCompletedSteps(prev => ({ ...prev, calls: true }));

      setStatus('Emergency protocol activated successfully! Help is on the way!');
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported by your browser"));
      }
      navigator.geolocation.getCurrentPosition(
        resolve,
        (error) => {
          reject(new Error("Location access denied. Please enable permissions."));
        },
        { timeout: 10000, maximumAge: 0 }
      );
    });
  };

  const sendEmergencyAlerts = async (position) => {
    const locationLink = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;
    const message = `🚨 EMERGENCY ALERT! 🚨\n\nMy current location: ${locationLink}\n\nPlease send help immediately!`;

    try {
      await Promise.all([
        ...CONTACTS.FAMILY.map(number => sendTwilioSMS(number, message)),
        sendTwilioSMS(CONTACTS.AMBULANCE, `AMBULANCE REQUIRED! ${message}`)
      ]);
    } catch (error) {
      throw new Error('Failed to send alerts: ' + error.message);
    }
  };

  const initiateEmergencyCalls = async () => {
    try {
      await Promise.all([
        makeTwilioCall(CONTACTS.AMBULANCE),
        ...CONTACTS.FAMILY.map(number => makeTwilioCall(number))
      ]);
    } catch (error) {
      throw new Error('Failed to initiate calls: ' + error.message);
    }
  };

  const sendTwilioSMS = async (to, body) => {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO.ACCOUNT_SID}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${TWILIO.ACCOUNT_SID}:${TWILIO.AUTH_TOKEN}`),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          To: to,
          From: TWILIO.PHONE_NUMBER,
          Body: body
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send SMS');
    }
  };

  const makeTwilioCall = async (to) => {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO.ACCOUNT_SID}/Calls.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${TWILIO.ACCOUNT_SID}:${TWILIO.AUTH_TOKEN}`),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          Url: 'http://demo.twilio.com/docs/voice.xml',
          To: to,
          From: TWILIO.PHONE_NUMBER
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to initiate call');
    }
  };

  return (
    <div className="emergency-sos">
      <h1>Emergency SOS</h1>
      <p className="description">Immediate emergency response system</p>

      <button
        className={`sos-button ${isLoading ? 'button-disabled' : ''}`}
        onClick={handleEmergency}
        disabled={isLoading}
      >
        {isLoading ? 'Activating Emergency Protocol...' : 'Trigger Emergency SOS'}
      </button>

      {status && <div className="status">{status}</div>}

      <div className="protocol-steps">
        <h3>Emergency Protocol Activation:</h3>
        <ul>
          <li className={completedSteps.location ? 'completed' : ''}>
            📍 Real-time location tracking
          </li>
          <li className={completedSteps.alerts ? 'completed' : ''}>
            📩 SMS alerts to emergency contacts
          </li>
          <li className={completedSteps.calls ? 'completed' : ''}>
            📞 Automated voice calls to authorities
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EmergencySOS;