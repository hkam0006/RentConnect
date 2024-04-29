// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3lxxDdO1G1WcWKvKl3PnLBSnzJnJC7uA",
  authDomain: "rentconnect-4ae50.firebaseapp.com",
  projectId: "rentconnect-4ae50",
  storageBucket: "rentconnect-4ae50.appspot.com",
  messagingSenderId: "703744659621",
  appId: "1:703744659621:web:d69d2716c756e9c6b47d4c",
  measurementId: "G-RPJGHHV710",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
