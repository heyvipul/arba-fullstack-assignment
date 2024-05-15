import React, { useEffect, useState } from 'react'
import dummy from "../assets/login-img.jpg"
import { FaCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { handleLogin } from '../redux/userData/action';
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"

const Login = ({ login, setLogin }) => {

  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [forgetPassPopup, setForgetPassPopup] = useState(false)
  const [getToken, setGetToken] = useState(false)
  const [copytoken,setCopyToken] = useState("")
  const [newPassword,setNewPassword] = useState("")
  const [confirmNewPassword,setConfirmNewPassword] = useState("")
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const store = useSelector((store) => store.userReducer)
  const dispatch = useDispatch()
  // console.log(store);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      store.isAuthenticated = true;
    }
  }, [navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    // console.log("login from submit");
    dispatch(handleLogin({ userName, password }));
  }

  async function generateToken(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email
        })
      })
      const data = await response.json();
      if (data) {
        toast((t) =>(
          <div>
            <div style={{display:"flex",justifyContent:"space-around",marginLeft:"-100px"}}>
              <p>Copy Token</p>
              <button onClick={() => toast.dismiss(t.id)}>
              Dismiss
            </button>
            </div>
            <p style={{background:"white"}}>{data.token}</p>
          </div>
        ));
      }
      setGetToken(!getToken)
    } catch (error) {
      console.log(error);
      alert("something went wrong or user not exists!")
    }
  }

  async function handleforgetPassword(e){
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/forget-password",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          token : copytoken,
          newPassword : newPassword
        })
      })

      const data = await response.json();
      console.log(data)
      toast.success("Password updated successfully!")
      setForgetPassPopup(false)

    } catch (error) {
      console.log(error)
      alert("something went wrong or user not exists!")
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
          <input type="text" placeholder='Username'
            value={userName}
            onChange={(e) => setUserName(e.target.value)} />
          <input type="password" placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleSubmit}>Login</button>
          <p>Don't have an account? <span onClick={() => setLogin(!login)} style={{ color: "rgb(0,171,197)", cursor: "pointer" }}>Sign up</span></p>
          <p onClick={() => setForgetPassPopup(!forgetPassPopup)} style={{ color: "rgb(0,171,197)", cursor: "pointer", marginTop: "-10px" }}>Foget password</p>
          <Toaster />
        </div>
      </div>
      {forgetPassPopup && (
        <React.Fragment>
          <div className='backdrop' ></div>
          <div className='store-add-div'>

            {
              getToken ?

                <form>
                  <input type="email" placeholder='Email' value={email} />
                  <input type="text" onChange={(e)=>setCopyToken(e.target.value)} placeholder='Paste token here!' />

                  <input type='password' onChange={(e)=>setNewPassword(e.target.value)} placeholder="Enter new Password" />

                  <input type="password" onChange={(e)=>setConfirmNewPassword(e.target.value)} placeholder='Confirm Password' />
                  <button onClick={handleforgetPassword} style={{ marginTop: "10px", cursor: "pointer", backgroundColor: "rgb(0, 171, 197)", border: "none", color: "white", fontWeight: "bold" }}>Change Password</button>
                </form> :

                <form>
                  <input type="email" placeholder='Enter email'
                    onChange={(e) => setEmail(e.target.value)} />
                  <button onClick={generateToken} style={{ marginTop: "20px", cursor: "pointer", backgroundColor: "rgb(0, 171, 197)", border: "none", color: "white", fontWeight: "bold" }}>Generate Token</button>
                </form>
            }


            <div>
              <button style={{ marginTop: "20px", cursor: "pointer", backgroundColor: "rgb(0, 171, 197)", border: "none", color: "white", fontWeight: "bold" }} onClick={() => setForgetPassPopup(false)}>Cancel</button>
            </div>
          </div>
        </React.Fragment>
      )}
    </>
  )
}

export default Login