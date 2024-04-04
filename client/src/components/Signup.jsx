import React from 'react'
import dummy from "../assets/login-img.jpg"
import { FaCircle } from "react-icons/fa";

const Signup = ({login,setLogin}) => {
  return (
    <>
      <div className='login-div'>
        <img style={{width : "500px",height:"650px"}} src={dummy} alt="" />
        <div>
          {/* <img src={dummy} alt="" /> */}
          <span style={{fontSize : "120px",color:"rgb(0,171,197)"}}><FaCircle/></span>
          <h2 style={{marginTop : "-20px"}}>APP NAME</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, error?</p>
          <input type="text" placeholder='Username' />
          <input type="text" placeholder='Fullname' />
          <input type="text" placeholder='Email' />
          <input type="password" placeholder='Password' />
          <input type="password" placeholder='Confirm Password' />
          <button>Register</button>
          <p>Don't have an account? <span onClick={()=>setLogin(!login)} style={{color:"rgb(0,171,197)",cursor:"pointer"}}>Login</span></p>
        </div>
      </div>
    </>
  )
}

export default Signup