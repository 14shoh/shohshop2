
import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB2hzGx6sgsbdS9UY7ArZDjKF7u0BRL7go",
    authDomain: "shoh-shop.firebaseapp.com",
    projectId: "shoh-shop",
    storageBucket: "shoh-shop.appspot.com",
    messagingSenderId: "1055815376097",
    appId: "1:1055815376097:web:da796b391d0b5b6e592ba0"
  };
  

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  export { auth, RecaptchaVerifier, signInWithPhoneNumber };