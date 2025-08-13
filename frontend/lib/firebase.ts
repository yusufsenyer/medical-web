import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD5LSp18Icvgloe-19OuaSe8mhMLTGPGGM",
  authDomain: "medwebify.firebaseapp.com",
  projectId: "medwebify",
  storageBucket: "medwebify.firebasestorage.app",
  messagingSenderId: "889438136971",
  appId: "1:889438136971:web:2f075d39da76139b7cc28e",
  measurementId: "G-R4HHCXJMLE"
};

let app;
let db: any;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  // Silently handle Firebase initialization failure
  db = {
    collection: () => ({
      getDocs: async () => ({ docs: [] }),
      where: () => ({ getDocs: async () => ({ docs: [] }) })
    }),
    getDocs: async () => ({ docs: [] }),
    query: () => ({ getDocs: async () => ({ docs: [] }) }),
    where: () => ({ getDocs: async () => ({ docs: [] }) })
  };
}

export { db, collection, getDocs, query, where, doc, deleteDoc };
