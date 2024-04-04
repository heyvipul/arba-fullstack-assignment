import React, { useState } from 'react'
import Login from '../components/Login';
import Signup from '../components/Signup';

const Profile = () => {

  const [login,setLogin] = useState(false)
  
  return (
    <>
      {login ? <Signup login={login} setLogin={setLogin} /> : <Login login={login} setLogin={setLogin}/>}
    </>
  )
}

export default Profile