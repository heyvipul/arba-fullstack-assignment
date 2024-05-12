import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast"


const Cart = () => {
  const initialCart = JSON.parse(localStorage.getItem('cart')) || {};
  const cartItems = Object.keys(initialCart).length;
  const navigate = useNavigate()
  console.log(initialCart);


  function chekout(){
     toast.success("Order placed successfully!")
     return navigate("/")
  }

  return (
    <>
      <h2 style={{ width: '80%', margin: 'auto' }}>Cart</h2>
      <br />
      <div className='products-div'>
        {
          initialCart?.map(function(ele,index){
            return <div key={index}>
              <img src={ele.avatar} alt="" />
              <div>
                <h4 style={{ marginBottom: '-12px' }}>{ele.title}</h4>
                <p style={{ color: 'grey', marginBottom: '-10px' }}>{ele.description}</p>
                <p style={{ color: 'rgb(0, 171, 197)', fontWeight: 'bold' }}>RS. {ele.Price}</p>
                <Toaster/>
              </div>
            </div>
          })
        }
        
      </div>
      <div style={{
        display: "flex",
        width: "65%",
        margin: "auto",
        flexDirection: "row-reverse"
      }}>
        
          <button onClick={chekout} style={{
            padding: "6px",
            backgroundColor: "rgb(0,171,197)",
            border: "none",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer"
          }}>Checkout</button>
        
      </div>
    </>
  );
};

export default Cart;
