import React from 'react'
import { FaCartShopping } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();


  return (
    <div className='navbar'>
        <Link to={"/"}><button>LOGO</button></Link>
        <div>
            <Link style={{color:"rgb(0,171,197)"}} to={"/cart"}><span><FaCartShopping/></span></Link>
            <Link style={{color:"rgb(0,171,197)"}} to={"/profile"}><span><FaUserCircle/></span></Link>        
        </div>
    </div>
  )
}

export default Navbar