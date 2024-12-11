import React, { useState } from "react";
import "./Verify.css";
import axios from "axios"

const Verify = () => {
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      console.log("Email:", email);
      const res = await axios.post("http://localhost:3005/api/verify", {
        email,
      });

      if (res.status === 201) {
        alert(res.data.msg);
        localStorage.setItem("email", email);
        setIsVerified(true);
      }
      else{
        alert(res.data.msg)
      }
    } catch (error) {
      
    }
  };

  return (
    <div className="verify-container">
      <h1 className="verify-title">Verify Email</h1>
      <form className="verify-form" onSubmit={handleVerify}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="verify-button">
          Verify
        </button>
      </form>
      {isVerified && <p className="success-message">Your email is verified!</p>}
    </div>
  );
};

export default Verify;
