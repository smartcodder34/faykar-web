// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADU1u-5aottoX-6Y3KoaMEDMQ67ARvuXI",
  authDomain: "fakyar-chat.firebaseapp.com",
  projectId: "fakyar-chat",
  storageBucket: "fakyar-chat.firebasestorage.app",
  messagingSenderId: "801504136601",
  appId: "1:801504136601:web:2fa31825ac06be40f71708",
};

// Initialize Firebase only once (important for Next.js hot reload)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Firestore references
export const usersRef = collection(db, "users");
export const roomsRef = collection(db, "rooms");

export default app;
