// src/SignupPage.js
import React, { useState } from "react";
import { auth, db } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function SignupPage({ navigateToLogin }) {
  const [role, setRole] = useState(""); // "user" or "lander"
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    country: "India",
    ageGroup: "",
    orgName: "",
    phone: "",
    orgType: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!role) return "Please select role";

    if (role === "user") {
      if (!form.name || !form.email || !form.password || !form.ageGroup) {
        return "All fields are required for user";
      }
    } else if (role === "lander") {
      if (!form.orgName || !form.email || !form.password || !form.phone || !form.orgType) {
        return "All fields are required for lender";
      }
    }

    if (form.password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      if (role === "user") {
        await setDoc(doc(db, "users", user.uid), {
          name: form.name,
          email: form.email,
          country: form.country,
          ageGroup: form.ageGroup,
          points: 1000,
          role: "user",
          createdAt: new Date()
        });
      } else {
        await setDoc(doc(db, "landers", user.uid), {
          orgName: form.orgName,
          email: form.email,
          phone: form.phone,
          orgType: form.orgType,
          role: "lander",
          createdAt: new Date()
        });
      }

      alert("Signup successful! Please login.");
      navigateToLogin();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Signup</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Role Selection */}
      <div>
        <label>
          <input
            type="radio"
            name="role"
            value="user"
            checked={role === "user"}
            onChange={() => setRole("user")}
          />
          User
        </label>
        <label style={{ marginLeft: 10 }}>
          <input
            type="radio"
            name="role"
            value="lander"
            checked={role === "lander"}
            onChange={() => setRole("lander")}
          />
          Lender
        </label>
      </div>
      <br />

      {/* Dynamic Form */}
      <form onSubmit={handleSignup}>
        {role === "user" && (
          <>
            <input name="name" placeholder="Name" onChange={handleChange} /><br />
            <input name="email" placeholder="Email" type="email" onChange={handleChange} /><br />
            <input name="password" placeholder="Password" type="password" onChange={handleChange} /><br />
            <select name="country" onChange={handleChange}>
              <option value="India">India</option>
              <option value="Germany">Germany</option>
            </select><br />
            <select name="ageGroup" onChange={handleChange}>
              <option value="">Select Age Group</option>
              <option value="18-34">18-34</option>
              <option value="35+">35+</option>
            </select><br /><br />
          </>
        )}

        {role === "lander" && (
          <>
            <input name="orgName" placeholder="Organization Name" onChange={handleChange} /><br />
            <input name="email" placeholder="Email" type="email" onChange={handleChange} /><br />
            <input name="password" placeholder="Password" type="password" onChange={handleChange} /><br />
            <input name="phone" placeholder="Phone Number" onChange={handleChange} /><br />
            <input name="orgType" placeholder="Type of Organization" onChange={handleChange} /><br /><br />
          </>
        )}

        {role && <button type="submit">Signup</button>}
      </form>

      <p>Already have an account? <button onClick={navigateToLogin}>Login</button></p>
    </div>
  );
}
