import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProduct } from '../redux/productData/action';
import PropagateLoader from "react-spinners/PropagateLoader";


const Products = () => {
 
  const { isLoading, products } = useSelector((store) => store.productReducer)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialCart = JSON.parse(localStorage.getItem('cart')) || {};
  const [cart, setCart] = useState([]);
  const [newCart,setNewCart] = useState([])

  console.log(Object.keys(cart).length);
 
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(newCart));
  }, [newCart]);

  useEffect(() => {
    dispatch(getProduct())
  }, [])


  const addToCart = (ele,productId) => {
    setCart(prevCart => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1
    }));
    setNewCart(prevCart => [...prevCart, ele]);
  };

  // Function to handle removing product from the cart
  const removeFromCart = (eleId,productId) => {
    setCart(prevCart => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productId] && updatedCart[productId] > 0) {
        updatedCart[productId]--;
      }
      return updatedCart;
    });
    setNewCart(prevCart => {
      const newupdatedCart = [...prevCart];
      const index = newupdatedCart.findIndex(item => item.id === eleId);
      if (index !== -1) {
        newupdatedCart.splice(index, 1);
      }
      return newupdatedCart;
    });
  };


  return (
    <>
      <h2 style={{ width: "80%", margin: "auto" }}>Products</h2>
      <br />
      {
        isLoading ? <div className='loading-div'>
        <PropagateLoader
          color={"rgb(0,171,197)"}
          loading={isLoading}
          size={25}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        </div> : 
        <div className='products-div'>
        {products?.map(function (ele, index) {
          return <div key={index}>
            <img src={ele.avatar} alt="" />
            <div>
              <h4 style={{ marginBottom: "-12px" }}>{ele.title}</h4>
              <p style={{ color: "grey", marginBottom: "-10px" }}>{ele.description}</p>
              <p style={{ color: "rgb(0, 171, 197)", fontWeight: "bold" }}>RS. {ele.Price}</p>
              {cart[index] ? (
                <div>
                  <button><span style={{paddingRight:"50px"}} onClick={() => removeFromCart(ele.id,index)}>-</span>{cart[index]}<span style={{paddingLeft:"50px"}} onClick={() => addToCart(index)}>+</span></button>
                </div>
              ) : (
                <button onClick={() => addToCart(ele,index)}>Add to Cart</button>
              )}
            </div>
          </div>
        })}
      </div> 
      }
      
    </>
  )
}

export default Products