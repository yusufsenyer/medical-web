import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD5LSp18Icvgloe-19OuaSe8mhMLTGPGGM",
  authDomain: "medwebify.firebaseapp.com",
  projectId: "medwebify",
  storageBucket: "medwebify.firebasestorage.app",
  messagingSenderId: "889438136971",
  appId: "1:889438136971:web:2f075d39da76139b7cc28e",
  measurementId: "G-R4HHCXJMLE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs, query, where };
