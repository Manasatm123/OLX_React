import './App.css'
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import Verify from './components/Verify';
import Register from './components/Register';
import Login from './components/Login'
import Profile from './components/Profile'
import AddUserData from './components/AddUserData';
import EditUserData from './components/EditUserDAta';
import SellPost from './components/SellPost';


function App() {
  const [user,setUser]=useState("")
  console.log("app"+user);
  


  return (
    <>
   <Router>
   {user&& <Nav user={user}/>}
    <Routes>
      <Route path='/' element={<Home setUser={setUser}/>}/>
      <Route path='/verify' element={<Verify/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/addUserData' element={<AddUserData/>}/>
      <Route path='editUserData' element={<EditUserData/>}/>
      <Route path='/sellPost' element={<SellPost/>}/>
    
    </Routes>
   </Router>
    </>
  )
}

export default App
