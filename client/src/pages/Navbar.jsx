import React, { useState } from 'react'
import { FaCartShopping } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast"


const Navbar = () => {

  const [display, setDisplay] = useState(false)
  const navigate = useNavigate();

  const initialCart = JSON.parse(localStorage.getItem('cart')) || {};
  const cartItems = Object.keys(initialCart).length

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('signup');
    setDisplay(false)
    toast.success("Logout successful!")
    setTimeout(() => { 
      navigate("/profile")
      window.location.reload();
    }, 1000);

  }

  return (
    <>
      <div className='navbar'>
        <Link onClick={() => { setDisplay(false); navigate("/") }} to={"/"}><button>LOGO</button></Link>
        <div>
          <Link style={{ color: "rgb(0,171,197)" }} to={"/cart"}><span><FaCartShopping />{cartItems}</span></Link>
          <span onClick={() => setDisplay(!display)}><FaUserCircle /></span>
        </div>
      </div>
      {
        display ? <div className='navbar-profile-popup'>
          <Link onClick={() => setDisplay(!display)} style={{ color: "rgb(0,171,197)" }} to={"/store"}> <span>My store</span></Link>
          <Link onClick={() => setDisplay(!display)} style={{ color: "rgb(0,171,197)" }} to={"/profile"}><span>Profile</span></Link>
          <span onClick={logout}>Logout</span>
        </div> : ""
      }
      <Toaster />
    </>

  )
}

export default Navbar