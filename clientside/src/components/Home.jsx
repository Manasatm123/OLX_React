import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = ({ setUser }) => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");


  const getUser = async () => {
    if (!token) {
      navigate("/login");
    } else {
      try {
        const res = await axios.get("http://localhost:3005/api/getdata", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
          setUser(res.data.name);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    }
  };

  
  useEffect(() => {
    getUser();
    
  }, [])

  return (
    <div>Home</div>
  )
}

export default Home