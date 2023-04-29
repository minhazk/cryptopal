// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyAY4Vu_VpAe1KGZPEtcsLliulmy7r0Us5M',
    authDomain: 'cryptopal-c2b5e.firebaseapp.com',
    projectId: 'cryptopal-c2b5e',
    storageBucket: 'cryptopal-c2b5e.appspot.com',
    messagingSenderId: '371886200625',
    appId: '1:371886200625:web:829fe0f453e32b6b49c210',
    measurementId: 'G-YT9BRMYT6H',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage();

export default app;
export { auth, db, storage };
