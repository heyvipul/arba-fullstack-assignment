import React, { useState } from 'react';
import dummy from "../assets/login-img.jpg";
import { FaCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Signup = ({ login, setLogin }) => {
  const [userName, setUsername] = useState("");
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        return alert("Password not match!");
      }
      const response = await fetch("https://arba-backend-j9r7.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          fullName,
          email,
          password,
        }),
      });
      const data = await response.json();
      console.log(data);
      alert("Signup successful! Please login.");
      navigate("/profile"); 
    } catch (error) {
      console.log(error);
      alert("Signup failed. Please try again.");
    }
  }

  return (
    <>
      <div className='login-div'>
        <img style={{ width: "500px", height: "650px" }} src={dummy} alt="" />
        <div>
          <span style={{ fontSize: "120px", color: "rgb(0,171,197)" }}><FaCircle /></span>
          <h2 style={{ marginTop: "-20px" }}>APP NAME</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, error?</p>
          <input
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder='Username'
          />
          <input
            value={fullName}
            onChange={(e) => setFullname(e.target.value)}
            type="text"
            placeholder='Fullname'
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder='Email'
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder='Password'
          />
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder='Confirm Password'
          />
          <button onClick={handleSignup}>Register</button>
          <p>Already have an account? <span onClick={() => setLogin(!login)} style={{ color: "rgb(0,171,197)", cursor: "pointer" }}>Login</span></p>
        </div>
      </div>
    </>
  );
}

export default Signup;
