// src/UserDashboard.js
import React from "react";

export default function UserDashboard({ user }) {
  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>User Dashboard</h2>
      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Age:</b> {user.age}</p>
      <p><b>Country:</b> {user.country}</p>
      <p><b>Points:</b> {user.points}</p>
    </div>
  );
}
