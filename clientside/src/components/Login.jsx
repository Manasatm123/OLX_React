import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'
import axios from "axios"

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    pass: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignIn =  async(e) => {
    e.preventDefault();
    try {
      console.log(formData);
      
      const res = await axios.post("http://localhost:3005/api/login", formData);
      console.log(res);
      
      if(res.status==201){
        localStorage.setItem('token',res.data.token)
      alert("Logged in successfully");
      navigate('/')
      location.reload()
    }else{
      alert(res.data.msg)
    }
    } catch (error) {
      alert("Error during login:", error);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleSignIn}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="pass"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="login-button" onClick={() => navigate('/')}>
          Sign In
        </button>
        <div className="login-links">
        <button
          className="link-button"
          onClick={() => navigate('/Forgotpass')}
        >
          Forgot Password?
        </button>
        <button
          className="link-button"
          onClick={() => navigate('/Verify')}
        >
          Create Account
        </button>
      </div>
      </form>
      
    </div>
  );
};

export default Login;
