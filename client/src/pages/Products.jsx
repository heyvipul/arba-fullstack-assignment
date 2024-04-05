import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProduct } from '../redux/productData/action';

const Products = () => {
 
  const { isLoading, products } = useSelector((store) => store.productReducer)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialCart = JSON.parse(localStorage.getItem('cart')) || {};
  const [cart, setCart] = useState([]);

  console.log(Object.keys(cart).length);
 
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    dispatch(getProduct())
  }, [])


    // Function to handle adding product to the cart
    const addToCart = (productId) => {
      setCart(prevCart => ({
        ...prevCart,
        [productId]: (prevCart[productId] || 0) + 1
      }));
    };
  
    // Function to handle removing product from the cart
    const removeFromCart = (productId) => {
      setCart(prevCart => {
        const updatedCart = { ...prevCart };
        if (updatedCart[productId] && updatedCart[productId] > 0) {
          updatedCart[productId]--;
        }
        return updatedCart;
      });
    };


  return (
    <>
      <h2 style={{ width: "80%", margin: "auto" }}>Products</h2>
      <br />
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
                  {/* <button onClick={() => removeFromCart(index)}> - </button>
                  <span>{cart[index]}</span>
                  <button onClick={() => addToCart(index)}> + </button> */}
                  <button><span style={{paddingRight:"50px"}} onClick={() => removeFromCart(index)}>-</span>{cart[index]}<span style={{paddingLeft:"50px"}} onClick={() => addToCart(index)}>+</span></button>
                </div>
              ) : (
                <button onClick={() => addToCart(index)}>Add to Cart</button>
              )}
            </div>
          </div>
        })}
      </div>
    </>
  )
}

export default Products