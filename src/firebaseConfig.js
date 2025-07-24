// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
/*const firebaseConfig = {
  apiKey: "AIzaSyAC49tDBEtv-vmxdaOduvngSijZG-bMT2M",
  authDomain: "finchatbot-cd4fa.firebaseapp.com",
  projectId: "finchatbot-cd4fa",
  storageBucket: "finchatbot-cd4fa.firebasestorage.app",
  messagingSenderId: "817670456286",
  appId: "1:817670456286:web:acb98e43b7304b6948934f",
  measurementId: "G-N7FM4VZ9ER"
};
*/

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCij4pb9Y2shCbxntOJiNb0QP3FpEtc1eo",
  authDomain: "hack-team-inclifi.firebaseapp.com",
  projectId: "hack-team-inclifi",
  storageBucket: "hack-team-inclifi.firebasestorage.app",
  messagingSenderId: "400261076305",
  appId: "1:400261076305:web:e48154e46a97a460b92f70",
  measurementId: "G-JS217H2PET"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Auth & Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Export properly
export { auth, db };
