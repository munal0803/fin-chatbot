import React, { useState } from "react";
import { auth, db } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./SignupPage.css"; //
import TermsPage from "./TermsPage";

export default function SignupPage({ navigateToLogin }) {
  const [role, setRole] = useState("");
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
  const [showTerms, setShowTerms] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!role) return "Please select role";
    if (role === "user") {
      if (!form.name || !form.email || !form.password || !form.ageGroup)
        return "All fields are required for user";
    } else {
      if (!form.orgName || !form.email || !form.password || !form.phone || !form.orgType)
        return "All fields are required for lender";
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
    <>
    {showTerms ? (
      <TermsPage onBack={() => setShowTerms(false)} />
    ) : (

    <div className="signup-page">
  {/* Left Section for Logo */}
  <div className="signup-left">
    <img src="/FinBridge.png" alt="FinBridge Logo" className="signup-logo" />
  </div>

  {/* Right Section for Signup Form */}
  <div className="signup-box">
    <h2 className="title">Sign Up</h2>
    {error && <p className="error">{error}</p>}

    {/* Role Selection */}
    <div className="role-select">
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
      <label>
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

    <form onSubmit={handleSignup}>
      {role === "user" && (
        <>
          <input className="input" name="name" placeholder="Name" onChange={handleChange} />
          <input className="input" name="email" type="email" placeholder="Email" onChange={handleChange} />
          <input className="input" name="password" type="password" placeholder="Password" onChange={handleChange} />
          <select className="input" name="country" onChange={handleChange}>
            <option value="India">India</option>
            <option value="Germany">Germany</option>
          </select>
          <select className="input" name="ageGroup" onChange={handleChange}>
            <option value="">Select Age Group</option>
            <option value="18-34">18-34</option>
            <option value="35+">35+</option>
          </select>
          <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  required
                  onChange={handleChange}
                  style={{ marginRight: '8px', marginTop: '2px' }}
                />
                <span>
                  I agree to share my data to improve credit options, as per the{" "}
                  <span
                    onClick={() => setShowTerms(true)}
                    style={{
                      color: "#003366",
                      textDecoration: "underline",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Terms & Conditions
                  </span>.
                  </span>
              </label>
        </>
      )}

      {role === "lander" && (
        <>
          <input className="input" name="orgName" placeholder="Organization Name" onChange={handleChange} />
          <input className="input" name="email" type="email" placeholder="Email" onChange={handleChange} />
          <input className="input" name="password" type="password" placeholder="Password" onChange={handleChange} />
          <input className="input" name="phone" placeholder="Phone Number" onChange={handleChange} />
          <input className="input" name="orgType" placeholder="Type of Organization" onChange={handleChange} />
        </>
      )}

      {role && (
        <button type="submit" className="submit-btn">Signup</button>
      )}
    </form>

    <p className="login-link">
      Already have an account?{" "}
      <button onClick={navigateToLogin} className="login-btn">Login</button>
    </p>
  </div>
</div>
)}
  </>
  );
}

