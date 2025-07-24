// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAC49tDBEtv-vmxdaOduvngSijZG-bMT2M",
  authDomain: "finchatbot-cd4fa.firebaseapp.com",
  projectId: "finchatbot-cd4fa",
  storageBucket: "finchatbot-cd4fa.firebasestorage.app",
  messagingSenderId: "817670456286",
  appId: "1:817670456286:web:acb98e43b7304b6948934f",
  measurementId: "G-N7FM4VZ9ER"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Auth & Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Export properly
export { auth, db };