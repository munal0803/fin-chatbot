// src/LoginPage.js
import React, { useState } from "react";
import { auth, db } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function LoginPage({ navigateToDashboard }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return setError("Please fill all fields");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        navigateToDashboard(docSnap.data());
      } else {
        setError("User data not found");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
