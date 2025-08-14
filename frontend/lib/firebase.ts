import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, getDoc, query, where, doc, deleteDoc, updateDoc, addDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
let storage: any;
let resolvedStorageBucket = '';

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  // Resolve a correct storage bucket, fallback to <projectId>.appspot.com if config looks invalid
  const candidate = firebaseConfig.storageBucket || '';
  resolvedStorageBucket = candidate.includes('firebasestorage.app') || candidate === ''
    ? `${firebaseConfig.projectId}.appspot.com`
    : candidate;
  storage = getStorage(app, `gs://${resolvedStorageBucket}`);
} catch (error) {
  // Silently handle Firebase initialization failure
  db = {
    collection: () => ({
      getDocs: async () => ({ docs: [] }),
      where: () => ({ getDocs: async () => ({ docs: [] }) }),
      addDoc: async () => ({ id: 'mock-id' })
    }),
    getDocs: async () => ({ docs: [] }),
    query: () => ({ getDocs: async () => ({ docs: [] }) }),
    where: () => ({ getDocs: async () => ({ docs: [] }) }),
    addDoc: async () => ({ id: 'mock-id' })
  };
  storage = {
    // Minimal mocks so app doesn't crash
    _mock: true,
  };
}

export { db, storage, collection, getDocs, getDoc, query, where, doc, deleteDoc, updateDoc, addDoc, setDoc, getStorage, ref, uploadBytes, getDownloadURL };
export { resolvedStorageBucket };
