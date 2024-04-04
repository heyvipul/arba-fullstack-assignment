import React from 'react'
import dummy from "../assets/login-img.jpg"
import { FaCircle } from "react-icons/fa";

const Profile = () => {
  return (
    <>
      <div className='login-div'>
        <img src={dummy} alt="" />
        <div>
          {/* <img src={dummy} alt="" /> */}
          <span style={{fontSize : "120px",color:"rgb(0,171,197)"}}><FaCircle/></span>
          <h2>APP NAME</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, error?</p>
          <input type="text" placeholder='Username' />
          <input type="password" placeholder='Password' />
          <button>Login</button>
          <p>Don't have an account? <span style={{color:"rgb(0,171,197)",cursor:"pointer"}}>Sign up</span></p>
        </div>
      </div>

    </>
  )
}

export default Profile