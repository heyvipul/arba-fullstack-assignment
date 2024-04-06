import React from 'react'
import {Route,Router,Routes} from "react-router-dom"
import Home from '../pages/Home'
import LoginPage from '../pages/LoginPage'
import Cart from '../pages/Cart'
import Products from '../pages/Products'
import Profile from '../pages/Profile'
import PrivateRoutes from './PrivateRoutes'
import MyStore from '../pages/MyStore'

const AllRoutes = () => {
  return (  
    <Routes>
      <Route path='/' element={<PrivateRoutes><Home/></PrivateRoutes>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/cart' element={<PrivateRoutes><Cart/></PrivateRoutes>} />
      <Route path='/products' element={<Products/>} />
      <Route path='/store' element={<MyStore/>} />
      <Route path='/profile' element={<Profile/>} />
    </Routes>
  )
}

export default AllRoutes