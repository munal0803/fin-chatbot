import React from "react";
 
export default function LenderDashboard({ user }) {
  const { email, orgName, orgType, phone, role } = user || {};
 
    const containerStyle = {
    maxWidth: "800px",
    margin: "30px auto",
    padding: "20px",
    background: "#f0f4ff", // Light blue shade
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
    color: "#144272", // Dark blue text
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#034fa7",
    color: "#fff",
    padding: "15px 20px",
    borderRadius: "8px 8px 0 0",
  };

  const infoCardStyle = {
    marginTop: "20px",
    padding: "15px",
    background: "#ffffff", // White card background
    borderRadius: "8px",
    boxShadow: "0 1px 6px rgba(0, 0, 0, 0.1)",
  };

  const infoRow = {
    marginBottom: "10px",
    fontSize: "16px",
    color: "#333",
  };

  const logoutBtn = {
    background: "#c0392b", // Slightly muted red
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  };

  const actionBtn = {
    background: "#144272",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
    fontWeight: "bold",
    transition: "0.3s",
  };
 
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };
 
  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h2>Lender Dashboard</h2>
        <button style={logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
 
      {/* Welcome Section */}
      <h3 style={{ marginTop: "20px", color: "#333" }}>
        Welcome, {orgName || "Lender"}
      </h3>
      <p style={{ color: "#555" }}>Role: {role || "lender"}</p>
 
      {/* Organization Info */}
      <div style={infoCardStyle}>
        <h4 style={{ marginBottom: "10px", color: "#007BFF" }}>
          Organization Details
        </h4>
        <div style={infoRow}>
          <b>Email:</b> {email}
        </div>
        <div style={infoRow}>
          <b>Organization Name:</b> {orgName}
        </div>
        <div style={infoRow}>
          <b>Organization Type:</b> {orgType}
        </div>
        <div style={infoRow}>
          <b>Phone:</b> {phone}
        </div>
      </div>
 
      {/* Action Buttons */}
      <div style={{ marginTop: "20px" }}>
        <button style={actionBtn} onClick={() => alert("View Loan Requests")}>
          View Loan Requests
        </button>
        <button style={actionBtn} onClick={() => alert("Manage Offers")}>
          Manage Offers
        </button>
      </div>
    </div>
  );
}
 
 