import React, { useEffect, useState } from 'react'
import dummy from "../assets/login-img.jpg"
import { FaCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { handleLogin } from '../redux/userData/action';
import {useNavigate} from "react-router-dom"

const Login = ({login,setLogin}) => {

  const[userName,setUserName] = useState("")
  const[password,setPassword] = useState("")
  const navigate = useNavigate()

  const store = useSelector((store) => store.userReducer)
  const dispatch = useDispatch()
  console.log(store);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      store.isAuthenticated = true;
    }
  }, [navigate]);

  async function handleSubmit(e){
    e.preventDefault();
    try {
      await dispatch(handleLogin(userName,password))
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className='login-div'>
        <img style={{width : "500px",height:"650px"}} src={dummy} alt="" />
        <div>
          {/* <img src={dummy} alt="" /> */}
          <span style={{fontSize : "120px",color:"rgb(0,171,197)"}}><FaCircle/></span>
          <h2 style={{marginTop : "-20px"}}>APP NAME</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, error?</p>
          <input type="text" placeholder='Username'
          value={userName}
          onChange={(e)=>setUserName(e.target.value)} />
          <input type="password" placeholder='Password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)} />
          <button onClick={handleSubmit}>Login</button>
          <p>Don't have an account? <span onClick={()=>setLogin(!login)} style={{color:"rgb(0,171,197)",cursor:"pointer"}}>Sign up</span></p>
        </div>
      </div>
    </>
  )
}

export default Login