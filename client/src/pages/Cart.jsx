import React from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const initialCart = JSON.parse(localStorage.getItem('cart')) || {};
  const cartItems = Object.keys(initialCart).length;

  return (
    <>
      <h2 style={{ width: '80%', margin: 'auto' }}>Cart</h2>
      <br />
      <div className='products-div'>
        {Array.from({ length: cartItems }).map((_, index) => {
          return (
            <div key={index}>
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6-YwrVVjOv028wj9HZ_0_GUizZdQhoxB_C2Q_0yfYgA&s' alt='' />
              <div>
                <h4 style={{ marginBottom: '-12px' }}>User {index}</h4>
                <p style={{ color: 'grey', marginBottom: '-10px' }}>Lorem ipsum dolor sit amet.</p>
                <p style={{ color: 'rgb(0, 171, 197)', fontWeight: 'bold' }}>RS. 100</p>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{
        display: "flex",
        width: "65%",
        margin: "auto",
        flexDirection: "row-reverse"
      }}>
        <Link to={""}>
          <button style={{
            padding: "6px",
            backgroundColor: "rgb(0,171,197)",
            border: "none",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer"
          }}>Checkout</button>
        </Link>
      </div>
    </>
  );
};

export default Cart;
