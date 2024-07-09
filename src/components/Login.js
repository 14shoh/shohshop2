// src/components/Login.js
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSendCode = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Убедитесь, что reCAPTCHA контейнер существует в DOM
      if (!document.getElementById('recaptcha-container')) {
        const recaptchaContainer = document.createElement('div');
        recaptchaContainer.id = 'recaptcha-container';
        document.body.appendChild(recaptchaContainer);
      }

      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          console.log('reCAPTCHA solved');
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
        }
      }, auth);
      
      await window.recaptchaVerifier.render();

      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(confirmationResult);
      setIsCodeSent(true);
      console.log('Code sent successfully');
    } catch (error) {
      setError('Error sending code: ' + error.message);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError(null);

    if (confirmationResult) {
      try {
        const result = await confirmationResult.confirm(verificationCode);
        console.log('User signed in:', result.user);
      } catch (error) {
        setError('Error verifying code: ' + error.message);
      }
    }
  };

  return (
    <div>
      <h1>Phone Authentication</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!isCodeSent ? (
        <form onSubmit={handleSendCode}>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
          />
          <button type="submit">Send Code</button>
          <div id="recaptcha-container"></div>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode}>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Verification Code"
          />
          <button type="submit">Verify Code</button>
        </form>
      )}
    </div>
  );
};

export default Login;
