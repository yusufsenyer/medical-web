// Firestore'daki siparişleri örnekteki gibi güncellemek için script
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';

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

async function updateOrders() {
  const ordersRef = collection(db, 'orders');
  const querySnapshot = await getDocs(ordersRef);
  for (const orderDoc of querySnapshot.docs) {
    const data = orderDoc.data();
    await updateDoc(doc(db, 'orders', orderDoc.id), {
      basePrice: data.basePrice ?? 2499,
      colorPalette: data.colorPalette ?? 'medical-blue',
      createdAt: data.createdAt ?? new Date(),
      customerEmail: data.customerEmail ?? '',
      customerName: data.customerName ?? '',
      customerPhone: data.customerPhone ?? '',
      deliveryDays: data.deliveryDays ?? 7,
      profession: data.profession ?? '',
      purpose: data.purpose ?? '',
      selectedFeatures: data.selectedFeatures ?? [],
      selectedPages: data.selectedPages ?? [],
      specialRequests: data.specialRequests ?? '',
      status: data.status ?? 'pending',
      targetAudience: data.targetAudience ?? '',
      totalPrice: data.totalPrice ?? 2499,
      updatedAt: data.updatedAt ?? new Date(),
      websiteName: data.websiteName ?? '',
      websiteType: data.websiteType ?? 'single-page'
    });
    console.log(`Order ${orderDoc.id} updated.`);
  }
}

updateOrders().then(() => {
  console.log('All orders updated.');
}).catch(console.error);
