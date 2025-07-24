// import React, { useState } from "react";
// import { auth, db } from "./firebaseConfig";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import "./LoginPage.css"; // 

// export default function LoginPage({ navigateToDashboard }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!email || !password) return setError("Please fill all fields");

//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       const docRef = doc(db, "users", user.uid);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         navigateToDashboard(docSnap.data());
//       } else {
//         setError("User data not found");
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-box">
//         <h2 className="login-title">Login</h2>
//         {error && <p className="error">{error}</p>}
//         <form onSubmit={handleLogin}>
//           <input
//             className="login-input"
//             placeholder="Email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             className="login-input"
//             placeholder="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button className="login-button" type="submit">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { auth, db } from "./firebaseConfig";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "./LoginPage.css";

export default function LoginPage({ navigateToDashboard, navigateToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch user data from Firestore
        const docRefUser = doc(db, "users", user.uid);
      const docSnapUser = await getDoc(docRefUser);
     
      const docRefLender = doc(db, "landers", user.uid);
      const docSnapLender = await getDoc(docRefLender);
 
        if (docSnapLender.exists()) {
          navigateToDashboard(docSnapLender.data());
        }
        else if (docSnapUser.exists()) {
          navigateToDashboard(docSnapUser.data());
        } else {
          setError("User data not found");
        }
      }
    });
 
    return () => unsubscribe();
  }, [navigateToDashboard]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return setError("Please fill all fields");
 
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
 
      const docRefUser = doc(db, "users", user.uid);
      const docSnapUser = await getDoc(docRefUser);
     
      const docRefLender = doc(db, "landers", user.uid);
      const docSnapLender = await getDoc(docRefLender);
      if (docSnapUser.exists()) {
        navigateToDashboard(docSnapUser.data());
      }
      else if(docSnapLender.exists()){
        navigateToDashboard(docSnapLender.data());
      }
       else {
        setError("User data not found");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-page">
      {/* Left Section for Logo */}
      <div className="login-left">
        <img src="/FinBridge.png" alt="FinBridge Logo" className="login-logo" width={400} />
      </div>

      {/* Right Section for Login Form */}
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            className="login-input"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="login-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
       
      </div>
    </div>
  );
}
