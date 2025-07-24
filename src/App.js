// src/App.js

// import React, { useState } from "react";
// import SignupPage from "./SignupPage";
// import LoginPage from "./LoginPage";
// import UserDashboard from "./UserDashboard";

// export default function App() {
//   const [page, setPage] = useState("signup");
//   const [userData, setUserData] = useState(null);

//   return (
//     <div>
//       {page === "signup" && <SignupPage navigateToLogin={() => setPage("login")} />}
//       {page === "login" && (
//         <LoginPage navigateToDashboard={(data) => { setUserData(data); setPage("dashboard"); }} />
//       )}
//       {page === "dashboard" && <UserDashboard user={userData} />}
//     </div>
//   );
// }

import React, { useState } from "react";
import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";
import UserDashboard from "./UserDashboard";
import LenderDashboard from "./LenderDashboard"; // Create this component for lenders
 
export default function App() {
  const [page, setPage] = useState("signup");
  const [userData, setUserData] = useState(null);
 
  const handleLogin = (data) => {
    setUserData(data);
 
    if (data.role === "user") {
      setPage("user-dashboard");
    } else if (data.role === "lander") {
      setPage("lender-dashboard");
    } else {
      alert("Invalid role! Please check your account settings.");
    }
  };
 
  return (
    <div>
      {page === "signup" && (
        <SignupPage navigateToLogin={() => setPage("login")} />
      )}
 
      {page === "login" && (
        <LoginPage navigateToDashboard={handleLogin} />
      )}
 
      {page === "user-dashboard" && <UserDashboard user={userData} />}
 
      {page === "lender-dashboard" && <LenderDashboard user={userData} />}
    </div>
  );
}