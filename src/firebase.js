
import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD4whLmLX_6-5CTEclr0O6HyylIo6Fq6fw",
  authDomain: "shoh-shop-bb535.firebaseapp.com",
  projectId: "shoh-shop-bb535",
  storageBucket: "shoh-shop-bb535.appspot.com",
  messagingSenderId: "629725825897",
  appId: "1:629725825897:web:d1fd806572667981968bf8"
};


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  export { auth, RecaptchaVerifier, signInWithPhoneNumber };





