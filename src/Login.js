// import React, { useState } from "react";
// import { auth, db } from "./firebaseConfig";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import "./Login.css";

// export default function LoginPage({ navigateToDashboard, navigateToSignup }) {
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
//       {/* Left Side: Logo */}
//       <div className="login-left">
//         <img src="/FinBridge.png" alt="FinBridge Logo" className="login-logo" />
//       </div>

//       {/* Right Side: Styled Login */}
//       <div className="login-right">
//         <div className="form-container">
//           <div className="tab-header">
//             <span className="active-tab">Login</span>
//             <span className="inactive-tab" onClick={navigateToSignup}>Sign Up</span>
//           </div>

//           <form onSubmit={handleLogin}>
//             <div className="input-group">
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <span className="icon">📧</span>
//             </div>

//             <div className="input-group">
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <span className="icon">🔑</span>
//             </div>

//             <div className="forgot-password">Forget Password?</div>

//             {error && <p className="error">{error}</p>}

//             <button className="styled-login-button" type="submit">Login</button>
//           </form>

//           <div className="signup-link">
//             Don't Have An Account? <span onClick={navigateToSignup}>SIGNUP</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { auth, db } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "./Login.css";

export default function LoginPage({ navigateToDashboard, navigateToSignup }) {
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
    <div className="login-page">
      {/* Left Side: Logo */}
      <div className="login-left">
        <img src="/left-img.png" alt="FinBridge Logo" className="login-img" />
      </div>

      {/* Right Side: Styled Login */}
      <div className="login-right">
        <div className="form-container">
          {/* Top Logo inside form */}
          <img src="/FinBridgeFormLogo.png" alt="FinBridge Logo" className="form-logo" />

          <div className="tab-header">
            <span className="active-tab">Login</span>
            <span className="inactive-tab" onClick={navigateToSignup}>Sign Up</span>
          </div>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* <span className="icon">📧</span> */}
              <span className="icon">✉️</span>

            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="icon">🔑</span>
            </div>

            <div className="forgot-password">Forget Password?</div>

            {error && <p className="error">{error}</p>}

            <button className="styled-login-button" type="submit">Login</button>
          </form>

          <div className="signup-link">
            Don't Have An Account? <span onClick={navigateToSignup}>SIGNUP</span>
          </div>
        </div>
      </div>
    </div>
  );
}
