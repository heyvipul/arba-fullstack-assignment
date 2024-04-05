import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({children}) => {

  const {isAuthenticated} = useSelector((store) => store.userReducer)
   
 if(!isAuthenticated){
    return <Navigate to={"/profile"} />
 }

  return children
}

export default PrivateRoutes