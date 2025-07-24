// src/App.js
import React, { useState } from "react";
import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";
import UserDashboard from "./UserDashboard";

export default function App() {
  const [page, setPage] = useState("signup");
  const [userData, setUserData] = useState(null);

  return (
    <div>
      {page === "signup" && <SignupPage navigateToLogin={() => setPage("login")} />}
      {page === "login" && (
        <LoginPage navigateToDashboard={(data) => { setUserData(data); setPage("dashboard"); }} />
      )}
      {page === "dashboard" && <UserDashboard user={userData} />}
    </div>
  );
}
