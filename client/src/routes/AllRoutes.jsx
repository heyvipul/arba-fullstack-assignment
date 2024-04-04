import React from 'react'
import {Route,Routes} from "react-router-dom"
import Home from '../pages/Home'
import LoginPage from '../pages/LoginPage'
import Cart from '../pages/Cart'
import Products from '../pages/Products'
import Profile from '../pages/Profile'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/products' element={<Products/>} />
      <Route path='/profile' element={<Profile/>} />
    </Routes>
  )
}

export default AllRoutes