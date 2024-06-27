// src/components/PhoneAuth.js
import React, { useState, useEffect } from 'react';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../firebase';

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isCodeSent, setIsCodeSent] = useState(false);

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
          size: 'invisible',
          callback: (response) => {
            console.log('reCAPTCHA resolved');
          },
          'expired-callback': () => {
            console.log('reCAPTCHA expired');
          }
        }, auth);
        window.recaptchaVerifier.render().catch((error) => {
          console.error("Error rendering reCAPTCHA:", error);
        });
      } catch (error) {
        console.error("Error initializing reCAPTCHA:", error);
      }
    }
  }, []);

  const handleSendCode = async (e) => {
    e.preventDefault();
    console.log('Sending code to:', phoneNumber); // Логирование номера телефона
    const appVerifier = window.recaptchaVerifier;
    try {
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      setIsCodeSent(true);
      console.log('Code sent successfully'); // Логирование успешной отправки кода
    } catch (error) {
      console.error("Error during signInWithPhoneNumber:", error);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    console.log('Verifying code:', verificationCode); // Логирование кода подтверждения
    if (confirmationResult) {
      try {
        const result = await confirmationResult.confirm(verificationCode);
        const user = result.user;
        console.log('User signed in:', user); // Логирование успешной верификации пользователя
      } catch (error) {
        console.error("Error during code confirmation:", error);
      }
    }
  };

  return (
    <div>
      <h1>Phone Authentication</h1>
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

export default PhoneAuth;
