import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    username: '',
    email:localStorage.getItem("email") || "",
   pwd: '',
    cpwd: ''

  });


  formData.email=localStorage.getItem("email")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords do not match!");
      return;
    }

    try {
      console.log(formData);
      
      const res = await axios.post("http://localhost:3005/api/register", formData);
      if(res.status==201){
      alert("Registration successfull", res.data);
      localStorage.removeItem('email')
      navigate('/login')
    }
    } catch (error) {
      alert("Error during registration:", error);
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      <form className="register-form" onSubmit={handleSignup}>
      
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="pwd"
          value={formData.pwd}
          onChange={handleChange}
          required
        />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="cpwd"
          value={formData.cpwd}
          onChange={handleChange}
          required
        />
        <button type="submit" className="register-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
